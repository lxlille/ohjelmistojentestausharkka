
describe('Login tests', function() {

	beforeEach(function() {
		cy.visit('/ps/v2/index.html')
	})

	it('Valid login', function() {
		cy.get('#input-username').type('user')
		cy.get('#input-password').type('password')
		cy.get('#album-login').click()
		cy.get('#input-username').should('not.be.visible')
		cy.get('#view-list').should('be.visible')
	})

	it('Invalid login', function() {
		// invalid name and pass
		cy.log("Invalid username and password")
		cy.get('#input-username').type('notuser')
		cy.get('#input-password').type('notpassword')
		cy.get('#album-login').click()
		cy.get('#input-username').should('be.visible')
		cy.get('#view-list').should('not.be.visible')
		// invalid pass
		cy.log("Invalid password")
		cy.get('#input-username').clear().type('notuser')
		cy.get('#input-password').clear().type('password')
		cy.get('#album-login').click()
		cy.get('#input-username').should('be.visible')
		cy.get('#view-list').should('not.be.visible')
		// invalid name
		cy.log("Invalid username")
		cy.get('#input-username').clear().type('notuser')
		cy.get('#input-password').clear().type('password')
		cy.get('#album-login').click()
		cy.get('#input-username').should('be.visible')
		cy.get('#view-list').should('not.be.visible')
	})

})