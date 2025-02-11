/// <reference types="cypress" />

const testUrl = 'http://localhost:4000';
const ingredientDetails = 'Детали ингредиента';
const ingredientFirst = 'Ингредиент 1';

describe('Тесты для конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Добавление булки в конструктор', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains(ingredientFirst)
      .should('exist');
    cy.get('[data-cy=constructor-bun-2]')
      .contains(ingredientFirst)
      .should('exist');
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sause-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 3')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Ингредиент 12')
      .should('exist');
  });

  afterEach(() => {
    cy.intercept('GET', 'api/ingredients', {});
  });
});

describe('Тесты для модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Открытие модальных окон', () => {
    cy.contains(ingredientDetails).should('not.exist');
    cy.contains(ingredientFirst).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('#modals').contains(ingredientFirst).should('exist');
  });

  it('Закрытие модальных окон на Х', () => {
    cy.contains(ingredientFirst).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains(ingredientDetails).should('not.exist');
  });

  it('Закрытие модальных окон на оверлей', () => {
    cy.contains(ingredientFirst).click();
    cy.contains(ingredientDetails).should('exist');
    cy.get('[data-cy=modal-overlay]').click('right', { force: true });
    cy.contains(ingredientDetails).should('not.exist');
  });

  afterEach(() => {
    cy.intercept('GET', 'api/ingredients', {});
  });
});

describe('Тесты для оформления заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', 'api/auth/login', { fixture: 'login.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'orders.json' }).as('order');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.viewport(1300, 800);
    cy.visit(testUrl);
  });

  it('Создание заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sause-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=order-result] button').click();

    cy.wait('@order')
      .its('request.body')
      .should('deep.equal', { ingredients: ['1', '3', '12', '1'] });

    cy.get('[data-cy=order-number]').contains('12345').should('exist');

    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get('[data-cy=constructor]')
      .contains(ingredientFirst)
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 3')
      .should('not.exist');
    cy.get('[data-cy=constructor]')
      .contains('Ингредиент 12')
      .should('not.exist');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.intercept('GET', 'api/ingredients', {});
    cy.intercept('GET', 'api/auth/user', {});
    cy.intercept('POST', 'api/orders', {});
  });
});
