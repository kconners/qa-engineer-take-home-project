import { selectors } from "../../modules/CustomerManagement"
import { ValidateModalIsClosed, CloseAddModal } from "../../modules/NewCustomer"
import 'cypress-map'

describe('Customer Management Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(selectors.lbl_page, {timeout:5000}).should('be.visible');
        //Adding a wait to accommodate no loading indicator.
        cy.wait(5000);
      })
    
    it('Will have Page elements', () => {
        const headings = ['First Name','Last Name','Email','Address Line 1','Address Line 2','City','State','Zip Code', 'Notes']
        //Validate Page Label
        cy.get(selectors.lbl_page)
            .should('be.visible')
            .should('have.text', "Customer Management")
        //Validate Table Exist
        cy.get(selectors.table_customers)
            .should('be.visible')
        //Validate Headers
        cy.get(selectors.table_header).map('innerText').should('deep.equal', headings)
        //Validate Button
        cy.get(selectors.btn_addCustomer)
            .should('be.visible')        
    })
    it('Allow a user to add a user', () => {
        cy.get(selectors.btn_addCustomer)
        .click();
        ValidateModalIsClosed()
        cy.wait(5000);
    })
    it('Should Allow a user Cancel an add', () => {
        cy.get(selectors.btn_addCustomer)
        .click();
        CloseAddModal();
        ValidateModalIsClosed()
    })
})