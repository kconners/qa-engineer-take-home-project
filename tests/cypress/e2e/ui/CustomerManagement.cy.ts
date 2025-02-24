import { openCustomerForEdit, selectors } from "../../modules/CustomerManagement"
import { ValidateModalIsClosed, CloseAddModal, validateModalForEdit, editCustomer } from "../../modules/NewCustomer"
import 'cypress-map'
import { addCustomer } from "../util/customers"
import { faker } from '@faker-js/faker';
import { CustomerData } from "../../interfaces/customer";

describe('Customer Management Page', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get(selectors.lbl_page, {timeout:5000}).should('be.visible');
        //Adding a wait to accommodate no loading indicator.
        cy.wait(3000);
      })
    
    it('Will have Page elements', () => {
        const headings = ['First Name','Last Name','Email','Address Line 1','Address Line 2','City','State','Zip Code', 'Notes', 'Actions']
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
    it('Should Allow a user Cancel an add', () => {
        cy.get(selectors.btn_addCustomer)
        .click();
        CloseAddModal();
        ValidateModalIsClosed()
    })
    it('Should Allow a user to edit a customer', async () => {
        let emailAddress = `${faker.person.firstName()}.${faker.person.lastName()}@lolmail.com`;
        let newCustomer = await addCustomer({
            firstName:faker.person.firstName(), 
                lastName: faker.person.lastName(), 
                email: emailAddress, 
                addressLine1: `${faker.number.int({max:10000})} ${faker.location.street()}`, 
                addressLine2: "Suite 104", 
                city: faker.location.city(), 
                state:faker.location.state(), 
                zip: faker.location.zipCode(), 
        })
        cy.reload()
        cy.wait(3000);
        openCustomerForEdit(newCustomer.id)

        validateModalForEdit(newCustomer)

        let changedCustomer: CustomerData;
        changedCustomer = newCustomer;
        changedCustomer.email = `${faker.person.firstName()}.${faker.person.lastName()}@lolmail.com`;
        changedCustomer.addressLine1 = `${faker.number.int({max:10000})} ${faker.location.street()}`;

        editCustomer(changedCustomer);
        openCustomerForEdit(newCustomer.id)
        validateModalForEdit(newCustomer)
    })
})