import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {chartExample1, chartExample2, chartOptions, parseOptions} from "../../variables/charts";
import Chart from "chart.js";
import StoreManagerHeader from "../../components/Header/StoreManagerHeader";
import {Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row} from "reactstrap";
import classnames from "classnames";
import {Bar, Line} from "react-chartjs-2";
import UserHeader from "../../components/Header/UserHeader";
import UserAreaHeader from "../../components/Header/UserAreaHeader";




class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
          this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };



  render() {

    const { user } = this.props.auth;

    return (
        <>

          <UserAreaHeader/>
          <Container className="mt--7" fluid>

            <Row className="mb-4">

              <Col xl="12">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Performance
                        </h6>
                        <h2 className="mb-0">Total orders</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Bar
                          data={chartExample2.data}
                          options={chartExample2.options}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>


            {/*<Row>*/}
            {/*    <Col className="mb-5 mb-xl-0" xl="12">*/}
            {/*        <Card className="bg-gradient-default shadow">*/}
            {/*            <CardBody>*/}
            {/*                <h4 className="text-center text-white">Welcome to Admin Dashboard</h4>*/}
            {/*                <h5 className="text-center text-white">Welcome to Admin Dashboard.Now you can view all details about orders,catagories,users,store managers and products</h5>*/}
            {/*                <img src={items.src} alt="hello"  className="img-center mt-5 mb-3"/>*/}

            {/*            </CardBody>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
          </Container>
        </>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
