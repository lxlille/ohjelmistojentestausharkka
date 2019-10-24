
describe('Gallery tests', function() {

	beforeEach(function() {
		cy.visit('/ps/v1/index.html')
		cy.get('#input-username').type('user')
		cy.get('#input-password').type('password')
		cy.get('#album-login').click()
	})

	it('Basic elements', function() {
		// basic things 
		cy.get("#view-previous").should('be.visible')
		cy.get("#view-next").should('be.visible')
		cy.get("#view-searchbar-from").should('be.visible')
		cy.get("#view-searchbar-to").should('be.visible')
		cy.get("#view-searchbar-keywords").should('be.visible')
		cy.get("#view-search").should('be.visible')
		cy.get("#view-album").should('be.visible')
		// 9 pictures per page
		cy.get("#view-album > p > img").should('be.visible').and('have.length', 9)
		// first one should have the id 0 
		cy.get("#view-album > p > img").first().should('have.id', '0')
	})

	it('All images are visible', function() {
		// go through all the pages
		for (var i = 1; i < 6; i++) {
			cy.get('#view-album > p > img').each(($el) => {
				cy.wrap($el).should('be.visible')				
			})
			cy.get("#view-next").click()
		}

	})

})