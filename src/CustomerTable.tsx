import Button from "./Button";
import { useCustomerContext } from "./CustomerProvider";
import { useState } from "react";
import CustomerForm from "./CustomerForm";
import Modal from "./Modal";

function CustomerTable() {
  const {
    customerData
  } = useCustomerContext();
  const [modalOpen, setModalOpen] = useState(false);

  function handleModalToggle(): void {
    setModalOpen((previous) => {
      console.log("open", previous, !previous);
      return !modalOpen;
    });
  }

  return (
    
    <div className="table-container">
            {modalOpen && <Modal onClose={handleModalToggle}><CustomerForm closeModal={handleModalToggle}/> </Modal>}
      <table className="customer-table" data-cy="table_customers">
        <thead>
          <tr className="header-row">
            <th className="header-cell">First Name</th>
            <th className="header-cell">Last Name</th>
            <th className="header-cell">Email</th>
            <th className="header-cell">Address Line 1</th>
            <th className="header-cell">Address Line 2</th>
            <th className="header-cell">City</th>
            <th className="header-cell">State</th>
            <th className="header-cell">Zip Code</th>
            <th className="header-cell">Notes</th>
          </tr>
        </thead>
        <tbody className="table-body">
        {customerData.map((customer, index) => (
          <tr key={index} className="table-row">
            <td className="table-cell">{customer.firstName}</td>
            <td className="table-cell">{customer.lastName}</td>
            <td className="table-cell">{customer.email}</td>
            <td className="table-cell">{customer.addressLine1}</td>
            <td className="table-cell">{customer.addressLine2}</td>
            <td className="table-cell">{customer.city}</td>
            <td className="table-cell">{customer.state}</td>
            <td className="table-cell">{customer.zip}</td>
            <td className="table-cell">{customer.notes}</td>
            <td className="table-cell"><Button label="Edit" onClick={handleModalToggle} dataTestId="add-customer-button"/></td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default CustomerTable;