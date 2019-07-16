import React from "react";
import { Table, FormGroup, Row, Col, Button } from "reactstrap";

const UsersTable = props => {
  let { currentUsers } = props;

  let renderUsers = <td colSpan="6">Loading users...</td>;

  let actionButtons = (
    <FormGroup className="form-actions">
      <Row>
        <Col>
          <Button color="primary">
            <i className="fa fa-pencil-square-o" />
            &nbsp; Edit
          </Button>
          &thinsp;
          <Button color="danger">
            <i className="fa fa-trash" />
            &nbsp; Delete
          </Button>
        </Col>
      </Row>
    </FormGroup>
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
          <td>{actionButtons}</td>
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{renderUsers}</tbody>
    </Table>
  );
};

export default UsersTable;
