import {selector} from "../support/e2e";
import bun from "../fixtures/bun.json";
import {INGRSTATS, PAGES} from "../../src/utils/constants";

describe('MODAL', function() {
    beforeEach(function() {
        cy.visit(PAGES.constructor);
        cy.wait(1000);
    });

    it('ingredients loaded', function() {
        cy.contains('Соберите бургер');
        cy.get('[data-testgroup=ingredient]').should('have.length.at.least', 10);
    });

    it('open', function() {
        cy.get(selector.ingredientBun).first().click();

        cy.get(selector.modalOverlay).should('exist');
        cy.get(selector.modal).should('exist');

        cy.get(selector.modalHeader).contains('Детали ингредиента');
        cy.get(selector.modalBody).should('not.be.empty');

        cy.wait(1000);
    });

    it('open bun details', function() {
        cy.get(selector.ingredientBun).first().click();

        cy.get(selector.modalOverlay).should('exist');
        cy.get(selector.modal).should('exist');

        // check bun details
        cy.location('pathname').should('eq', PAGES.ingredientId.replace(':id', bun._id));
        cy.get(selector.modalBody).find('img').should('have.attr', 'src', bun.image_large)
        cy.get(selector.modalBody).contains(bun.name);

        Object.entries(INGRSTATS).forEach(([key, name]) => {
            cy.get(selector.modalBody)
                .contains(name).next('span')
                .contains(bun[key]);
        })

        cy.wait(1000);
    });

    it('close', function() {
        cy.get(selector.ingredientBun).first().click();

        cy.get(selector.modalOverlay).should('exist');
        cy.get(selector.modal).should('exist');

        cy.get(selector.modalHeader).contains('Детали ингредиента');
        cy.get(selector.modalBody).should('not.be.empty');
        cy.wait(2000);

        // closing
        cy.get(selector.modalHeader).find('svg').click();
        cy.get(selector.modalOverlay).should('not.exist');
        cy.get(selector.modal).should('not.exist');

        cy.location('pathname').should('eq', PAGES.constructor);
    });
});
