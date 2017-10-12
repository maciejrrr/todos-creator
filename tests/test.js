import Page from './models/page';

fixture`integration testing`.beforeEach(async t => {
  const page = new Page();
  t.ctx.page = page;
}).page`http://localhost:3000/`;

test('creates page element', async t => {
  const { page } = t.ctx;
  page.create();
  const cardsCount = page.card.count;
  const tasksCount = page.task.count;
  await t
    .expect(cardsCount)
    .eql(2)
    .expect(tasksCount)
    .eql(4);
});

test('drag task from first card to second', async t => {
  const { page } = t.ctx;
  page.create();
  const secondCard = page.card.withText(page.cards[1].cardName);
  const secondCardTasksCount = secondCard.find('p.sc-iwsKbI').count;
  const firstCardFirstTask = page.task.withText(page.tasks[0].task);
  await t
    .dragToElement(firstCardFirstTask, secondCard)
    .expect(secondCardTasksCount)
    .eql(3);
});
