const { response, request } = require('express')

const customers = [];
customers.push(
{
	"first":"Timmy"
})
customers.push({
"first":"Tammy"
})

const getCustomers = (request, response) => {
		response.status(200).json(customers)
}

module.exports = {
	getCustomers
}