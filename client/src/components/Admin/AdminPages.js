import React from "react";

const infoLabel = props => (
  <p className="lead">
    <b>{props.totalTickets}</b> Tickets | Page {props.currentPage} /{" "}
    {props.totalPages}
  </p>
);

export default infoLabel;
