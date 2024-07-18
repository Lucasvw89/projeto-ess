/* eslint-disable prettier/prettier */
import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps'

Given('Eu Estou na página do filme "Teste"', () => {
  cy.visit('http://localhost:3005/filme/d9a92df2-2d0e-11ef-85cc-15bfccf04c98')
})

When('Eu clico no botão "Poste um Review"', () => {
  cy.get('button').contains('Poste um Review').click()
})

Then('Um "Modal de Review" abre na minha tela', () => {
  cy.get('.modal').should('exist')
})

And('Eu preencho "Filme muito bom" no campo "Review", "5" no campo nota e clico em "ENVIAR"', () => {
  cy.get('textarea').type('Filme muito bom')
  // Select the Rating component using the data-testid attribute
  cy.get('[data-testid="rating-component"]').as('rating')

  // Measure the dimensions and calculate the position to click
  cy.get('@rating').then(($el) => {
    const ratingWidth = $el.width()
    const starsCount = 5 // Assuming 5 stars in the Rating component
    const targetStarIndex = 5 // 5th star for the maximum rating
    const clickPosition = (ratingWidth / starsCount) * (targetStarIndex - 0.5)

    cy.wrap($el).click(clickPosition, $el.height() / 2)
  })

  cy.get('button').contains('ENVIAR').click()
})

And('O "Modal de Review" fecha', () => {
  cy.get('.modal').should('not.exist')
})

And('Eu posso ver meu review no "Forum"', async () => {
  cy.get('.post').contains('Filme muito bom').should('exist')
})
