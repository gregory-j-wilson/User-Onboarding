describe('Checking Name, Email, and Password, Terms', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/')
    })
    
    it('types name and checks that the name is what was inputted', () => {
        cy.get('input[name="name"]')
            .type('Gregory Wilson')
            .should('have.value', 'Gregory Wilson')
    })

    it('Type email address', () => {
        cy.get('input[name="email"]')
            .type('cooldude@dudes.com')
    })

    it('Type a password', () => {
        cy.get('input[name="password"]')
            .type('coolpassword123')
    })

    it('Check terms of service box', () => {
        cy.get('input[name="terms"]')
          .check()
    })
})

describe('Submit form data, check for validation', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/')
    })

    it('Submit form data', () => {
        cy.get('form').submit()
    })

    it('Check for form validation if name input is empty', () => {
        cy.get('input[name="name"]')
            .type('Greg')
            .clear()
        cy.get('.name')
            .should('contain', 'You gotta put your name!')
    })

    it('Check for form validation if email input is empty', () => {
        cy.get('input[name="email"]')
            .type('gregatgmail')
            .clear()
        cy.get('.email')
            .should('have.text', 'We need your email..' )
    })

    it('Check for form validation if password input is empty', () => {
        cy.get('input[name="password"]')
            .type('password')
            .clear()
        cy.get('.password')
            .should('have.text', 'Password is Required' || 'Passwords must be at least 6 characters long.')
    })

    it('Check for form validation if check input is empty', () => {
        cy.get('input[name="terms"]').check()
            .uncheck().should('not.be.checked')
        cy.get('.terms')
            .should('have.text', 'You must accept the terms of service...')
    })
})