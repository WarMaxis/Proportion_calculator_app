import $ from 'jquery';

import Magic from '../utils/magic';

export default class CalcForm extends Magic {
  constructor() {
    super();

    const inputA = $('#calc-input-a'),
      inputB = $('#calc-input-b'),
      inputC = $('#calc-input-c'),
      inputX = $('#calc-input-x'),
      switchButtonAB = $('#switch-a_b-button'),
      switchButtonCX = $('#switch-c_x-button'),
      calcFormContainer = $('.calc-form-container');

    this.$allInputs = [inputA, inputB, inputC, inputX];

    this.$allButtons = [switchButtonAB, switchButtonCX];

    this.$calcContainer = calcFormContainer;

    this.$window = window.document;

    this.defaultState = {
      defaultValueA: inputA.val(),
      defaultValueB: inputB.val(),
      defaultValueC: inputC.val(),
      defaultValueX: inputX.val()
    };

    this.allDefaultValues = Object.keys(this.defaultState).map(key => this.defaultState[key]);

    this.state = {};

    this.getCurrentState = () => {
      this.state = {
        currentValueA: this.$allInputs[0].val(),
        currentValueB: this.$allInputs[1].val(),
        currentValueC: this.$allInputs[2].val(),
        currentValueX: this.$allInputs[3].val()
      };
    };

    this.switch = (button) => {
      if (button === switchButtonAB) {
        this.getCurrentState();

        inputA.val(this.state.currentValueB);
        inputB.val(this.state.currentValueA);
      } else if (button === switchButtonCX) {
        this.getCurrentState();

        inputC.val(this.state.currentValueX);
        inputX.val(this.state.currentValueC);
      }
    };

    this.calculateValues = () => {
      this.getCurrentState();
      
      const pattern = (a, b, c) => (b * c) / a;

      inputX.val(
        pattern(this.state.currentValueA, this.state.currentValueB, this.state.currentValueC)
      );
    };

    this.changeValueEvent = new CustomEvent('changeBInForm');

    this.events();
  }

  static pattern(a, b, c) {
    return (b * c) / a;
  }

  events() {
    this.$allButtons[0].on('click', () => {
      this.switch(this.$allButtons[0]);

      this.calculateValues();

      this.$window.dispatchEvent(this.changeValueEvent);
    });
    this.$allButtons[1].on('click', () => {
      this.switch(this.$allButtons[1]);

      this.calculateValues();
    });

    this.$calcContainer.on('input', () => {
      this.calculateValues();

      this.$window.dispatchEvent(this.changeValueEvent);
    });

    this.$window.addEventListener('changeB', () => {
      this.calculateValues();
    });
  }

  reset() {
    this.state = Object.assign({}, this.defaultState);

    for (let i = 0, c = this.$allInputs.length; i < c; i++) {
      this.$allInputs[i].val(this.allDefaultValues[i]);
    }
  }
}
