import {selector, users} from "../support/e2e";
import {order} from "../fixtures/order.json";
import {PAGES} from "../../src/utils/constants";

describe('ORDER', function() {
    beforeEach(function() {
        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();

        cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
        cy.intercept('POST', '/api/auth/login', { fixture: 'login_success.json' });

        cy.visit(PAGES.constructor);
    });

    it('ingredients loaded', function() {
        cy.contains('Соберите бургер');
        cy.get('[data-testgroup=ingredient]').should('have.length.at.least', 10);
    });

    it('create', function() {
        // add items to order
        cy.get(selector.ingredientBun).first().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');
        cy.get(selector.ingredientSauce).first().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');
        cy.get(selector.ingredientMain).first().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');
        cy.wait(1000);

        // submit (not logged)
        cy.get('button').contains('Оформить заказ').click();
        cy.wait(1000);

        // goto login & auth
        cy.location('pathname').should('eq', PAGES.login);
        cy.get(selector.pageLogin).should('exist');
        cy.wait(1000);

        // fill form & submit
        cy.get(selector.inputEmail).type(users.success.email);
        cy.get(selector.inputPassword).type(users.success.password);
        cy.wait(1000);
        cy.get(selector.buttonSubmit).click();

        // get back to index
        cy.location('pathname').should('eq', PAGES.constructor);
        cy.get(selector.pageConstructor).should('exist');
        cy.get(selector.buttonSubmit).should('exist');
        cy.wait(1000);

        // submit order
        cy.get(selector.buttonSubmit).click();

        // check order modal
        cy.get(selector.buttonSubmit).contains('Заказ оформлен');
        cy.get(selector.modalOverlay).should('exist');
        cy.get(selector.modal).should('exist');
        cy.get('[data-testid="order-number"]').should('exist').contains(order.number);
    });
});
