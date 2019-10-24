
describe('Picture tests', function() {

	beforeEach(function() {
		cy.visit('/ps/v1/index.html')
		cy.get('#input-username').type('user')
		cy.get('#input-password').type('password')
		cy.get('#album-login').click()
	})

	it('Basic elements', function() {
		cy.get("#view-album > p > img").eq(0).click()
		cy.get("#view-full-previous").should('be.visible')
		cy.get("#view-full-next").should('be.visible')
		cy.get("#view-full-close").should('be.visible')
		cy.get("#view-full-keywords").should('be.visible')
		cy.get("#view-full-save-keywords").should('be.visible')
		cy.get("#view-full-image").should('be.visible')
	})

	it('All big photos are visible', function() {
		var picnr = 1
		// go through all the pages
		for (var i = 1; i < 6; i++) {
			// click open the first big picture
			cy.get('#view-album > p > img').first().click()
			for (var j = 1; j < 10; j++) {
				//image should be visible
				cy.get("#view-full-image").should('be.visible')
				// and it should be the right img
				var name = picnr.toString() + "."
				cy.get("#view-full-image").should('have.attr', 'src').should('contain', name)
				// after the check go to next img
				cy.get("#view-full-next").click()
				picnr++
			}
			// after checking all the pictures go to next page
			cy.get("#view-full-close").click()
			cy.get("#view-next").click()
		}
	})
})