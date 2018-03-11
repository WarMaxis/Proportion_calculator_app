import $ from 'jquery';

import Magic from '../utils/magic';
import Form from './calcForm';
import Slider from './calcSlider';

// mediator
export default class Calc extends Magic {
  constructor() {
    super();

    this.form = new Form();
    this.slider = new Slider();

    this.$reset = $('#calc-reset');

    this.events();
  }

  events() {
    this.$reset.on('click', this.reset.bind(this));
  }

  // to ma byc przywrócenie zapamiętanyc wartości, a nie reset formularza
  reset() {
    this.form.reset();
    this.slider.reset();
  }
}
