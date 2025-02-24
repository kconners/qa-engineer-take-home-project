import { addCustomer }from "../util/customers"
import { CustomerData } from "../../interfaces/customer";

describe('Customer Management Page', () => {
    it('Get Users', () => {
        cy.request('GET', '/api/customers').then((response) => {
            expect(response.status).to.eq(200);
            const repo = response.body;
            expect(repo.length).to.greaterThan(1);
        });
    })  
    it('Get User by ID', () => {
        
        cy.wrap(null).then(async () => {  
            let newCustomer: CustomerData = ({
                firstName : "Kayeln",
                lastName : "Kayeln",
                email : "Kayeln",
                addressLine1 : "Kayeln",
                city : "Kayeln",
                state : "Kayeln",
                zip : "Kayeln",
            })
            const NewCustomer = await addCustomer(newCustomer);
        
            cy.request('GET', `/api/customers/${NewCustomer.id}/details`)
                .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.firstName).to.eq(newCustomer.firstName);
                expect(response.body.lastName).to.eq(newCustomer.lastName);
                expect(response.body.email).to.eq(newCustomer.email);
                expect(response.body.addressLine1).to.eq(newCustomer.addressLine1);
                if(newCustomer.addressLine2)
                expect(response.body.addressLine2).to.eq(newCustomer.addressLine2);
                expect(response.body.city).to.eq(newCustomer.city);
                expect(response.body.state).to.eq(newCustomer.state);
                expect(response.body.zip).to.eq(newCustomer.zip);
                expect(response.body.id).to.eq(NewCustomer.id);
                if(newCustomer.notes)
                expect(response.body.notes).to.eq(newCustomer.notes);

                cy.log(JSON.stringify(response.body))
            });
        })
    })  
    it('Add Users', () => {
        let newCustomer: CustomerData = ({
            firstName : "Kayeln",
            lastName : "Kayeln",
            email : "Kayeln",
            addressLine1 : "Kayeln",
            city : "Kayeln",
            state : "Kayeln",
            zip : "Kayeln",
        })

        cy.request('POST', '/api/customers', newCustomer).then((response) => {
            expect(response.status).to.eq(201);
            const repo = response.body;

            expect(repo.firstName).to.eq(newCustomer.firstName);
            expect(repo.lastName).to.eq(newCustomer.lastName);
            expect(repo.email).to.eq(newCustomer.email);
            expect(repo.addressLine1).to.eq(newCustomer.addressLine1);
            if(newCustomer.addressLine2)
            expect(repo.addressLine2).to.eq(newCustomer.addressLine2);
            expect(repo.city).to.eq(newCustomer.city);
            expect(repo.state).to.eq(newCustomer.state);
            expect(repo.zip).to.eq(newCustomer.zip);
            expect(repo.id).to.greaterThan(1);
            if(newCustomer.notes)
            expect(repo.notes).to.eq(newCustomer.notes);
        });
    })  
    it('Delete Users', () => {
        cy.wrap(null).then(async () => {  
            let newCustomer: CustomerData = ({
                firstName : "Kayeln",
                lastName : "Kayeln",
                email : "Kayeln",
                addressLine1 : "Kayeln",
                city : "Kayeln",
                state : "Kayeln",
                zip : "Kayeln",
            })
            const NewCustomer = await addCustomer(newCustomer);

            cy.request('DELETE', `/api/customers/${NewCustomer.id}/`)
            .then((response) => {
                expect(response.status).to.eq(200);
            })
            .then(() => {
                let options = ({
                    url:`/api/customers/${NewCustomer.id}/details`,
                    method: 'GET',
                    failOnStatusCode: false
                })
                cy.request(options)
                    .then((response) => {
                     expect(response.status).to.eq(404);
            });
        });
    })  
})  
})