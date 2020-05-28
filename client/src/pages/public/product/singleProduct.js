import React , {Component} from "react";
import AllProductsClient from "./AllProductsClient";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logoutUser} from "../../../actions/authActions";
// reactstrap components


class singleProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []

        };
        this.state.products = props.products
        console.log(props.products)

    }

    render() {
        return (
            <>

                <div className="container-fluid mt-5 pt-5" style={{backgroundColor:"#f0f0f0", minHeight:"80vh"}}>

                    <div className="container-fluid" style={{backgroundColor : "white"}}>
                        <div className="row">
                            <div className="col-md">
                                <img src={"http://localhost:5000/uploads/productImg-1590326479693.jpg"} className="img-fluid" alt="Responsive image" style={{maxWidth: "75%", height: "50%" }}/>
                            </div>
                            <div className="col-sm">

                                <h1>Product Name</h1>
                                <di className="row">
                                 <div className="col-md">
                                    <label>pppppppppppppppppp</label>
                                 </div>

                                    <div className="col-md-6">
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star checked"></span>
                                        <span className="fa fa-star"></span>
                                        <span className="fa fa-star"></span>
                                    </div>

                                </di>

                                <h2 className="font-weight-bold">1250 LKR</h2>
                            </div>

                        </div>
                    </div>
                </div>


            </>
        );
    }

}

singleProduct.propTypes = {
    logoutUser: PropTypes.func,
    auth: PropTypes.object.isRequired,
    cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { logoutUser })
(singleProduct);
