import Controller from '@ember/controller';
import { Container } from 'inversify';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.container = new Container();
  }
});
