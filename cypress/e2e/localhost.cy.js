import {localHost, selector} from "../support/e2e"
import {PAGES} from "../../src/utils/constants";

describe('APP is available', function() {
    it('localhost', function() {
        cy.visit(localHost);

        cy.get(selector.pageConstructor).should('exist');
        cy.location('pathname').should('eq', PAGES.constructor);
    });
});
