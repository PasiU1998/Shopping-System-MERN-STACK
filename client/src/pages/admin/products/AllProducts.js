import React , {Component} from "react";
import PropTypes from "prop-types";
import Header from "../../../components/Header/Header";
import { logoutUser } from "../../../actions/authActions";


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
import {GET_ERRORS} from "../../../actions/types";
import index from "../../../reducers";
import {connect} from "react-redux";

class AllProducts extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []

        };
        console.log(this.props.auth.user.id)
    }
    componentDidMount() {
        this._isMounted = true;
        axios
            .get("/api/products/allproducts")
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        products: res.data
                    });
                }
                console.log(res);
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


    render(){
        return (
            <>
                <Header/>

                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Product table</h3>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Size</th>
                                        <th scope="col">Discount</th>
                                        <th scope="col">Stock Quantity</th>
                                        <th scope="col">Category</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.products.map((value, index) => {
                                            return (
                                                <tr key={value._id}>
                                                    <th scope="row">
                                                        <Media className="align-items-center">
                                                            <a  className="avatar rounded-circle mr-3" >
                                                                <img
                                                                    alt="..."
                                                                    src = {"http://localhost:5000/uploads/"+value.productImage}
                                                                />
                                                            </a>
                                                            <Media>
                                                                <span className="mb-0 text-sm">
                                                                    {value.productName}
                                                                </span>
                                                            </Media>
                                                        </Media>
                                                    </th>
                                                    <td scope="row">{value.productDescription}</td>
                                                    <td scope="row">{value.productPrice}</td>
                                                    <td scope="row">{value.productColor}</td>
                                                    <td scope="row">{value.productAvailableSize}</td>
                                                    <td scope="row">{value.productDiscount}%</td>
                                                    <td scope="row">{value.productStockQuantity}</td>
                                                    <td scope="row">Category</td>
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

AllProducts.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { logoutUser }
) (AllProducts) ;
