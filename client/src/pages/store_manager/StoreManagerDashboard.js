import React,{Component} from "react"
import StoreManagerHeader from "../../components/Header/StoreManagerHeader"
import {Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row} from "reactstrap";
import classnames from "classnames";
import {Bar, Line} from "react-chartjs-2";
import {chartExample1, chartExample2, chartOptions, parseOptions} from "../../variables/charts";
import Chart from "chart.js";


const items = {

    src: require("../../assets/img/faces/admin-images-png-3.png"),
    altText: "Somewhere",
    caption: "Somewhere"
};

class StoreManagerDashboard extends Component{

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
        return (
            <>
                <StoreManagerHeader/>
                <Container className="mt--7" fluid>

                    <Row className="mb-4">
                        <Col className="mb-5 mb-xl-0" xl="12">
                            <Card className="bg-gradient-default shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Overview
                                            </h6>
                                            <h2 className="text-white mb-0">Products</h2>
                                        </div>
                                        <div className="col">
                                            <Nav className="justify-content-end" pills>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames("py-2 px-3", {
                                                            active: this.state.activeNav === 1
                                                        })}
                                                        href="#pablo"
                                                        onClick={e => this.toggleNavs(e, 1)}
                                                    >
                                                        <span className="d-none d-md-block">Month</span>
                                                        <span className="d-md-none">M</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={classnames("py-2 px-3", {
                                                            active: this.state.activeNav === 2
                                                        })}
                                                        data-toggle="tab"
                                                        href="#pablo"
                                                        onClick={e => this.toggleNavs(e, 2)}
                                                    >
                                                        <span className="d-none d-md-block">Week</span>
                                                        <span className="d-md-none">W</span>
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {/* Chart */}
                                    <div className="chart">
                                        <Line
                                            data={chartExample1[this.state.chartExample1Data]}
                                            options={chartExample1.options}
                                            getDatasetAtEvent={e => console.log(e)}
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

        )
    }
}

export default StoreManagerDashboard
