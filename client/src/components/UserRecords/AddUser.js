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

const addUser = props => (
  <form onSubmit={props.submit}>
    <Col>
      <Card>
        <CardHeader>
          <h5>
            <i className="fa fa-user-o" />
            &nbsp; ADD USER
          </h5>
        </CardHeader>
        <CardBody>
          <Form action="" method="post">
            <FormGroup>
              <Input
                type="text"
                id="firstanme"
                name="firstname"
                placeholder="First Name"
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                autoComplete="Email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </FormGroup>
            <FormGroup>
              <Input type="select" name="select" id="select">
                <option value="0">Position</option>
                <option value="1">Option #1</option>
                <option value="2">Option #2</option>
                <option value="3">Option #3</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="select" name="select" id="select">
                <option value="0">Brand</option>
                <option value="1">Option #1</option>
                <option value="2">Option #2</option>
                <option value="3">Option #3</option>
              </Input>
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
  </form>
);

export default addUser;
