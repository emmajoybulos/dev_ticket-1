import React from "react";

const UserPages = props => (
  <p className="lead">
    <b>{props.totalUsers}</b> Users | Page {props.currentPage} /{" "}
    {props.totalPages}
  </p>
);

export default UserPages;
