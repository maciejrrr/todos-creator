import { Selector } from 'testcafe';
import Board from './board';
import Card from './card';
import Task from './task';

export default class Page {
  constructor() {
    this.boardInput = Selector('.ant-layout-header')
      .find('input')
      .withAttribute('placeholder', 'Add a board...');
    this.cardInput = Selector('input').withAttribute('placeholder', 'Add a card...');
    this.newTaskLink = Selector('a').withText('Add a task...');
    this.tastkTextarea = Selector('textarea.sc-htoDjs');
    this.submitTaskButton = Selector('button.sc-bwzfXH');
    this.card = Selector('div.sc-VigVT');
    this.task = Selector('div.sc-dnqmqq');
    this.select = Selector('.ant-select-selection__rendered');

    this.boards = [new Board('first board')];
    this.cards = [new Card('first card'), new Card('second card')];

    this.tasks = [
      new Task('first task card one', this.cards[0]),
      new Task('second task card one', this.cards[0]),
      new Task('first task card two', this.cards[1]),
      new Task('second task card two', this.cards[1]),
    ];
  }

  create() {
    this.boards.forEach(board => board.submit());
    this.cards.forEach(card => card.submit());
    this.tasks.forEach(task => task.submit());
  }
}
