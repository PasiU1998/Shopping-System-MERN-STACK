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
    UncontrolledTooltip, Modal, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button
} from "reactstrap";
import axios from "axios";
import {GET_ERRORS} from "../../../actions/types";
import index from "../../../reducers";
import {connect} from "react-redux";
import _findIndex from "lodash.findindex";
import StoreManagerHeader from "../../../components/Header/StoreManagerHeader";

class ProductAll extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: [],
            category: [],

            product_id : "",
            productName : "" ,
            productDescription :"",
            productPrice : "",
            productStockQuantity : "",
            productDiscount : "",
            productColor : "",
            productAvailableSize: "",
            categoryId : "",
            productImg : null

        };
        console.log(this.props.auth.user.id)
    }
    componentDidMount() {
        this._isMounted = true;
        axios
            .get("/api/products/productManager/" + this.props.auth.user.id)
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        products: res.data
                    });
                }
                console.log(res.data);
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

    toggleModal = (state,product) => {
        this.setState({
            [state]: !this.state[state],
            product_id : product ? product._id : "",
            productName : product ? product.productName : "",
            productDescription: product ? product.productDescription:"",
            productPrice: product ? product.productPrice : "",
            productStockQuantity: product ? product.productStockQuantity : "",
            productDiscount : product ? product.productDiscount: "",
            productColor : product ? product.productColor: "",
            productAvailableSize : product ? product.productAvailableSize : "",
            categoryId : product ? product.category_id : "",
            productImg : product ? product.productImg : ""

        });
    };

    onChange = e => {
        if(e.target.type === "text" || e.target.type === "number" ){
            this.setState({ [e.target.id]: e.target.value });
        }
        else{
            this.setState({ [e.target.id]: e.target.files[0] });
        }
    };

    editProduct = (id) => {

        const formData = new FormData();

        formData.append('productName', this.state.productName);
        formData.append('productDescription', this.state.productDescription);
        formData.append('productPrice', this.state.productPrice);
        formData.append('productStockQuantity', this.state.productStockQuantity);
        formData.append('productDiscount', this.state.productDiscount);
        formData.append('productColor', this.state.productColor);
        formData.append('productAvailableSize', this.state.productAvailableSize);
        formData.append('productImg', this.state.productImg);
        formData.append('category_id', this.state.categoryId);
        formData.append('user_id', this.props.auth.user.id);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(this.props.auth.user.id)
        console.log(id)
        axios
            .put("/api/products/update/" + id , formData, config )
            .then(res => {

                this.setState({
                    products: [
                        ...this.state.products,
                        res.data
                    ]
                });
                console.log(res.data)

            })
            .catch(err =>{
                    console.log(err.response.data);
                    this.setState({
                        errors1: err.response.data
                    });
                    console.log(this.state.errors1)
                }
            );

    };

    deleteproduct = (id) =>{
        axios
            .delete("/api/products/delete/" + id)
            .then(res => {
                let products = this.state.products;
                let productIndex = _findIndex(this.state.products, {id : id});

                products.splice(productIndex, 1);
                this.setState({
                    products : products,
                });
                this.toggleModal("notificationModal", null)
            })
            .catch(err =>{
                console.log(err);
            });
    };


    render(){

        let src = "http://localhost:3000/uploads/"
         return (
            <>
                <StoreManagerHeader/>

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
                                                                    src ={ src + value.productImage }
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
                                                    <td scope="row">{value.category_id}</td>
                                                    <td className="text-right">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#pablo"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem onClick={() => this.toggleModal("updateProduct", value)}>
                                                                    <i className="fa fa-edit text-primary" />&nbsp;Update Produt

                                                                </DropdownItem>

                                                                <DropdownItem onClick={() => this.toggleModal("notificationModal", value)}>
                                                                    <i className="fa fa-trash text-danger" />&nbsp;Delete Product

                                                                </DropdownItem>
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

                {/*Update Model*/}
                <Modal
                    className="modal-dialog-centered"
                    size="sm"
                    isOpen={this.state.updateProduct}
                    toggle={() => this.toggleModal("updateProduct",null)}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">
                            <CardBody className="px-lg-3 py-lg-3">
                                <div className="text-center text-muted mb-4">
                                    <h3 className="font-weight-bold">Update Product ({this.state.productName})</h3>
                                </div>
                                <Form role="form"  encType="multipart/form-data">

                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-tshirt"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Product Name"
                                                   onChange={this.onChange}
                                                   value={this.state.productName}
                                                   id="productName"
                                                   type="text"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{}</span>

                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-edit"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Description of Product"
                                                   onChange={this.onChange}
                                                   value={this.state.productDescription}
                                                   id="productDescription"
                                                   type="text"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{}</span>
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-dollar-sign"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Unit Price"
                                                   onChange={this.onChange}
                                                   value={this.state.productPrice}
                                                   id="productPrice"
                                                   type="number"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{}</span>
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-layer-group"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Stock Quantity"
                                                   onChange={this.onChange}
                                                   value={this.state.productStockQuantity}
                                                   id="productStockQuantity"
                                                   type="number"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{}</span>
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-percent"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Discount"
                                                   onChange={this.onChange}
                                                   value={this.state.productDiscount}
                                                   id="productDiscount"
                                                   type="number"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{}</span>
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-palette"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Available Colors"
                                                   onChange={this.onChange}
                                                   value={this.state.productColor}
                                                   id="productColor"
                                                   type="text"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{}</span>
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="fas fa-sitemap"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Available SIZE"
                                                   onChange={this.onChange}
                                                   value={this.state.productAvailableSize}
                                                   id="productAvailableSize"
                                                   type="text"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{}</span>
                                    </FormGroup>

                                    {/*<FormGroup className="mb-3">*/}
                                    {/*    <div className="custom-file">*/}
                                    {/*        <input type="file"*/}
                                    {/*               className="custom-file-input"*/}
                                    {/*               id="productImg"*/}
                                    {/*               onChange={this.onChange}*/}
                                    {/*               value={this.state.productImage}/>*/}
                                    {/*        <label className="custom-file-label" htmlFor="customFile">Upload Image</label>*/}
                                    {/*    </div>*/}
                                    {/*</FormGroup>*/}

                                    <FormGroup className="mb-3">
                                        <div className="custom-file">
                                            <label className="mb-5" htmlFor="productImg">Upload Image</label>
                                            <input id="productImg" type="file" className="form-control-file" name="file" accept="image/*" files={this.state.productImg} onChange= {this.onChange} />

                                        </div>
                                    </FormGroup>


                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="button"
                                            data-dismiss="modal"
                                            onClick={(e) => this.editProduct(this.state.product_id)}
                                        >
                                            Update Product
                                        </Button>
                                        <Button
                                            className="text-white ml-auto"
                                            color="danger"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() => this.toggleModal("updateProduct", null)}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>


                {/*delete modal*/}
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
                            <h4 className="heading mt-4">Delete Product</h4>
                            <p>
                                You are about to delete this Product.
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="btn-white"
                            color="default"
                            type="button"
                            onClick={() => this.deleteproduct(this.state.product_id)}

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

ProductAll.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
) (ProductAll) ;
