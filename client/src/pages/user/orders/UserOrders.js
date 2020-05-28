import React , {Component} from "react";

import PropTypes from "prop-types";

import UserAreaHeader from "../../../components/Header/UserAreaHeader";

import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip
} from "reactstrap";
import axios from "axios";
import {connect} from "react-redux";
import _findIndex from "lodash.findindex";
import Button from "reactstrap/es/Button";

class UserOrders extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: []
        };
    }

    componentDidMount() {
        this._isMounted = true;
        axios
            .get("/api/orders/user/get/"+this.props.auth.user.id)
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        orders: res.data
                    });
                }
            })
            .catch(err =>{
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    changeStatus = (order) => {
        const updatedOrder = {
            total:order.total,
            status:"Complete",
            payment_type:order.payment_type,
            user_id:order.user_id,
            products: order.products,
            billing_address:order.billing_address,
            billing_city: order.billing_city
        };

        axios
            .put("/api/orders/update/" + order._id, updatedOrder)
            .then(res => {
                let orders = this.state.orders;
                let orderIndex = _findIndex(this.state.orders, {_id : order._id});

                orders.splice(orderIndex, 1);
                this.setState({
                    orders : orders,
                });

                this.setState({
                    orders: [
                        ...this.state.orders,
                        res.data
                    ]
                });
            })
            .catch(err =>{
                console.log(err);
            });
    };

    render() {
        return (
            <>
                <UserAreaHeader/>

                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Orders table</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Billing Address</th>
                                        <th scope="col">Billing City</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Payment Type</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.orders.map((value, index) => {
                                                return (
                                                    <tr key={value._id}>
                                                        <td scope="row">{index+1}</td>
                                                        <td scope="row">{value.billing_address}</td>
                                                        <td scope="row">{value.billing_city}</td>
                                                        <td scope="row">{value.total}</td>
                                                        <td scope="row">{value.payment_type}</td>
                                                        <td scope="row">
                                                            {
                                                                (value.status == "Complete") ? (
                                                                    (
                                                                        <Badge className="badge-success">{value.status}</Badge>
                                                                    )
                                                                ) : null
                                                            }
                                                            {
                                                                (value.status == "Pending") ? (
                                                                    (
                                                                        <Badge className="badge-warning">{value.status}</Badge>
                                                                    )
                                                                ) : null
                                                            }
                                                            {
                                                                (value.status == "Not Received") ? (
                                                                    (
                                                                        <Badge className="badge-danger">{value.status}</Badge>
                                                                    )
                                                                ) : null
                                                            }
                                                        </td>
                                                        <td scope="row">
                                                            {
                                                                (value.status != "Complete") ? (
                                                                    (
                                                                        <Button className="btn btn-sm btn-success" onClick={() => this.changeStatus(value)} title="Confirm Order Received">
                                                                            <i className="fa fa-check-circle" />&nbsp;
                                                                        </Button>
                                                                    )
                                                                ):null
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        )
    }

}

UserOrders.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(UserOrders);
