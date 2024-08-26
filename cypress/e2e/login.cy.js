import {selector, users} from "../support/e2e";
import {PAGES} from "../../src/utils/constants";

describe('LOGIN', function() {

    beforeEach(function() {
        cy.visit(PAGES.login);

        cy.clearAllCookies();
        cy.clearAllLocalStorage();
        cy.clearAllSessionStorage();
    });

    it('page exists', function() {
        cy.get('[data-testid="auth-form-login"]').should('exist');

        cy.get(selector.inputEmail).should('exist');
        cy.get(selector.inputPassword).should('exist');

        cy.get(selector.buttonSubmit).should('exist').should('be.disabled');
    });

    it('SUCCESS', function() {
        // type data
        cy.get(selector.inputEmail).type(users.success.email);
        cy.get(selector.inputPassword).type(users.success.password);
        cy.wait(500);

        // check button enabled
        cy.get(selector.buttonSubmit).should('not.be.disabled');
        cy.wait(500);

        // submit
        cy.intercept('POST', '/api/auth/login', { fixture: 'login_success.json' });
        cy.get(selector.buttonSubmit).click();

        // check profile page loaded
        cy.get(selector.pageProfile).should('exist');
        cy.get(selector.headerAuth).should('have.class', 'active');
        cy.get('[data-testid="auth-form-profile"]').should('exist');
        cy.contains('Профиль');

        cy.wait(500);
        cy.get('a').contains('Выход').click();
    });

    it('ERROR', function() {
        // type data
        cy.get(selector.inputEmail).type(users.error.email);
        cy.get(selector.inputPassword).type(users.error.password)
        cy.wait(500);

        // check button enabled
        cy.get(selector.buttonSubmit).should('not.be.disabled');
        cy.wait(500);

        // submit
        cy.intercept('POST', '/api/auth/login', { fixture: 'login_error.json', statusCode: 401 });
        cy.get(selector.buttonSubmit).click();

        // login form remains
        cy.get(selector.pageLogin).should('exist');
        cy.get('[data-testid="auth-error"]').should('exist').should('not.be.empty');
    });

});
