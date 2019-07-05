import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";

import AddUser from "../../components/Admin/AddUser";
import AdminPages from "../../components/Admin/AdminPages";
import AdminPagination from "../../components/Admin/AdminPagination";
import AdminTable from "../../components/Admin/AdminTable";

import "react-toastify/dist/ReactToastify.css";

toast.configure({ autoClose: 3000 });

class UserRecords extends Component {
  _isMounted = false;

  state = {
    users: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    this._isMounted = true;

    axios
      .get("/users")
      .then(response => {
        if (this._isMounted) this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = event => {
    this.setState({ users_id: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/users", {
        users_id: this.state.users_id
      })
      .then(() => {
        this.setState({ user_id: "" });
        toast.success("User has been saved!");

        axios.get("/users").then(response => {
          this.setState({ users: response.data });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handlePageChanged = data => {
    const { users } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentUsers = users.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentUsers, totalPages });
  };

  render() {
    const { users, currentUsers, currentPage, totalPages } = this.state;

    return (
      <Card>
        <CardHeader>
          <span>Users Records</span>
          <div className="card-header-actions">
            <AddUser
              change={this.handleChange}
              value={this.state.user_id}
              submit={this.handleSubmit}
            />
          </div>
        </CardHeader>
        <CardBody>
          <AdminTable currentUsers={currentUsers} />
        </CardBody>
      </Card>
    );
  }
}

export default UserRecords;
