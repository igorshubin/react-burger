import {selector} from "../support/e2e";
import {PAGES} from "../../src/utils/constants";

describe('DRAGNDROP', function() {
    beforeEach(function() {
        cy.visit(PAGES.constructor);
    });

    it('ingredients loaded', function() {
        cy.contains('Соберите бургер');
        cy.get('[data-testgroup=ingredient]').should('have.length.at.least', 10);
    });

    it('ingredients added', function() {
        cy.wait(1000);
        cy.get(selector.ingredientBun).first().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');

        cy.wait(2000);

        cy.get(selector.ingredientSauce).first().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');
        cy.wait(300);
        cy.get(selector.ingredientSauce).last().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');

        cy.wait(500);

        cy.get(selector.ingredientMain).first().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');
        cy.wait(300);
        cy.get(selector.ingredientMain).last().trigger('dragstart');
        cy.get(selector.listConstructor).trigger('drop');

        cy.get('button').contains('Оформить заказ').should('not.be.disabled');
    });
});
