import React , {Component} from "react";
import _findIndex from "lodash.findindex";

import Header from "../../../components/Header/Header";

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
    UncontrolledTooltip, Button, Modal
} from "reactstrap";
import axios from "axios";
import {GET_ERRORS} from "../../../actions/types";
import index from "../../../reducers";

class AllOrders extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
            user_name: [],
            defaultModal: false,
            order_id: null
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadOrders();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleModal = (state, order_id) => {
        this.setState({
            [state]: !this.state[state],
            order_id: order_id
        });
    };

    loadOrders = () => {
        axios
            .get("/api/orders/all")
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        orders: res.data
                    });
                    this.loadUserName(res.data);
                }
            })
            .catch(err =>{
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    };

    deleteOrder = (id) =>{
        axios
            .delete("/api/orders/delete/" + id)
            .then(res => {
                let orders = this.state.orders;
                let orderIndex = _findIndex(this.state.orders, {_id : id});

                orders.splice(orderIndex, 1);
                this.setState({
                    orders : orders,
                });
                this.toggleModal("notificationModal", null);
            })
            .catch(err =>{
                console.log(err);
            });
    };

    changeStatus = (order) => {
        const updatedOrder = {
            total:order.total,
            status:"Complete",
            payment_type:order.payment_type,
            user_id:order.user_id,
            products: order.products,
            billing_address:order.billing_address,
            billing_city: order.billing_city
        }

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

    loadUserName = (orders) => {

        orders.map((value, index) =>{
            axios
                .get("/api/users/getUser/" + value.user_id)
                .then(res => {
                    if (this._isMounted){
                        const UserName = {
                            order_id: value._id,
                            name: res.data.name
                        };
                        this.setState({
                            isLoaded: true,
                            user_name: [
                                ...this.state.user_name,
                                UserName
                            ]
                        });
                    }
                })
                .catch(err =>{
                    this.setState({
                        isLoaded: true,
                        err
                    });
                });
        });
    };

    render() {
        return (
            <>
                <Header/>

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
                                        <th scope="col">Customer Name </th>
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
                                                        <td scope="row">
                                                            {
                                                                this.state.user_name.map((value1, index1) => {
                                                                    if (value1.order_id == value._id){
                                                                        return(
                                                                            value1.name
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </td>
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
                                                            <UncontrolledDropdown>
                                                                <DropdownToggle
                                                                    className="btn-icon-only text-light"
                                                                    href="#"
                                                                    role="button"
                                                                    size="sm"
                                                                    color=""
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    <i className="fas fa-ellipsis-v" />
                                                                </DropdownToggle>

                                                                <DropdownMenu className="dropdown-menu-arrow" right>
                                                                    <DropdownItem onClick={() => this.toggleModal("notificationModal", value._id)}>
                                                                            <i className="fa fa-trash text-danger" />&nbsp;Delete Order

                                                                    </DropdownItem>
                                                                    {
                                                                        (value.status != "Complete") ? (
                                                                            (
                                                                                <DropdownItem onClick={() => this.changeStatus(value)}>
                                                                                <i className="fa fa-edit text-primary" />&nbsp;
                                                                                Mark Order as complete

                                                                                </DropdownItem>
                                                                            )
                                                                        ):null
                                                                    }

                                                                </DropdownMenu>
                                                        </UncontrolledDropdown>
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

                {/*delete Modal*/}
                <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={this.state.notificationModal}
                    toggle={() => this.toggleModal("notificationModal", null)}
                >
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal", null)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className="ni ni-bell-55 ni-3x" />
                            <h4 className="heading mt-4">Delete Order</h4>
                            <p>
                                You are about to delete this order.
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="btn-white"
                            color="default"
                            type="button"
                            onClick={() => this.deleteOrder(this.state.order_id)}

                        >
                            Confirm
                        </Button>
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal", null)}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>


            </>
        )
    }

}

export default AllOrders;
