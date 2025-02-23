import { selectors } from "../../modules/CustomerManagement"
import { ValidateModalIsClosed, CloseAddModal, AddNewCustomer } from "../../modules/NewCustomer"


describe('Customer Management Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(selectors.lbl_page, {timeout:5000}).should('be.visible');
        //Adding a wait to accommodate no loading indicator.
        cy.wait(5000);
      })
    it('Should Allow a user add a new customer', () => {
        cy.get(selectors.btn_addCustomer)
        .click();
        
        AddNewCustomer({firstName:"Timmy", 
                        lastName: "Otool", 
                        email: "Otool", 
                        addressLine1: "Otool", 
                        addressLine2: "Otool", 
                        city: "Otool", 
                        state: "Otool", 
                        zip: "65454"
                    })
    })
    
})