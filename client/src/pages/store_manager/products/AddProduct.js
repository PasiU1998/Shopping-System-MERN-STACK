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
            products : [],

            productName : "" ,
            productDescription :"",
            productPrice : "",
            productStockQuantity : "",
            productDiscount : "",
            productColor : "",
            productAvailableSize: "",
            productImg : null,
            categoryId : "",

            addproductName : "" ,
            addproductDescription :"",
            addproductPrice : "",
            addproductStockQuantity : "",
            addproductDiscount : "",
            addproductColor : "",
            addproductAvailableSize: "",
            addproductImg : null


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

        if(e.target.type === "text" || e.target.type === "number" ){
            this.setState({ [e.target.id]: e.target.value });
        }
        else{
            this.setState({ [e.target.id]: e.target.files[0] });
        }

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

        const formData = new FormData();

        formData.append('productName', this.state.addproductName);
        formData.append('productDescription', this.state.addproductDescription);
        formData.append('productPrice', this.state.addproductPrice);
        formData.append('productStockQuantity', this.state.addproductStockQuantity);
        formData.append('productDiscount', this.state.addproductDiscount);
        formData.append('productColor', this.state.addproductColor);
        formData.append('productAvailableSize', this.state.addproductAvailableSize);
        formData.append('productImg', this.state.addproductImg);
        formData.append('category_id', this.state.categoryId);
        formData.append('user_id', this.props.auth.user.id);

        console.log(formData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios
            .post("/api/products/insert", formData , config)
            .then(res => {

                this.setState({
                    addproductName : "" ,
                    addproductDescription :"",
                    addproductPrice : "",
                    addproductStockQuantity : "",
                    addproductDiscount : "",
                    addproductColor : "",
                    addproductAvailableSize: "",
                    addproductImg : null,
                    products: [
                        ...this.state.products,
                        res.data
                    ]

                })

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
                    <Form encType="multipart/form-data" role="form"  >
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
                                       value={this.state.addproductName}
                                       id="addproductName"
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
                                       value={this.state.addproductDescription}
                                       id="addproductDescription"
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
                                           value={this.state.addproductPrice}
                                           id="addproductPrice"
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
                                               value={this.state.addproductStockQuantity}
                                               id="addproductStockQuantity"
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
                                                   value={this.state.addproductDiscount}
                                                   id="addproductDiscount"
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
                                                       value={this.state.addproductColor}
                                                       id="addproductColor"
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
                                                       value={this.state.addproductAvailableSize}
                                                       id="addproductAvailableSize"
                                                       type="text"
                                                />

                                            </InputGroup>
                                            <span className="text-red">{}</span>
                                        </FormGroup>

                        {/*<FormGroup className="mb-3">*/}

                        {/*    <div className="input-group">*/}
                        {/*        <div className="input-group-prepend">*/}
                        {/*            <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>*/}
                        {/*        </div>*/}
                        {/*        <div className="custom-file">*/}
                        {/*            <input type="file" accept="image/*"  name= "file"  className="form-control-file" id="inputGroupFile01"*/}
                        {/*                   aria-describedby="inputGroupFileAddon01"/>*/}
                        {/*                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose*/}
                        {/*                    file</label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*</FormGroup>*/}

                        <FormGroup className="mb-3">
                            <div className="custom-file">
                                <label className="mb-5" htmlFor="productImg">Upload Image</label>
                                <input id="addproductImg" type="file" className="form-control-file" name="file" accept="image/*" files={this.state.addproductImg} onChange= {this.onChange} />

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
