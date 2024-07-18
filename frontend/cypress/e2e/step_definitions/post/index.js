/* eslint-disable prettier/prettier */
import { Before, Given, When, And, Then, After } from 'cypress-cucumber-preprocessor/steps'

Before(async () => {
  await factory_start()
})

After(async () => {
  await factory_end()
})

Given('Eu Estou na página do filme "Teste"', () => {
  cy.visit(`http://localhost:3005/filme/${filme_id}`)
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

// Scenario: Criação de um review sem a descricao.
Given('Given Eu Estou na página do filme "Teste"', async () => {
  cy.visit(`http://localhost:3005/filme/${filme_id}`)
})

When('Eu clico no botão "Poste um Review"', () => {
  cy.get('button').contains('Poste um Review').click()
})

Then('Um "Modal de Review" abre na minha tela', () => {
  cy.get('.modal').should('exist')
})

And('Eu preencho "5" no campo nota e clico no botão "ENVIAR"', () => {
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

And('Eu posso ver meu review no "Forum", com nota "5" e sem "Review"', async () => {
  // cy.get('.post').contains('Filme muito bom').should('exist')
  cy.get('.post').within(() => {
    // Check for 5 red stars
    cy.get('.MuiRating-iconFilled')
      .should('have.length', 10)
      .each(($star) => {
        cy.wrap($star).find('svg').should('have.attr', 'style', 'color: rgb(255, 24, 44);')
      })
  })
})

let filme_id

let factory_start = async () => {
  // Factory create
  const movieData = {
    nome: 'Teste',
    ano: '1337',
    duracao: '1h54m',
    genero: '1',
    sinopse: 'QA Movie.',
    poster: 'https://image.tmdb.org/t/p/original/qirvDexByE5erglM8fdIm0AEVFD.jpg'
  }

  const response = await fetch('http://localhost:3000/movie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movieData)
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  filme_id = data.filme_id
}

let factory_end = async () => {
  // Factory remove
  const response = await fetch('http://localhost:3000/movie', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ filme_id: filme_id })
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await response.json()
  expect(data).to.have.property('message', 'Filme removido com sucesso')
}
