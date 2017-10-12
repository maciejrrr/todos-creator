import { Selector, t } from 'testcafe';

export default class Card {
  constructor(name) {
    this.newCardInput = Selector('input').withAttribute('placeholder', 'Add a card...');
    this.cardName = name;
  }

  async submit() {
    await t.typeText(this.newCardInput, this.cardName).pressKey('enter');
  }
}
