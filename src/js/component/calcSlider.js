import $ from 'jquery';

import Magic from '../utils/magic';

export default class CalcSlider extends Magic {
  constructor() {
    super();

    this.$slider = $('#calc-slider-range');
    this.$sliderCurrentPercentage = $('#calc-slider-label');
    this.$allNormalInputs = [$('#calc-input-a'), $('#calc-input-b')];
    this.$window = window.document;
    this.defaultState = {
      sliderValue: this.$slider.val()
    };
    this.state = {};
    this.changeValueEvent = new CustomEvent('changeB');
    this.changeBValue();
  }

  getCurrentState() {
    this.state = {
      currentSliderValue: this.$slider.val(),
      currentAValue: this.$allNormalInputs[0].val(),
      currentBValue: this.$allNormalInputs[1].val()
    };
  }

  changeBValue() {
    this.$slider.on('input change', () => {
      this.getCurrentState();
      this.$allNormalInputs[1].val((this.state.currentAValue * this.state.currentSliderValue) / 100);
      this.$window.dispatchEvent(this.changeValueEvent);
      this.$sliderCurrentPercentage.text(this.$slider.val());
    });

    this.$window.addEventListener('changeBInForm', () => {
      const perCent = (this.state.currentBValue / this.state.currentAValue) * 100;
    
      this.getCurrentState();
      this.$slider.val(perCent);
      this.$sliderCurrentPercentage.text(this.$slider.val());
    });
  }

  reset() {
    this.state = Object.assign({}, this.defaultState);
    this.$slider.val(this.defaultState.sliderValue);
    this.$sliderCurrentPercentage.text(this.defaultState.sliderValue);
  }
}
