import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import "@lrnwebcomponents/multiple-choice/lib/confetti-container.js";
import '@frameright/image-display-control-web-component/image-display-control.js';

export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }

  constructor() {
    super();
    this.users = [];
    this.answerBlocks = []; // Array to store answer blocks
    this.correctAnswers = ["Answer Option 1", "Answer Option 2"]; // Array of correct answers
  }

  // Styling components in the party-ui modal
  static get styles() {
    return css`
        :host {
            display: block;
        }
        .party-ui {
            height: 100%;
            position: relative;
            top: 80px; left: 0px;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            pointer-events: all;
            color: var(--ddd-theme-default-slateGray);
        }
        .party-ui-modal {
            background-color: var(--ddd-theme-default-skyBlue);
            font-family: "Press Start 2P", sans-serif;
            text-align: center;
            width: 50vw;
            border: 2px solid var(--ddd-theme-default-success);
            border-radius: var(--ddd-radius-sm);
            box-sizing: border-box;
            padding: 20px;
        }
        /* Add styles for the image section and quiz container */
        .image-section {
            margin-bottom: 20px;
        }
        .image-section img {
            max-width: 100%;
            height: auto;
            border-radius: var(--ddd-radius-sm);
        }
        .image-caption, .image-description {
            font-size: 14px;
            margin: 5px 0;
        }

        /* Add styles for answer options and the drop zone */
        .answer-options-section, .answer-drop-zone {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .answer-options {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .answer-option {
            background-color: white;
            padding: 10px;
            border: 1px solid black;
            border-radius: 4px;
            cursor: move;
        }
        .answer-drop-zone {
            background-color: #f8f8f8;
            padding: 20px;
            border: 2px solid black;
            border-radius: 4px;
            height: 150px; /* Adjust height as needed */
            overflow-y: auto;
        }
        .dropped-answers {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    `;
  }

  firstUpdated() {
    this.initializeDraggable();
  }

  // Initialize draggable functionality for answer options
  initializeDraggable() {
    const draggableOptions = this.shadowRoot.querySelectorAll('.answer-option');
    draggableOptions.forEach((option) => {
      this.makeDivDraggable(option);
    });
  }

  // Make an element draggable and handle drag events
  makeDivDraggable(elmnt) {
    elmnt.setAttribute('draggable', 'true');
    elmnt.addEventListener('dragstart', this.handleDragStart);
  }

  // Handle drag start event
  handleDragStart(event) {
    event.dataTransfer.setData('text', event.target.innerText);
  }

  // Handle drop event
  handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const dropZone = event.target.querySelector('.dropped-answers');
    if (dropZone && data) {
        // Create a new element for the dropped answer
        const newAnswer = document.createElement('div');
        newAnswer.classList.add('answer-option');
        newAnswer.innerText = data;
        dropZone.appendChild(newAnswer);
    }
  }

  // Handle drag over event to allow dropping
  handleDragOver(event) {
    event.preventDefault(); // Allow drop
  }

  // Implement the render method to display the quiz structure
  render() {
    return html`
      <div class="quiz-container">
        <!-- Image Section -->
        <div class="image-section">
          <img src="https://iam.hax.psu.edu/emo5318/sites/mannyortiz/assets/banner.jpg" 
            alt="Quiz Image" 
            width="200" 
            height="200" />
          <p class="image-caption">Caption of the image</p>
          <p class="image-description">Description of the image</p>
        </div>

        <!-- Answer Options Section -->
        <div class="answer-options-section">
          <h3>Drag answers to the bottom</h3>
          <div class="answer-options">
            <div class="answer-option">Answer Option 1</div>
            <div class="answer-option">Answer Option 2</div>
            <div class="answer-option">Answer Option 3</div>
          </div>
        </div>

        <!-- Drop Zone for Answers -->
        <div class="answer-drop-zone" @drop="${this.handleDrop}" @dragover="${this.handleDragOver}">
          <h3>Drop your answers here</h3>
          <div class="dropped-answers"></div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      users: { type: Array }
    };
  }

  // Function to generate the confetti
  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);
