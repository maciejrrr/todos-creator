import { Selector, t } from 'testcafe';

export default class Task {
  constructor(task, card) {
    this.activeCard = Selector('div.sc-jzJRlG').withText(card.cardName);
    this.newTaskLink = this.activeCard.find('a').withText('Add a task...');
    this.textarea = this.activeCard.find('textarea.sc-htoDjs');
    this.button = this.activeCard.find('button.sc-bwzfXH');
    this.closeButton = this.activeCard.find('.anticon-close');
    this.task = task;
  }

  async submit() {
    await t
      .click(this.newTaskLink)
      .typeText(this.textarea, this.task)
      .click(this.button)
      .click(this.closeButton);
  }
}
