import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { toast } from "react-toastify";

import BrandTable from "../../components/BrandRecords/BrandTable";
import BrandPagination from "../../components/BrandRecords/BrandPagination";
import BrandPages from "../../components/BrandRecords/BrandPages";
import AddBrand from "../../components/BrandRecords/AddBrand";
import Spinner from "../../spinner";

import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { getBrands, addBrand } from "../../actions/brandAction";

toast.configure({ autoClose: 3000 });

class BrandRecords extends Component {
  _isMounted = false;

  componentDidMount() {
    this.props.getBrands();
  }

  state = {
    brandName: "",
    currentBrands: [],
    currentPage: null,
    totalPages: null
  };

  handlePageChanged = data => {
    const { brand } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentBrands = brand.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentBrands, totalPages });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  // methods Addbrand.js
  handleChange = e => {
    this.setState({
      ...this.state,
      brandName: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state.brandName);
    this.props.addBrand({ brand_name: this.state.brandName });
  };

  render() {
    console.log(this.state.brandName);

    const { brand } = this.props;

    const { currentPage, totalPages } = this.state;

    const totalBrands = brand.length;

    return brand.loading ? (
      <Spinner />
    ) : (
      <Row>
        <Col xs="12" lg="4">
          <Card>
            <CardHeader>
              <h5>
                <i className="fa fa-list" />
                &nbsp;BRAND RECORDS
              </h5>
            </CardHeader>
            <CardBody>
              <BrandTable currentBrands={brand.brand} />
              {totalBrands > 0 && (
                <Row>
                  <Col md="6">
                    <BrandPages
                      totalBrands={totalBrands}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </Col>
                  <Col md="6">
                    <BrandPagination
                      totalBrands={totalBrands}
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
        <Col md="4">
          <AddBrand
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  brand: state.brand
});

export default connect(
  mapStateToProps,
  { getBrands, addBrand }
)(BrandRecords);
