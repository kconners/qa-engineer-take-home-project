import { selectors } from "../../modules/CustomerManagement"
import { ValidateModalIsClosed, CloseAddModal, AddNewCustomer, ValidateRequiredFields } from "../../modules/NewCustomer"
import { faker } from '@faker-js/faker';


describe('Customer Management Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(selectors.lbl_page, {timeout:5000}).should('be.visible');
        //Adding a wait to accommodate no loading indicator.
        cy.wait(3000);
      })
    it('Should have required fields', () => {
        cy.get(selectors.btn_addCustomer)
        .click();
        ValidateRequiredFields();
    })
    it('Should Allow a user add a new customer', () => {
        cy.get(selectors.btn_addCustomer)
        .click();
        
        AddNewCustomer({firstName:faker.person.firstName(), 
                        lastName: faker.person.lastName(), 
                        email: `${faker.person.firstName()}.${faker.person.lastName()}@lolmail.com`, 
                        addressLine1: `${faker.number.int({max:10000})} ${faker.location.street()}`, 
                        addressLine2: "Suite 104", 
                        city: faker.location.city(), 
                        state:faker.location.state(), 
                        zip: faker.location.zipCode(), 
                    })
    })
    
})