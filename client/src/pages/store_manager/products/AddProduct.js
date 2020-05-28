import React , {Component} from "react";
import PropTypes from "prop-types";
import Header from "../../../components/Header/Header";
import { logoutUser } from "../../../actions/authActions";

import axios from "axios";
import {GET_ERRORS} from "../../../actions/types";
import index from "../../../reducers";
import {connect} from "react-redux";
import {
    Button,
    Card,
    CardBody,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import StoreManagerHeader from "../../../components/Header/StoreManagerHeader";

class AddProduct extends Component{
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            category: [],

            productName : "" ,
            productDescription :"",
            productPrice : "",
            productStockQuantity : "",
            productDiscount : "",
            productColor : "",
            productAvailableSize: "",
            productImg : "",
            categoryId : ""

        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);

    }

    componentDidMount() {
            this._isMounted = true;
            axios
                .get("/api/categories/getall" )
                .then(res => {
                    if (this._isMounted){
                        this.setState({
                            isLoaded: true,
                            category: res.data
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

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleDropdownChange(e) {
        this.setState({ categoryId: e.target.value });
        console.log(e.target.value)
    }


    componentWillUnmount() {
            this._isMounted = false;
    }

    addNewProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            productName: this.state.productName,
            productDescription: this.state.productDescription,
            productPrice: this.state.productPrice,
            productStockQuantity: this.state.productStockQuantity,
            productDiscount: this.state.productDiscount,
            productColor : this.state.productColor,
            productAvailableSize : this.state.productAvailableSize,
            productImg : this.state.productImg,
            category_id : this.state.categoryId,
            user_id :this.props.auth.user.id
        };

        axios
            .post("/api/products/insert", newProduct)
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
            console.log(newProduct)
    };


render() {
    return (

        <>
            <StoreManagerHeader/>
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow border-0">
                <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                        <h1 className="font-weight-bold">Add New Product</h1>
                    </div>
                    <Form role="form">
                        <FormGroup className="mb-3">
                            <label htmlFor="sel1">Select Category : </label>
                            <select className="form-control" id="sel1"
                                    onChange={this.handleDropdownChange}
                                >
                                {
                                    this.state.category.map((value, index1) =>{
                                      return(
                                          <option value={value._id}> {value.title}</option>
                                      )
                                    })

                                    }
                            </select>
                        </FormGroup>

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

                        <FormGroup className="mb-3">
                            <div className="custom-file">
                                <input type="file"
                                       className="custom-file-input"
                                       id="productImg"
                                       onChange={this.onChange}
                                       value={this.state.productImg}/>
                                    <label className="custom-file-label" htmlFor="customFile">Upload Image</label>
                            </div>
                         </FormGroup>


                        <div className="text-center">
                            <Button
                                className="my-4"
                                color="primary"
                                type="button"
                                data-dismiss="modal"
                                onClick={this.addNewProduct}
                            >
                                Add Product
                            </Button>
                        </div>
                    </Form>
                </CardBody>
              </Card>
            </Container>
        </>
    )
}

}

AddProduct.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
) (AddProduct) ;
