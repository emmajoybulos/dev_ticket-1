import React from "react";
import {
  Button,
  Input,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Row
} from "reactstrap";

const NewBrandItem = props => {
  console.log(props);
  return (
    <Col>
      <Card>
        <CardHeader>
          <h5>
            <i className="fa fa-user-o" />
            &nbsp; ADD BRAND
          </h5>
        </CardHeader>
        <CardBody>
          <Form onSubmit={props.handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                id="brand_name"
                name="brand_name"
                placeholder="Brand Name"
                autoComplete="name"
                onChange={props.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-actions">
              <Row>
                <Col md="5">
                  <Button block color="primary">
                    <i className="fa fa-save" />
                    &nbsp; SAVE
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default NewBrandItem;
