describe('Keywords tests', function() {

	beforeEach(function() {
		cy.visit('/ps/v2/index.html')
		cy.get('#input-username').type('user')
		cy.get('#input-password').type('password')
		cy.get('#album-login').click()
	})

	it('Add and then delete or change keywords', function() {
		cy.get('#0').click()
		cy.get('#view-full-keywords').type('key, word, hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		cy.get('#1').click()
		cy.get('#view-full-keywords').clear().type('hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		// tarkastetaan
		cy.get('#0').click()
		cy.get('#view-full-keywords').should('contain', 'key, word, hello')
		cy.get('#1').click()
		cy.get('#view-full-keywords').should('contain', 'hello')
		// poistetaan ja vaihdetaan
		cy.get('#0').click()
		cy.get('#view-full-keywords').clear()
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		cy.get('#1').click()
		cy.get('#view-full-keywords').clear().type('hi')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		//tarkastetaan
		cy.get('#0').click()
		cy.get('#view-full-keywords').should('contain', '')
		cy.get('#1').click()
		cy.get('#view-full-keywords').should('contain', 'hi')
	})
})