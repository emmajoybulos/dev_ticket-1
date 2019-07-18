import React from "react";

const BrandPages = props => (
  <p className="lead">
    <b>{props.totalBrands}</b> Brands | Page {props.currentPage} /{" "}
    {props.totalPages}
  </p>
);

export default BrandPages;
