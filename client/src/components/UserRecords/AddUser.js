import React from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  InputGroupText
} from "reactstrap";

const addUser = props => (
  <form onSubmit={props.submit}>
    <Col>
      <Card>
        <CardHeader>ADD USER</CardHeader>
        <CardBody>
          <Form action="" method="post">
            <FormGroup>
              <InputGroup>
                <Input
                  type="text"
                  id="username2"
                  name="username2"
                  placeholder="Username"
                  autoComplete="name"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-user" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Input
                  type="email"
                  id="email2"
                  name="email2"
                  placeholder="Email"
                  autoComplete="username"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-envelope" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <Input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="fa fa-asterisk" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
            <FormGroup className="form-actions">
              <Button type="submit" size="sm" color="secondary">
                Submit
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </form>
);

export default addUser;
