import { CustomerData } from "../interfaces/customer"
import { selectors as CustomerManagement_Selectors } from "./CustomerManagement";

export const selectors = {
    btn_save: '[data-testid="save-button"]',
    btn_close: '[class=close-button]',
    modal: '[class=modal-container]',
    lbl_modal: '[class=modal-header]',
    txt_firstName: '[data-testid="first-name"]',
    txt_lastName: '[data-testid="last-name"]',
    txt_email: '[data-testid="email"]',
    txt_addressLine1: '[data-testid="address-line-1"]',
    txt_addressLine2: '[data-testid="address-line-2"]',
    txt_city: '[data-testid="city"]',
    txt_state: '[data-testid="state"]',
    txt_zipCode: '[data-testid="zip"]',
    txt_notes: '[data-testid="notes"]',

}

function ValidateModal() {
    cy.get(selectors.modal).should('be.visible')

}

function getNumberOfCustomers() {
    let count;
    cy.get(CustomerManagement_Selectors.table_customers_body)
    .find("tr")
    .its('length')
    .as('rowCount')
}

export function AddNewCustomer(customer: CustomerData ) {
    ValidateModal();

    let existingRowCount = getNumberOfCustomers();
    cy.log(`${existingRowCount}`)
    
    getNumberOfCustomers();
    cy.get(selectors.txt_firstName).type(customer.firstName);
    cy.get(selectors.txt_lastName).type(customer.lastName);
    cy.get(selectors.txt_email).type(customer.email);
    cy.get(selectors.txt_addressLine1).type(customer.addressLine1);
    if (customer.addressLine2)

    cy.get(selectors.txt_addressLine2).type(customer.addressLine2);
    cy.get(selectors.txt_city).type(customer.city);
    cy.get(selectors.txt_state).type(customer.state);
    cy.get(selectors.txt_zipCode).type(customer.zip);

    if (customer.notes)
    cy.get(selectors.txt_notes).type(customer.notes);

    cy.get(selectors.btn_save).click({force:true});

    cy.get('@rowCount')
    .then(count => {
        if (count) {   // not count >= 0, because 0 means no elements
            cy.log(`There are ${count} elements`) 
            let rowCount = Number(count);
            validateRecord(customer, rowCount)    
        }
    })
    

}

function validateRecord(customer: CustomerData, rowNumber: number) {

    let newRow = rowNumber;
    cy.log(`There are ${newRow} elements`) 
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(0).should('contain', customer.firstName) 
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(1).should('contain', customer.lastName) 
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(2).should('contain', customer.email) 
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(3).should('contain', customer.addressLine1) 
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(5).should('contain', customer.city) 
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(6).should('contain', customer.state) 
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(7).should('contain', customer.zip) 
    if(customer.addressLine2)
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(4).should('contain', customer.addressLine2) 
    if(customer.notes)
    cy.get(CustomerManagement_Selectors.table_customers_body).find('tr').eq(newRow).find('td').eq(8).should('contain', customer.notes) 
    

    cy.log(`${rowNumber}`)
}

export function CloseAddModal() {
    cy.get(selectors.modal).should('be.visible')
    cy.get(selectors.btn_close).click({force:true});
}
export function ValidateModalIsClosed() {
    cy.get(selectors.modal).should('not.exist')
}