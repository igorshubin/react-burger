// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

export const localHost = 'http://localhost:3000/';


export const users = {
  'success': {email: 'ishubin77@gmail.com', password: '123456'},
  'error': {email: '100@test.com', password: '123456'},
}

export enum selector {
  modal = '[data-testid=modal]',
  modalOverlay = '[data-testid=modal-overlay]',
  modalHeader = '[data-testid=modal-header]',
  modalBody = '[data-testid=modal-body]',
  ingredientBun = '[data-testid=ingredient-bun]',
  ingredientSauce = '[data-testid=ingredient-sauce]',
  ingredientMain = '[data-testid=ingredient-main]',
  inputEmail = '[data-testid="auth-input-email"]',
  inputPassword = '[data-testid="auth-input-password"]',
  pageLogin = '[data-testid="page-login"]',
  pageConstructor = '[data-testid="page-constructor"]',
  pageProfile = '[data-testid="page-profile"]',
  pageFeed = '[data-testid="page-feed"]',
  buttonSubmit = '[data-testid="button-submit"]',
  headerIndex = '[data-testid=header-index]',
  headerFeed = '[data-testid=header-feed]',
  headerAuth = '[data-testid="header-auth"]',
  listConstructor = '[data-testid=burger-constructor-list]',
}
