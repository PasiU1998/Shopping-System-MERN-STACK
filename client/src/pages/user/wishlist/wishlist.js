import React, {Component} from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import _findIndex from "lodash.findindex";
import {connect} from 'react-redux';
import {logoutUser} from "../../../actions/authActions";
import LandingNavbar from "../../../components/Navbar/LandingNavbar";
import Footer from "../../../components/Footer/Footer";
import Row from "reactstrap/es/Row";
import Button from "reactstrap/es/Button";
import Card from "reactstrap/es/Card";
import CardTitle from "reactstrap/es/CardTitle";
import CardText from "reactstrap/es/CardText";
import {Link} from "react-router-dom";
import index from "../../../reducers";
import {updateWishList} from "../../../actions/wishlistActions";
import {updateCart} from "../../../actions/cartActions";
import {Growl} from "primereact/growl";

class WishList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            isLoaded: false,
            wishlistItems: [],
            wishlistItemShow: []
        }
    }

    async componentDidMount() {
        if (Object.keys(this.props.wishlist.wishlist).length != 0 && this.props.wishlist.wishlist.constructor === Object) {
            await this.getWishlistItems(this.props.wishlist.wishlist.products);

            this.setState({
                wishlistItemShow: this.props.wishlist.wishlist.products
            });
        }

        if ((Object.keys(this.props.cart.cart).length != 0 && this.props.cart.cart.constructor === Object)) {

            this.setState({
                cartProducts: this.props.cart.cart.products
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.wishlist != this.props.wishlist) {
            this.getWishlistItems(this.props.wishlist.wishlist.products);

            this.setState({
                wishlistItemShow: this.props.wishlist.wishlist.products
            });
        }

        if (prevProps.cart !== this.props.cart) {
            this.setState({
                cartProducts: this.props.cart.cart.products
            });
        }
    }

    getWishlistItems = (products) => {
        console.log(products);
        this.setState({
            wishlistItems: []
        });

        products.map((value, index) => {
            axios
                .get("/api/products/oneProduct/" + value.product_id)
                .then(res => {
                    this.state.wishlistItems.map((value1, index1) => {
                        if (res.data._id == value1._id) {
                            res.data = {};
                        }
                    });

                    this.setState({
                        wishlistItems: [
                            ...this.state.wishlistItems,
                            res.data
                        ]
                    }, () => {
                        console.log(this.state.wishlistItems);
                    });
                })
                .catch(err => {
                    this.setState({
                        isLoaded: true,
                        err
                    });
                });
        })
    };


    deleteItem = (productId) => {
        let Item = this.state.wishlistItems;
        let ProductsIndex = _findIndex(this.state.wishlistItems, {_id: productId});

        let WishItems = this.state.wishlistItemShow;
        let WishItemsIndex = _findIndex(this.state.wishlistItemShow, {product_id: productId});

        Item.splice(ProductsIndex, 1);
        WishItems.splice(WishItemsIndex, 1);

        this.setState({
            wishlistItems: [Item]
        });

        const updatedItems = {
            user_id: this.props.wishlist.wishlist.user_id,
            products: WishItems
        };

        this.props.updateWishList(this.props.wishlist.wishlist._id, updatedItems);
    };


    sendToCart = async (product) => {
        this.deleteItem(product._id);

        let result = await this.state.cartProducts.map(({product_id}) => product_id);

        if (result.includes(product._id)) {
            this.growl.show({severity: 'error', summary: 'Oops', detail: 'This item already exists in cart'});
        } else {
            let total = (product.productPrice - (product.productDiscount / 100) * product.productPrice) * 1;

            const newProduct = {
                product_id: product._id,
                qty: 1,
                price: product.productPrice,
                discount: product.productDiscount,
                total: total
            };

            this.setState({
                cartProducts: [
                    ...this.state.cartProducts,
                    newProduct
                ]
            }, () => {
                const updatedCart = {
                    user_id: this.props.cart.cart.user_id,
                    products: this.state.cartProducts
                };

                this.props.updateCart(this.props.cart.cart._id, updatedCart);

                this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Item added to cart.'});
            });
        }

    };

    emptyWishList = () => {
        const newWishlist = {
            user_id: this.props.wishlist.wishlist.user_id,
            products: []
        };

        this.setState({
            wishlistItemShow: [],
            wishListItems: []
        });

        this.props.updateWishList(this.props.wishlist.wishlist._id, newWishlist);
    };


    render() {
        return (
            <>
                <Growl ref={(el) => this.growl = el} baseZIndex={9999}/>

                <LandingNavbar
                    {...this.props}
                    navBarColor="#fff"
                    navBarFontColor="text-dark"
                />

                <div className="container-fluid mt-5 pt-5" style={{backgroundColor: "#f0f0f0", minHeight: "80vh"}}>
                    <div className="row justify-content-center mt-4">
                        <div className="col-md-8">
                            <div className="card p-3">
                                <table>
                                    <thead>
                                    <tr>
                                        <th rowSpan="1">&nbsp;</th>
                                        <th className="text-uppercase" rowSpan="1">Product Title</th>
                                        <th className="text-uppercase" rowSpan="1">Product Description</th>
                                        <th className="text-uppercase" rowSpan="1">Price</th>
                                        <th rowSpan="1">&nbsp;</th>
                                    </tr>

                                    </thead>
                                    <tbody>
                                    {
                                        (Object.keys(this.props.wishlist.wishlist) != 0 && this.props.wishlist.wishlist.constructor === Object) ?
                                            (this.state.wishlistItems.map((value, index) => {
                                                    const image = 'http://localhost:5000/uploads/'+value.productImage;
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                <img
                                                                    src={image}
                                                                    style={{
                                                                        display: 'inline-block',
                                                                        margin: '2px 0 2px 2px',
                                                                        width: 60
                                                                    }}/>
                                                            </td>

                                                            <td>
                                                                {value.productName}
                                                            </td>

                                                            <td>
                                                                {value.productDescription}
                                                            </td>

                                                            {/*<td>*/}
                                                            {/*    {*/}
                                                            {/*        this.state.wishlistItemShow.map((value1, index1) => {*/}
                                                            {/*            if (value1.product_id == value._id){*/}
                                                            {/*                return (*/}
                                                            {/*                    <div className="col-md-4" key={index1}>*/}
                                                            {/*                        /!*<input size="4" onChange={(e) => this.onQtyChange(e, value1)} className="form-control" name="qty" type="number" value={value1.qty} max={value.productStockQuantity}/>*!/*/}
                                                            {/*                    </div>*/}
                                                            {/*                )*/}
                                                            {/*            }*/}
                                                            {/*        })*/}
                                                            {/*    }*/}
                                                            {/*</td>*/}

                                                            {/*<td>*/}
                                                            {/*    {*/}
                                                            {/*        this.state.wishlistItemShow.map((value2, index2) => {*/}
                                                            {/*            if (value2.product_id == value._id){*/}
                                                            {/*                return (*/}
                                                            {/*                    value2.total*/}
                                                            {/*                )*/}
                                                            {/*            }*/}
                                                            {/*        })*/}
                                                            {/*    }*/}
                                                            {/*</td>*/}

                                                            <td>
                                                                {value.productPrice}
                                                            </td>
                                                            <td>
                                                                <a className="btn" title="Add to cart"
                                                                   onClick={() => this.sendToCart(value)}>
                                                                    <i className="fa fa-shopping-cart text-primary"/>
                                                                </a>

                                                            </td>
                                                            <td>
                                                                <a className="btn" title="Remove Item from cart"
                                                                   onClick={() => this.deleteItem(value._id)}>
                                                                    <i className="fa fa-trash text-danger"/>
                                                                </a>

                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            ) : (
                                                <tr colSpan="6">
                                                    <td colSpan="6" className="text-center mt-4">
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
                                            <Row className="-align-left mx-2">
                                                <Button className="btn btn-outline-dark"
                                                        onClick={() => this.emptyWishList()}>
                                                    Empty Wishlist
                                                </Button>
                                            </Row>
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>


                <Footer/>
            </>

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart,
    wishlist: state.wishlist
});

// export default WishList;

export default connect(mapStateToProps,
    {logoutUser, updateWishList, updateCart})(WishList);

