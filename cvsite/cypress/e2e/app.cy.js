describe('App Component End-To-End Tests', () => {

    beforeEach(() => {
        cy.intercept('POST', 'https://keiru8niga.execute-api.eu-west-1.amazonaws.com/increment/saveToDB', (req) => {
            req.reply({
                statusCode: 200,
                body: {
                    Attributes: {
                        count: 43,
                    },
                },
            });
        }).as('postToAPI');
    });

    it('loads the app and makes an API call', () => {
        // Visit the app
        cy.visit('http://localhost:3000');

        // Verify API was called
        cy.wait('@postToAPI').its('response.statusCode').should('eq', 200);

        // Check that visitor count is displayed correctly in the NavigationBar
        cy.get('.navbar-right p').contains('VISITOR COUNT: 43');
    });

    it('handles API error gracefully', () => {
        // Mock an API error
        cy.intercept('POST', 'https://keiru8niga.execute-api.eu-west-1.amazonaws.com/increment/saveToDB', {
          statusCode: 500,
          body: { message: 'Internal Server Error' },
        }).as('postToAPIError');
    
        // Visit the app
        cy.visit('http://localhost:3000');
    
        // Wait for the API call to fail
        cy.wait('@postToAPIError');
    
        // Verify error handling in console (if needed, spy on console.error)
        cy.on('window:console', (console) => {
          expect(console.error).to.be.calledWith('Error:'); // Replace with specific error message
        });
    
        // Confirm UI handles error gracefully
        cy.contains('Visitor count:').should('not.exist'); // Adjust based on UI behavior
      });
    
})