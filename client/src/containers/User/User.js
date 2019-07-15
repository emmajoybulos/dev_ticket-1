import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

import UsersTable from "../../components/UserRecords/UserTable";
import UserPagination from "../../components/UserRecords/UserPagination";
import UserPages from "../../components/UserRecords/UserPages";
import AddUser from "../../components/UserRecords/AddUser";

import "react-toastify/dist/ReactToastify.css";

toast.configure({ autoClose: 3000 });

class UserRecords extends Component {
  _isMounted = false;

  state = {
    user: [],
    currentUsers: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    this._isMounted = true;

    axios
      .get("http://localhost:5000/api/users")
      .then(response => {
        if (this._isMounted) this.setState({ user: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handlePageChanged = data => {
    const { user } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = user.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  };

  handleUnresolvedTickets = () => {};

  render() {
    const { user, currentUsers, currentPage, totalPages } = this.state;

    const totalUsers = user.length;

    return (
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <span>USER RECORDS</span>
            </CardHeader>
            <CardBody>
              <UsersTable currentUsers={currentUsers} />
              {totalUsers > 0 && (
                <Row>
                  <Col md="6">
                    <UserPages
                      totalUsers={totalUsers}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </Col>
                  <Col md="6">
                    <UserPagination
                      totalUsers={totalUsers}
                      pageLimit={10}
                      pageNeighbours={1}
                      handlePageChanged={this.handlePageChanged}
                    />
                  </Col>
                </Row>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col>
          <AddUser />
        </Col>
      </Row>
    );
  }
}

export default UserRecords;
