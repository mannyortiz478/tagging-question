import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";

export class TaggingQuestion extends LitElement {
  static get tag() {
    return 'tagging-question';
  }
  constructor() {
    super();
    this.question = "";
    this.description = "";
    this.imageURL = "";
    this.currentTag;
    this.checked = false;
    this.answerSet = "default";
    this.showDescription = false;
  }

  static get styles() {
    return css`
      :host {
        --bg-color: var(--ddd-theme-default-skyLight);
        --tag-color: var(--ddd-theme-default-skyBlue);
        --text-color: var(--ddd-theme-default-beaverBlue);
        --correct-col: var(--ddd-theme-default-opportunityGreen);
        --incorrect-col: var(--ddd-theme-default-original87Pink);
      }

      #tagging-question {
        background: var(--ddd-theme-default-shrineLight);
        min-height: var(--ddd-spacing-8);
        min-width: var(--ddd-spacing-16);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: var(--ddd-spacing-2);
        user-select: none;
        color: var(--text-1);
        margin: var(--ddd-spacing-4) 0;
      }

      #tagging-question img {
        padding-top: var(--ddd-spacing-2);
        max-height: 500px;
        object-fit: contain;
        max-width: 100%;
      }

      #question {
        font-family: "Gill Sans", sans-serif;;
        text-align: center;
        color: var(--ddd-theme-default-potentialMidnight);
        padding: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
        box-sizing: border-box;
        margin-bottom: var(--ddd-spacing-8);
      }

      .description-title {
        font-family: "Gill Sans", sans-serif;;
        text-align: center;
        padding: var(--ddd-spacing-2);
        font-size: var(--ddd-font-size-s);
        box-sizing: border-box;
        margin-bottom: var(--ddd-spacing-8);
      }

      #feedbackSection {
        width: 80%;
        margin-left: 10%;
        padding-top: var(--ddd-spacing-6);
        display: none;
        flex-direction: column;
      }

      #droppedTags {
        box-sizing: border-box;
        padding: 24px 12px;
        border: solid 2px var(--ddd-theme-default-roarGolden);
        border-radius: var(--ddd-radius-sm);
        width: 90%;
        margin-left: 5%;
        display: inline-block;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      #dropTagHint {
        display: flex;
        font-family: "Gill Sans", sans-serif;
        justify-content: center;
        align-items: center;
        opacity: 50%;
        color: var(--ddd-theme-default-creekTeal);
        font-weight: bold;
        pointer-events: none;
        user-select: none;
      }

      #bankedTags {
        box-sizing: border-box;
        padding: var(--ddd-spacing-6) var(--ddd-spacing-16);
        width: 100%;
        display: inline-block;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      #image {
        max-width: 25%;
        height: auto;
        border: solid 3px var(--ddd-theme-default-skyBlue);
        border-radius: var(--ddd-radius-sm);
        margin: 2.5%;
        }

        #image:hover {
            transform: scale(1.2);
        }

        .description-btn {
            background-color: transparent;
            line-break: auto;
            color: var(--ddd-theme-default-link);
            font-weight: var(--ddd-font-primary-bold);
            border: none;
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            margin-top: var(--ddd-spacing-4);
        }

      .chip {
        display: inline-block;
        margin: var(--ddd-spacing-1) var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-sm);
        box-sizing: border-box;
        padding: var(--ddd-spacing-1) var(--ddd-spacing-3);

        font-size: var(--ddd-font-size-s);
        font-weight: normal;
        cursor: pointer;

        outline: none;
        border: solid 2px var(--tag-color);
        color: var(--tag-color);
        background: var(--bg-color);

        transition: all .1s;
      }
      .chip:nth-child(n):focus, .chip:nth-child(n):hover {
        background: var(--tag-color);
        color: var(--bg-color);
      }

      .correct {
        border: solid 1px var(--correct-col);
        color: var(--correct-col);
        background: var(--bg);
      }
      .correct:nth-child(n):focus, .correct:nth-child(n):hover {
        background: var(--correct-col);
        color: var(--bg);
      }

      .incorrect {
        border: solid 1px var(--incorrect-col);
        color: var(--incorrect-col);
        background: var(--bg-color);
      }
      .incorrect:nth-child(n):focus, .incorrect:nth-child(n):hover {
        background: var(--incorrect-col);
        color: var(--bg-color);
      }

      .disabled {
        opacity: 50% !important;
        pointer-events: none !important;
        user-select: none !important;
        background-color: var(--bg-color) !important;
        color: var(--text-1) !important;
      }

      confetti-container {
        display: flex;
        flex-direction: column;
      }

      .noPointerEvents {
        pointer-events: none;
        user-select: none;
      }

      .green {
        color: var(--correct-col);
      }
      .red {
        color: var(--incorrect-col);
      }
      
      #controls {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-bottom: var(--ddd-spacing-4);
      }
      /* Check button */
    #controls #checkBtn {
        background-color: var(--ddd-theme-default-opportunityGreen);
        color: var(--ddd-theme-default-white);
        font-family: Roboto (ddd-font-primary) [--ddd-font-primary];
        font-size: var(--ddd-font-size-s);
        border: 2px solid var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-sm);
        padding: 10px 20px;
        margin: 5px;
        cursor: pointer;
    }

    /* Reset button */
    #controls #resetBtn {
        background-color: var(--ddd-theme-default-original87Pink);
        color: var(--ddd-theme-default-white);
        font-family: Roboto (ddd-font-primary) [--ddd-font-primary];
        font-size: var(--ddd-font-size-s);
        border: 2px solid var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-sm);
        padding: 10px 20px;
        margin: 5px;
        cursor: pointer;
    }
    `;
  }

 
  connectedCallback() {
    super.connectedCallback();

    const answerSet = this.answerSet;

    fetch('src/tags-data.json')
      .then((response) => response.json())
      .then((json) => {
        const bankedTags = this.shadowRoot.getElementById('bankedTags');
        const possibleAnswers = json[answerSet];

        const buttons = [];
        for (const key in possibleAnswers) {
          const option = possibleAnswers[key];
          const button = document.createElement('button');
          button.classList.add('chip');
          button.draggable = true;
          button.textContent = key;
          button.dataset.correct = option.correct;
          button.dataset.feedback = option.feedback;
          button.addEventListener('dragstart', this.handleDragStart.bind(this));
          buttons.push(button);
        }

        // Shuffling all the answer options:
        for (let i = buttons.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
        }

        // Adding all the answer options to the answer section:
        buttons.forEach(button => {
          bankedTags.appendChild(button);
        });
    });

    // set/override imageUrl to the slotted image if there is a slotted img tag
    const slottedImage = this.querySelector('img');
    if(slottedImage) {
      this.imageURL = slottedImage.src;
    }
    // set/overide question text to slotted p text if any
    const slottedP = this.querySelector('p');
    if(slottedP) {
      this.question = slottedP.innerText;
    }

  }

  // Drag tag jawns from answer bank -> selected answers
  handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    this.currentTag = event.target;
  }
  handleDragOver(event) {
    event.preventDefault();
  }
  // instead of dropping, allow it to be clicked for mobile and stuff
  droppedClicked(event) {
    this.currentTag = event.target;
    if (this.checked === false) {
      const droppedTags = this.shadowRoot.getElementById('droppedTags');
      const bankedTags = this.shadowRoot.getElementById('bankedTags');

      if(this.currentTag.classList.contains('chip')) {
        this.currentTag.remove();
        bankedTags.append(this.currentTag);

        if (droppedTags.querySelectorAll('.chip').length === 0) {
          this.shadowRoot.querySelector('#dropTagHint').style.display = 'flex';
          // Hide check answers button:
          const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
          controlBtns.forEach(btn => {
              btn.style.visibility = 'hidden';
          });
        }
      }
    }
  }

  handleDrop(event) {
    event.preventDefault();

    const droppedTags = this.shadowRoot.getElementById('droppedTags');
    const button = this.currentTag;

    if (button && this.checked === false) {
        button.remove();
        droppedTags.appendChild(button);

        // Hide hint:
        this.shadowRoot.querySelector('#dropTagHint').style.display = 'none';
        // Show checkanswers button:
        const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
        controlBtns.forEach(btn => {
            btn.style.visibility = 'visible';
        });
    }
  }

  handleDragStartReverse(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    this.currentTag = event.target;
  }
  handleDragOverReverse(event) {
    event.preventDefault();
  }

  bankedClicked(event) {
    this.currentTag = event.target;
    if (this.checked === false) {
      const droppedTags = this.shadowRoot.getElementById('droppedTags');

      if(this.currentTag.classList.contains('chip')) {
        this.currentTag.remove();
        droppedTags.append(this.currentTag);

        // Hide hint:
        this.shadowRoot.querySelector('#dropTagHint').style.display = 'none';
        // Show checkanswers button:
        const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
        controlBtns.forEach(btn => {
            btn.style.visibility = 'visible';
        });
      }
    }
  }
  // dropped not lcicked
  handleDropReverse(event) {
    event.preventDefault();

    const droppedTags = this.shadowRoot.getElementById('droppedTags');
    const bankedTags = this.shadowRoot.getElementById('bankedTags');
    const button = this.currentTag;

    if (button && this.checked === false) {
        button.remove();
        bankedTags.appendChild(button);
        
        // Show hint again if all things are moved back:
        if (droppedTags.querySelectorAll('.chip').length === 0) {
            this.shadowRoot.querySelector('#dropTagHint').style.display = 'flex';
            // Hide check answers button:
            const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
            controlBtns.forEach(btn => {
                btn.style.visibility = 'hidden';
            });
        }
    }
  }


  resetTags() {
    // make it so it can be checked again:
    this.checked = false;

    // allow button to be clicked (or look like it can be clicked) again:
    this.shadowRoot.querySelector('#checkBtn').classList.remove('disabled');

    // Reset feedback section:
    this.shadowRoot.querySelector('#feedbackSection').style.display = 'none';
    this.shadowRoot.querySelector('#feedbackSection').innerHTML = ``;

    // Move all tags back to bank:
    const droppedTags = this.shadowRoot.getElementById('droppedTags');
    const bankedTags = this.shadowRoot.getElementById('bankedTags');
    const tagsToMove = Array.from(droppedTags.children).filter(seb => seb.id !== 'dropTagHint');

    // Each child remove the classes
    tagsToMove.forEach(mia => {
        bankedTags.appendChild(mia);
        mia.classList.remove("correct");
        mia.classList.remove("incorrect");
        mia.title = "";

        // FEEDBACK SEC
        this.shadowRoot.querySelector('#feedbackSection').innerHTML = ``;
    });

    // Remove disable class and disable -tabindexing from droppedTags:
    const droppedTagsChips = this.shadowRoot.querySelectorAll('#droppedTags .chip');
    for (const tag of droppedTagsChips) {
        tag.classList.remove("noPointerEvents");
        tag.removeAttribute('tabindex');
    }
    // Remove disable class and disable -tabindexing from bankedTags:
    const bankedTagsChips = this.shadowRoot.querySelectorAll('#bankedTags .chip');
      for (const tag of bankedTagsChips) {
          tag.classList.remove("noPointerEvents");
          tag.removeAttribute('tabindex');
    }


    // Shuffle:
    const buttons = Array.from(bankedTags.children);
    for (let i = buttons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      bankedTags.insertBefore(buttons[j], buttons[i]);
    }

    // Show hint:
    this.shadowRoot.querySelector('#dropTagHint').style.display = 'flex';
    // Hide check answers button:
    const controlBtns = this.shadowRoot.querySelectorAll('.controlBtn');
    controlBtns.forEach(btn => {
        btn.style.visibility = 'hidden';
    });
  }


  checkTags() {
    if(this.checked == false){
      this.checked = true;

      // helps compare if ALL are correct, as opposed to each individual correctness when itterated 
      let allDroppedCorrect = true;
      let allBankedCorrect = true;
  
      this.shadowRoot.querySelector('#checkBtn').classList.add('disabled');
  
      // Reset feedback section
      this.shadowRoot.querySelector('#feedbackSection').style.display = 'flex';
      this.shadowRoot.querySelector('#feedbackSection').innerHTML = ``;

      // Dropped tags:
      const droppedTags = this.shadowRoot.querySelectorAll('#droppedTags .chip');
      for (const tag of droppedTags) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            tag.classList.add("correct");

            // FEEDBACK SEC CORRECT
            this.shadowRoot.querySelector('#feedbackSection').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }
          else {
            tag.classList.add("incorrect");
            allDroppedCorrect = false;
            tag.title = tag.dataset.feedback;

            // FEEDBACK SEC INCORRECT
            this.shadowRoot.querySelector('#feedbackSection').innerHTML += `<li class="red">${tag.dataset.feedback}</li>`;
          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
      }
  
      // Banked tags:
      const bankedTags = this.shadowRoot.querySelectorAll('#bankedTags .chip');
      for (const tag of bankedTags) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

            // FEEDBACK SEC
            //this.shadowRoot.querySelector('#feedbackSection').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
      }
  
      if(allDroppedCorrect && allBankedCorrect) {  // All answers (banked and dropped) are where they should be
        //console.log("100%!!");
        this.makeItRain();
        //this.shadowRoot.querySelector('#feedbackSection').style.display = 'none';

        this.shadowRoot.querySelector('#feedbackSection').innerHTML = ``;
        const bankedTags = this.shadowRoot.querySelectorAll('#droppedTags .chip');
        for (const tag of bankedTags) {
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

            // Feedback
            this.shadowRoot.querySelector('#feedbackSection').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }
      }
    }
  }

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  render() {
    return html`
      <confetti-container id="confetti">
        <div style="width: 100%; display: flex; justify-content: center;">
          <img id="image" src=${this.imageURL}>
        </div>
        <div>
          <button class="description-btn" @click=${this.toggleDescription}>Click to view Description</button>
        </div>
        ${this.showDescription ? html`
          <div class="description-title">${this.description}</div>
        ` : ''}
        <div id="question">${this.question}</div>
        <div id="droppedTags" @click=${this.droppedClicked} @dragover=${this.handleDragOver} @drop=${this.handleDrop}>
            <div id="dropTagHint">Drop your answer choices here</div>
        </div>
        <div id="feedbackSection">
        </div>
        <div id="bankedTags" @click=${this.bankedClicked} @dragover=${this.handleDragOverReverse} @drop=${this.handleDropReverse}>
        </div>
        <div id="controls">
            <button id="resetBtn" class="controlBtn" @click=${this.resetTags}>
                Reset / Try Again
            </button>
            <button id="checkBtn" class="controlBtn" @click=${this.checkTags}>
                Check
            </button>
        </div>
      </confetti-container>
    `;
  }

  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }


  static get properties() {
    return {
      question: { type: String },
      imageURL: { type: String },
      description: { type: String},
      answerSet: { type: String },
      showDescription: { type: Boolean }
    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);