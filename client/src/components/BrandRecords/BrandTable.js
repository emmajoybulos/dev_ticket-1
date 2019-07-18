import React from "react";
import { Table, FormGroup, Row, Col, Button } from "reactstrap";

const BrandTable = props => {
  let { currentBrands } = props;

  let renderBrands = <td colSpan="6">Loading users...</td>;

  let actionButtons = (
    <FormGroup className="form-actions">
      <Row>
        <Col>
          <center>
            <Button color="primary">
              <i className="fa fa-pencil-square-o" />
              &nbsp; Edit
            </Button>
            &thinsp;
            <Button color="danger">
              <i className="fa fa-trash" />
              &nbsp; Delete
            </Button>
          </center>
        </Col>
      </Row>
    </FormGroup>
  );

  if (currentBrands) {
    if (currentBrands.length > 0) {
      renderBrands = currentBrands.map(brand => (
        <tr key={brand._id}>
          <td>{brand.brand_name}</td>
          <td>{actionButtons}</td>
        </tr>
      ));
    } else {
      renderBrands = (
        <tr align="center">
          <td colSpan="6">No data to display</td>
        </tr>
      );
    }
  }

  return (
    <Table responsive bordered>
      <thead className="thead-light">
        <tr className="center">
          <th>Brand Name</th>
          <td>
            <center>Actions</center>
          </td>
        </tr>
      </thead>
      <tbody>{renderBrands}</tbody>
    </Table>
  );
};

export default BrandTable;
