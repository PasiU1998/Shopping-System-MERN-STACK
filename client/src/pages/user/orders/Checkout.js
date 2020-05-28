import React , {Component} from "react";

import PropTypes from "prop-types";

import axios from "axios";
import {connect} from "react-redux";
import LandingNavbar from "../../../components/Navbar/LandingNavbar";
import Footer from "../../../components/Footer/PublicFooter";
import {logoutUser} from "../../../actions/authActions";
import Button from "reactstrap/es/Button";
import Row from "reactstrap/es/Row";
import Card from "reactstrap/es/Card";
import Col from "reactstrap/es/Col";
import Form from "reactstrap/es/Form";
import FormGroup from "reactstrap/es/FormGroup";
import Input from "reactstrap/es/Input";
import Label from "reactstrap/es/Label";
import {Growl} from 'primereact/growl';
import {updateCart} from "../../../actions/cartActions";

class Checkout extends Component{

    constructor(props) {
        super(props);
        this.state = {
            errors: {
                billing_address: "",
                billing_city: "",
                payment_type: "",
                card_number: "",
            },
            isLoaded: false,
            billing_address: "",
            billing_city: "",
            payment_type: "",
            card_number: "",
            showCCnumber: false,
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    componentWillUnmount() {
    }

    changeCardNumberState = (method) => {
        if (method === "cash"){
            this.setState({
                showCCnumber : false,
                payment_type: "Cash"
            });
        }else{
            this.setState({
                showCCnumber : true,
                payment_type: "Credit Card"
            });
        }
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    createOrder = (e) => {
        e.preventDefault();

        let total = 0;
        this.props.cart.cart.products.map((value, index) => {
            total += value.total;
        });

        const newOrder = {
            total: total,
            status: "Pending",
            user_id: this.props.cart.cart.user_id,
            products: this.props.cart.cart.products,
            payment_type: this.state.payment_type,
            card_number: this.state.card_number,
            billing_address: this.state.billing_address,
            billing_city: this.state.billing_city
        };

        if (this.props.cart.cart.products.length == 0){
            this.growl.show({severity: 'error', summary: 'Oops', detail: 'You have not selected any products.'});
        }else{
            axios
                .post("/api/orders/store", newOrder)
                .then(res => {
                    this.growl.show({severity: 'success', summary: 'Success Message', detail: 'Order placed.'});

                    let updatedCart = {
                        user_id: this.props.cart.cart.user_id,
                        products: []
                    };

                    this.props.updateCart(this.props.cart.cart._id, updatedCart);

                    this.setState({
                        showCCnumber : true,
                        payment_type: "",
                        card_number: "",
                        billing_address: "",
                        billing_city: ""
                    });
                })
                .catch(err =>{
                        this.setState({
                            errors: err.response.data
                        });
                    }
                );
        }
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
                    <Growl ref={(el) => this.growl = el} baseZIndex={9999}/>
                    <Row className="justify-content-center mt-5">
                        <Col md="5">
                            <Card className="py-3 px-5">
                                <h2 className="text-center">Enter your details to confirm order</h2>
                                <Form className="mt-3">

                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>
                                                    Enter your address
                                                </Label>
                                                <Input
                                                    id="billing_address"
                                                    name="billing_address"
                                                    type="text"
                                                    onChange={this.onChange}
                                                />
                                                <small className="text-red">{this.state.errors.billing_address}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>
                                                    Enter your city
                                                </Label>
                                                <Input
                                                    id="billing_city"
                                                    name="billing_city"
                                                    type="text"
                                                    onChange={this.onChange}
                                                />
                                                <small className="text-red">{this.state.errors.billing_city}</small>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="mb-2">
                                        <Col md="12">
                                            <label>Pick your payment method</label><br/>
                                            <div className="form-check form-check-inline mt-1">
                                                <input
                                                    className="form-check-input"
                                                    id="cash"
                                                    name="payment_type"
                                                    type="radio"
                                                    value="Cash"
                                                    onClick={() => this.changeCardNumberState("cash")}
                                                />
                                                <label className="form-check-label" htmlFor="cash">
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    id="credit_card"
                                                    name="payment_type"
                                                    type="radio"
                                                    value="Credit Card"
                                                    onClick={() => this.changeCardNumberState("credit")}
                                                />
                                                <label className="form-check-label" htmlFor="credit_card">
                                                    Credit Card
                                                </label>
                                            </div>
                                            <br/>
                                            <small className="text-red">{this.state.errors.payment_type}</small>
                                        </Col>
                                    </Row>

                                    {
                                        (this.state.showCCnumber) ? (
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label>
                                                            Enter Credit Card Number
                                                        </Label>
                                                        <Input
                                                            id="card_number"
                                                            name="card_number"
                                                            type="number"
                                                            max="9999999999999999"
                                                            onChange={this.onChange}
                                                        />
                                                        <small className="text-red">{this.state.errors.card_number}</small>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        ) : null
                                    }
                                    <div className="text-center">
                                        <Button
                                            className="my-4 btn-outline-dark"
                                            type="button"
                                            onClick={this.createOrder}
                                        >
                                            Confirm Order
                                        </Button>
                                    </div>
                                </Form>
                            </Card>

                        </Col>

                    </Row>
                </div>



                <Footer />
            </>
        )
    }

}

Checkout.propTypes = {
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
)(Checkout);
