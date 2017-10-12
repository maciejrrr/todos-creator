import { Selector, t } from 'testcafe';

export default class Board {
  constructor(name) {
    this.boardInput = Selector('.ant-layout-header')
      .find('input')
      .withAttribute('placeholder', 'Add a board...');
    this.boardName = name;
  }

  async submit() {
    await t.typeText(this.boardInput, this.boardName).pressKey('enter');
  }
}
