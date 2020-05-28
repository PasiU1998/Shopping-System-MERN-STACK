import React , {Component} from "react";

import PropTypes from "prop-types";

import axios from "axios";
import {connect} from "react-redux";
import LandingNavbar from "../../../components/Navbar/LandingNavbar";
import Footer from "../../../components/Footer/PublicFooter";
import {logoutUser} from "../../../actions/authActions";
import {updateCart} from "../../../actions/cartActions";
import _findIndex from "lodash.findindex";
import Button from "reactstrap/es/Button";
import Row from "reactstrap/es/Row";
import Card from "reactstrap/es/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardText from "reactstrap/es/CardText";
import {Link} from "react-router-dom";

class UserCart extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            cartProducts: [],
            cartProductsShow:[],
            tempProducts: [],
            subTotal: 0,
            productTotal: 0
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted){
            if ((Object.keys(this.props.cart.cart).length != 0 && this.props.cart.cart.constructor === Object)){
                this.getProductsInCart(this.props.cart.cart.products);

                this.setState({
                    cartProductsShow:this.props.cart.cart.products
                }, () => {
                    this.calculateSubTotal();
                });

                this.setState({
                    productTotal:this.props.cart.cart.products.length
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this._isMounted){
            if (prevProps.cart !== this.props.cart){
                this.getProductsInCart(this.props.cart.cart.products);

                this.setState({
                    cartProductsShow:this.props.cart.cart.products
                }, () => {
                    this.calculateSubTotal();
                });

                this.setState({
                    productTotal:this.props.cart.cart.products.length
                });
            }
        }
    }

    getProductsInCart = (products) => {
        this.setState({
            cartProducts: []
        });

        products.map((value, index) =>{
            axios
                .get("/api/products/oneProduct/" + value.product_id)
                .then(res => {
                    this.state.cartProducts.map((value1, index1) => {
                        if (res.data._id == value1._id){
                            res.data = {};
                        }
                    });

                    this.setState({
                        cartProducts: [
                            ...this.state.cartProducts,
                            res.data
                        ]
                    });
                })
                .catch(err =>{
                    this.setState({
                        isLoaded: true,
                        err
                    });
                });
        });
    };

    onQtyChange = (event, product) => {

        let total = (product.price - (product.discount/100) * product.price) * event.target.value;

        const newCartProduct = {
            product_id: product.product_id,
            qty: event.target.value,
            price: product.price,
            discount: product.discount,
            total: total,
            _id: product._id
        };

        let cartProductNew = this.state.cartProductsShow;
        let cartProductNewIndex = _findIndex(this.state.cartProductsShow, {product_id : product.product_id});

        cartProductNew.splice(cartProductNewIndex, 1);

        this.setState({
            cartProductsShow: [
                cartProductNew
            ]
        });

        this.setState({
            cartProductsShow: [
                ...this.state.cartProductsShow,
                newCartProduct
            ]
        });
    };

    updateCart = () =>{
        const updatedCart = {
            user_id: this.props.cart.cart.user_id,
            products: this.state.cartProductsShow
        };

        this.setState({
            cartProductsShow: [],
            cartProducts: []
        });

        this.props.updateCart(this.props.cart.cart._id, updatedCart);
    };

    RemoveAllCartItems = () =>{
        const updatedCart = {
            user_id: this.props.cart.cart.user_id,
            products: []
        };

        this.setState({
            cartProductsShow: [],
            cartProducts: []
        });

        this.props.updateCart(this.props.cart.cart._id, updatedCart);
    };

    RemoveSingleItems= (id) =>{
        let Product = this.state.cartProducts;
        let ProductsIndex = _findIndex(this.state.cartProducts, {_id : id});

        let CartProducts = this.state.cartProductsShow;
        let CartProductsIndex = _findIndex(this.state.cartProductsShow, {product_id : id});

        Product.splice(ProductsIndex, 1);
        CartProducts.splice(CartProductsIndex, 1);

        this.setState({
            cartProducts: [Product]
        });

        const updatedCart = {
            user_id: this.props.cart.cart.user_id,
            products: CartProducts
        };

        this.props.updateCart(this.props.cart.cart._id, updatedCart);
    };

    calculateSubTotal= () =>{
        let subtotal = 0;

        this.state.cartProductsShow.map((value, index) => {
            subtotal += value.total;
        });


        this.setState({
            subTotal:subtotal
        });
    };

    render() {
        return (
            <>
                <LandingNavbar
                    {...this.props}
                    navBarColor = "#fff"
                    navBarFontColor= "text-dark"
                />

                <div className="container-fluid mt-5 pt-5" style={{backgroundColor:"#f0f0f0", minHeight:"80vh"}}>
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-8">
                            <div className="card p-3">
                                <table>
                                    <thead>
                                        <tr>
                                            <th rowSpan="1">&nbsp;</th>
                                            <th className="text-uppercase" rowSpan="1">Product Name</th>
                                            <th className="text-uppercase" rowSpan="1">Unit Price</th>
                                            <th className="text-uppercase" rowSpan="1">Qty</th>
                                            <th className="text-uppercase" rowSpan="1">Total</th>
                                            <th rowSpan="1">&nbsp;</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                    {
                                        (Object.keys(this.props.cart.cart).length != 0 && this.props.cart.cart.constructor === Object) ? (

                                            this.state.cartProducts.map((value, index) => {
                                                const image = 'http://localhost:5000/uploads/'+value.productImage;
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <img src={image} style={{ display: 'inline-block', margin: '2px 0 2px 2px',width:60 }} />
                                                        </td>

                                                        <td>
                                                            {value.productName}
                                                        </td>

                                                        <td>
                                                            {value.productPrice}
                                                        </td>

                                                        <td>
                                                            {
                                                                this.state.cartProductsShow.map((value1, index1) => {
                                                                    if (value1.product_id == value._id){
                                                                        return (
                                                                            <div className="col-md-4" key={index1}>
                                                                                    <input size="4" onChange={(e) => this.onQtyChange(e, value1)} className="form-control" name="qty" type="number"  value={value1.qty} max={value.productStockQuantity}/>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                this.state.cartProductsShow.map((value2, index2) => {
                                                                    if (value2.product_id == value._id){
                                                                        return (
                                                                            value2.total.toFixed(2)
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </td>
                                                        <td>
                                                            <a className="btn" title="Remove Item from cart" onClick={() => this.RemoveSingleItems(value._id)}>
                                                                <i className="fa fa-trash text-danger" />
                                                            </a>

                                                        </td>
                                                    </tr>
                                                )
                                            })

                                        ) : (
                                            <tr colSpan="6">
                                                <td  colSpan="6" className="text-center mt-4">
                                                    <label>You have no items in your cart</label>
                                                </td>
                                            </tr>

                                        )

                                    }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="50">
                                                <hr/>
                                                <Row className="justify-content-between mx-2">
                                                    <Button className="btn btn-outline-dark" onClick={() => this.RemoveAllCartItems()}>
                                                        Clear Cart
                                                    </Button>
                                                    <Button className="btn btn-outline-dark" onClick={() => this.updateCart()}>
                                                        Update Cart
                                                    </Button>
                                                </Row>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-4">
                        <div className="col-md-8">
                            <div className="row justify-content-end">
                                <div className="col-md-6">
                                    <Card className="p-4">
                                        <CardTitle className="text-center">
                                            <h2>Summary</h2>
                                        </CardTitle>
                                        <CardText>
                                            <label>Total Products: {this.state.productTotal}</label>
                                            <br/>
                                            <label>Grand Total: {this.state.subTotal}</label>
                                        </CardText>

                                        <Link className="btn btn-outline-dark text-uppercase text-center mx-5" to="/checkout">
                                            Checkout now
                                        </Link>


                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <Footer />
            </>
        )
    }

}

UserCart.propTypes = {
    logoutUser: PropTypes.func,
    updateCart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
});

export default connect(mapStateToProps,
    { logoutUser, updateCart }
)(UserCart);
