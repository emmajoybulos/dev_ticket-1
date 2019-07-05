import React from "react";
import { Table } from "reactstrap";

const adminTable = props => {
  let { currentUsers } = props;

  let renderUsers = (
    <tr align="center">
      <td colSpan="6">Loading users...</td>
    </tr>
  );

  if (currentUsers) {
    if (currentUsers.length > 0) {
      renderUsers = currentUsers.map(user => (
        <tr key={user._id}>
          <td>{user.firstname}</td>
          <td>{user.user_type}</td>
          <td>{user.user_brand}</td>
          <td>{user.email}</td>
        </tr>
      ));
    } else {
      renderUsers = (
        <tr align="center">
          <td colSpan="6">No data to display</td>
        </tr>
      );
    }
  }

  return (
    <Table responsive bordered striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Designation</th>
          <th>Brand</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>{renderUsers}</tbody>
    </Table>
  );
};

export default adminTable;
