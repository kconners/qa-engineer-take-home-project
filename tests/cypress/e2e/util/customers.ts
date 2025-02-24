
import axios, { Axios } from "axios";
import { CustomerData } from "../../interfaces/customer";

export async function addCustomer(newCustomer: CustomerData): Promise<CustomerData> {
     
    const repo = await axios.post('http://localhost:5173/api/customers', newCustomer)
    return(repo.data)

}