import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

import UsersTable from "../../components/UserRecords/UserTable";
import UserPagination from "../../components/UserRecords/UserPagination";
import UserPages from "../../components/UserRecords/UserPages";
import AddUser from "../../components/UserRecords/AddUser";
import Spinner from "../../spinner";

import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { getUsers } from "../../actions/userAction";

toast.configure({ autoClose: 3000 });

class UserRecords extends Component {
  _isMounted = false;

  componentDidMount() {
    this.props.getUsers();
  }

  state = {
    currentUsers: [],
    currentPage: null,
    totalPages: null
  };

  handlePageChanged = data => {
    const { user } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = user.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  };

  render() {
    const { user } = this.props;

    const { currentPage, totalPages } = this.state;

    const totalUsers = user.length;

    return user.loading ? (
      <Spinner />
    ) : (
      <Row>
        <Col md="8">
          <Card>
            <CardHeader>
              <h5>
                <i className="fa fa-list" />
                &nbsp;USER RECORDS
              </h5>
            </CardHeader>
            <CardBody>
              <UsersTable currentUsers={user.user} />
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UserRecords);
