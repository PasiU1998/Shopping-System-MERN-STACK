import React , {Component} from "react";
import AllProductsClient from "./AllProductsClient";
import {Link, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logoutUser} from "../../../actions/authActions";
import LandingNavbar from "../../../components/Navbar/LandingNavbar";
import axios from "axios";
import _findIndex from "lodash.findindex";
import Footer from "../../../components/Footer/PublicFooter";
import Singleproductcard from "../../../components/product/singleProductCard";
import {Button} from "reactstrap";
import {Growl} from "primereact/growl";
import {updateCart} from "../../../actions/cartActions";
// reactstrap components


class singleProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            product_id: props.match.params.id,
            product: null,
            reviews: [],
            avg_rating: null,
            cartProducts: [],
            review_stars: [1, 2, 3, 4, 5],
            rating: "",
            comment: ""
        };
    }

    componentDidMount() {
        if ((Object.keys(this.props.cart.cart).length != 0 && this.props.cart.cart.constructor === Object)){

            this.setState({
                cartProducts:this.props.cart.cart.products
            });
        }
        this.getProduct(this.state.product_id);
        this.getProductReviews(this.state.product_id);
    }

    getProduct = (id) =>{
        axios
            .get("/api/products/oneProduct/" + id)
            .then(res => {
                this.setState({
                    product : res.data,
                });
            })
            .catch(err =>{
                console.log(err);
            });
    };

    getProductReviews = (id) =>{
        axios
            .get("/api/reviews/products/get/" + id)
            .then(res => {
                this.setState({
                    reviews : res.data,
                }, () => {
                    let tot_rating = 0;

                    res.data.map((value, index) => {
                        tot_rating += value.rating;
                    });

                    let avg_rating = (tot_rating / res.data.length);

                    this.setState({
                        avg_rating : avg_rating,
                    });
                });
            })
            .catch(err =>{
                console.log(err);
            });
    };

    addToCart = (product) =>{

        let result = this.state.cartProducts.map(({ product_id }) => product_id)

        if (result.includes(product._id)){
            this.growl.show({severity: 'error', summary: 'Oops', detail: 'This item already exists in cart'});
        }
        else{
            let total = (product.productPrice - (product.productDiscount/100) * product.productPrice) * 1;

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

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    createReview = (e) => {
        e.preventDefault();

        const newReview = {
            rating: this.state.rating,
            comment: this.state.comment,
            user_id: this.props.cart.cart.user_id,
            product_id: this.state.product_id
        };

        axios
            .post("/api/reviews/store", newReview)
            .then(res => {
                this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Review Placed Successfully.'});

                this.setState({
                    reviews: [
                        ...this.state.reviews,
                        res.data
                    ]
                });
                this.setState({
                    rating: "",
                    comment: ""
                });
            })
            .catch(err =>{
                    this.setState({
                        errors: err.response.data
                    });
                }
            );
    };
    render() {
        return (
            <>
                <Growl ref={(el) => this.growl = el} baseZIndex={9999} />
                <LandingNavbar
                    {...this.props}
                    navBarColor = "#fff"
                    navBarFontColor= "text-dark"
                />
                <div className="container-fluid mt-5 pt-5" style={{backgroundColor:"#f0f0f0", minHeight:"80vh"}}>
                    {
                        (this.state.product && this.state.avg_rating) ? (
                            <div className="row justify-content-center mt-5 pt-5">
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <img src={`http://localhost:5000/uploads/${this.state.product.productImage}`} className="img-fluid" alt="Responsive image" style={{maxWidth: "75%" }}/>
                                        </div>
                                        <div className="col-md-6">

                                            <h1>{this.state.product.productName}</h1>

                                            <div className="reviews">
                                                {
                                                    this.state.review_stars.map((value, index) => {
                                                        return(
                                                            <span key={index} className="fa fa-star" style={{color: (this.state.avg_rating >= value ? 'orange':'')}}></span>
                                                        )
                                                    })
                                                }
                                            </div>

                                            <label className="mt-3">{this.state.product.productDescription}</label>

                                            <h2 className="font-weight-bold mt-5 pt-5">{this.state.product.productPrice}&nbsp;LKR</h2>

                                            {
                                                (this.props.auth.isAuthenticated) ? (
                                                    <Button className="text-center"
                                                            color="primary"
                                                            href=""
                                                            onClick={() => this.addToCart(this.state.product)}
                                                    >
                                                        <i className="fas fa-cart-plus"></i>
                                                        ADD TO CART
                                                    </Button>
                                                ): (
                                                    <Link className="btn btn-primary text-center ml-5"
                                                          color="primary"
                                                          to="/login"
                                                    >
                                                        <i className="fas fa-cart-plus"></i>
                                                        ADD TO CART
                                                    </Link>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ): (
                            null
                        )
                    }

                    {
                        (this.state.reviews && this.state.avg_rating) ? (
                            <div className="row justify-content-center mt-5">
                                <div className="col-md-8">
                                    <h2>Reviews</h2>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            {
                                                this.state.reviews.map((value, index) => {
                                                    return(
                                                        <div key={index} className="card mb-2">
                                                            <div className="reviews px-3 py-3">
                                                                {
                                                                    this.state.review_stars.map((value1, index) => {
                                                                        return(
                                                                            <span key={index} className="fa fa-star" style={{color: (value.rating >= value1 ? 'orange':'')}}></span>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <h3 className="px-3">{value.comment}</h3>
                                                            <span className="px-3">
                                                                <small>
                                                                    on&nbsp;{new Date(value.createdAt).toDateString()}
                                                                </small>
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        {
                                            (this.props.auth.isAuthenticated) ? (
                                                <div className="col-md-6">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <h3>Give Rating</h3>
                                                        </div>
                                                        <div className="card-body">
                                                            <form>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label htmlFor="rating">Rating</label>
                                                                        <select className="form-control" id="rating" onChange={this.onChange}>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className="form-group">
                                                                    <label htmlFor="comment">Comment</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="comment"
                                                                        placeholder="Add Comment..."
                                                                        value={this.state.comment}
                                                                        onChange={this.onChange}
                                                                    />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <Button
                                                                        className="my-4"
                                                                        type="button"
                                                                        onClick={this.createReview}
                                                                    >
                                                                        Add
                                                                    </Button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            ):(
                                                null
                                            )
                                        }

                                    </div>

                                </div>
                            </div>
                        ): (
                            null
                        )
                    }

                </div>

                <Footer />
            </>
        );
    }

}

singleProduct.propTypes = {
    logoutUser: PropTypes.func,
    updateCart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart,
    product: state.product
});

export default connect(
    mapStateToProps,
    { logoutUser, updateCart })
(singleProduct);
