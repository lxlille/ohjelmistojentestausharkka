describe('Search tests', function() {

	beforeEach(function() {
		cy.visit('/ps/v2/index.html')
		cy.get('#input-username').type('user')
		cy.get('#input-password').type('password')
		cy.get('#album-login').click()
	})

	it('Word search - two pics', function() {
		// place some keywords
		cy.get('#0').click()
		cy.get('#view-full-keywords').type('key, word, hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		cy.get('#1').click()
		cy.get('#view-full-keywords').clear().type('hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		// find the pictures
		cy.get('#view-searchbar-keywords').clear().type('hello')
		cy.get('#view-search').click()
		cy.get('#view-album > p > img').should('have.length', 2)
		cy.get('#0').should('have.attr', 'src').should('contain', '1.jpg')
		cy.get('#1').should('have.attr', 'src').should('contain', '2.jpg')

	})

	it('Word search - two keywords', function() {
		// place some keywords
		cy.get('#0').click()
		cy.get('#view-full-keywords').type('key, word, hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		cy.get('#1').click()
		cy.get('#view-full-keywords').clear().type('hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		// find the pictures
		cy.get('#view-searchbar-keywords').clear().type('key, word')
		cy.get('#view-search').click()
		cy.get('#view-album > p > img').should('have.length', 1)
		cy.get('#0').should('have.attr', 'src').should('contain', '1.jpg')
	})

	it('Word search - false keyword', function() {
		// place some keywords
		cy.get('#0').click()
		cy.get('#view-full-keywords').type('key, word, hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		cy.get('#1').click()
		cy.get('#view-full-keywords').clear().type('hello')
		cy.get('#view-full-save-keywords').click()
		cy.get('#view-full-close').click()
		// find the pictures
		cy.get('#view-searchbar-keywords').clear().type('notakey')
		cy.get('#view-search').click()
		cy.get('#view-album > p > img').should('have.length', 0)
	})
	
	it('Time search - before the pictures', function() { 
		cy.get('#view-searchbar-from').type('2017-06-01')
		cy.get('#view-searchbar-to').type('2017-08-01')
		cy.get('#view-search').click()
		cy.get('#view-album').find('img').should('have.length', 0)
	})	
	it('Time search - after the pictures', function() {
		cy.get('#view-searchbar-from').type('2018-08-01')
		cy.get('#view-searchbar-to').type('2018-09-01')
		cy.get('#view-search').click()
		cy.get('#view-album').find('img').should('have.length', 0)
	})
	it('Time search - part of the pictures', function() {
		cy.get('#view-searchbar-from').type('2018-06-05')
		cy.get('#view-searchbar-to').type('2018-06-07')
		cy.get('#view-search').click()
		cy.get('#view-album').find('img').should('have.length', 2)
	})
	it('Time search - all the pictures', function() {
		cy.get('#view-searchbar-from').type('2018-06-01')
		cy.get('#view-searchbar-to').type('2018-08-01')
		cy.get('#view-search').click()
		for (var i = 1; i < 7; i++) {
			cy.get("#view-next").click()
		}
		cy.get('#3').should('have.attr', 'src').should('contain', '49.jpg')
	})
	it('Time search - error', function() {
		// From-date is later than to-date
		cy.get('#view-searchbar-from').type('2017-06-01')
		cy.get('#view-searchbar-to').type('2017-08-01')
		cy.get('#view-search').click()
		// Maybe an error message should be given
		// but in this case just check it doesn't crash
		cy.get('#view-album').should('be.visible')
	})
})