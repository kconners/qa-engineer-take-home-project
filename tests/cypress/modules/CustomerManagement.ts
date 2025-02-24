export const selectors = {
    btn_addCustomer: '[data-testid="add-customer-button"]',
    lbl_page: '[data-cy="page_header"]',
    table_customers: '[data-cy="table_customers"]',
    table_customers_body: '[data-cy="table_customers"] tbody ',
    table_header: '[data-cy="table_customers"] thead tr th',
}

export function openCustomerForEdit(customerId: number) {
    cy.get(buildEditButton(customerId)).click({force:true});
    cy.wait(5000)
}

function buildEditButton(customerId) {
    return `[data-testid="edit-customer-button-${customerId}"]`
}
