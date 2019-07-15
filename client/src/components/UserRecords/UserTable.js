import React from "react";
import { Table } from "reactstrap";

const UsersTable = props => {
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
          <td>
            {user.firstname} {user.lastname}
          </td>
          <td>{user.email}</td>
          <td>{user.user_brand}</td>
          <td>{user.user_type}</td>
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
    <Table responsive bordered>
      <thead className="thead-light">
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

export default UsersTable;
