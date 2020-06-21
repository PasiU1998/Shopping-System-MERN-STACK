import React , {Component} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
} from "reactstrap";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../../actions/authActions";
import LandingCarousel from "../../../components/Carousel/LandingCarousel";

import AboutUsBackground from '../../../assets/img/slider/slider4.jpeg';
import classnames from "classnames";
import CardImg from "reactstrap/es/CardImg";
import CardText from "reactstrap/es/CardText";
import {Link} from "react-router-dom";

const about_us_bg ={
    background:`url(${AboutUsBackground}) no-repeat`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
};

class Landing extends Component{

    render() {
        return (
            <>
                <LandingCarousel/>

                <div className="section product-carousel px-5 pt-5 pb-2 text-center" style={{backgroundColor:"#f0f0f0"}}>
                    <h1 className="title text-uppercase" style={{fontSize:"3rem", fontWeight: "1"}}>Featured Products</h1>
                    <div className="row">
                        <div className="col-md-4 py-5">
                            <Card className="p-5">
                                <CardImg
                                    alt="..."
                                    src= {require("../../../assets/uploads/productImg-1589998617467.jpg")}
                                    top
                                    height="100%"
                                />
                                <CardBody>
                                    <Link classname="btn btn-primary" to="/product/all">
                                        Check out our products here
                                    </Link>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4 py-5">
                            <Card className="p-5">
                                <CardImg
                                    alt="..."
                                    src= {require("../../../assets/uploads/productImg-1589998848046.jpg")}
                                    top
                                    height="100%"
                                />
                                <CardBody>
                                    <Link classname="btn btn-primary" to="/product/all">
                                        Check out our products here
                                    </Link>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4 py-5">
                            <Card className="p-5">
                                <CardImg
                                    alt="..."
                                    src={require("../../../assets/uploads/productImg-1589999698057.jpg")}
                                    top
                                    height="100%"
                                />
                                <CardBody>
                                    <Link classname="btn btn-primary" to="/product/all">
                                        Check out our products here
                                    </Link>
                                </CardBody>
                            </Card>
                        </div>
                        {/*<div className="col-md-4 py-5">*/}
                        {/*    <div className="card p-5">*/}

                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    <hr/>
                </div>


                <div className="section testimonial text-center px-5 pb-2" style={{backgroundColor:"#f0f0f0"}}>
                    <Container>
                        <h1 className="title pb-5 text-uppercase" style={{fontSize:"3rem", fontWeight: "1"}}>Testimonials</h1>
                        <Row>
                            <Col md="4">
                                <Card className="card-profile card-plain">
                                    <div className="card-avatar">
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                src={require("../../../assets/img/faces/clem-onojeghuo-3.jpg")}
                                                style={{width:"100%"}}
                                            />
                                        </a>
                                    </div>
                                    <CardBody>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <div className="author">
                                                <CardTitle tag="h4">Henry Ford</CardTitle>
                                            </div>
                                        </a>
                                        <p className="card-description text-center">
                                            Great site to buy products. Great site to buy products,
                                            Great site to buy products. Great site to buy products,
                                            Great site to buy products, Great site to buy products.
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="4">
                                <Card className="card-profile card-plain">
                                    <div className="card-avatar">
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                src={require("../../../assets/img/faces/joe-gardner-2.jpg")}
                                                style={{width:"100%"}}
                                            />
                                        </a>
                                    </div>
                                    <CardBody>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <div className="author">
                                                <CardTitle tag="h4">Sophie West</CardTitle>
                                            </div>
                                        </a>
                                        <p className="card-description text-center">
                                            Great site to buy products. Great site to buy products,
                                            Great site to buy products. Great site to buy products,
                                            Great site to buy products, Great site to buy products.
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="4">
                                <Card className="card-profile card-plain">
                                    <div className="card-avatar">
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <img
                                                alt="..."
                                                src={require("../../../assets/img/faces/erik-lucatero-2.jpg")}
                                                style={{width:"100%"}}
                                            />
                                        </a>
                                    </div>
                                    <CardBody>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            <div className="author">
                                                <CardTitle tag="h4">Robert Orben</CardTitle>
                                            </div>
                                        </a>
                                        <p className="card-description text-center">
                                            Great site to buy products. Great site to buy products,
                                            Great site to buy products. Great site to buy products,
                                            Great site to buy products, Great site to buy products.
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                </div>

                <div className={classnames("section about-us text-white pt-5 px-5 pb-5")} style={about_us_bg}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Card className="px-0" style={{background: 'linear-gradient(rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.58))'}}>
                                    <CardBody>
                                        <h1 className="title pb-3 text-uppercase  text-center text-white" style={{fontSize:"3rem", fontWeight: "1"}}>ABOUT US</h1>
                                        <Row className="justify-content-center">
                                            <Col md="8">
                                                Fastest Magento 2 store has seen some remarkable accomplishments over the past 30 years.
                                                With a goal to become an $8 billion company by 2017. Fastest Magento 2 store has seen some remarkable accomplishments over the past 30 years.
                                                With a goal to become an $8 billion company by 2017.Fastest Magento 2 store has seen some remarkable accomplishments over the past 30 years.
                                                With a goal to become an $8 billion company by 2017.
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="section conatact_us pt-2 text-center px-5 pb-2" style={{backgroundColor:"#f0f0f0"}}>
                    <Container>
                        <h1 className="title pb-5 text-uppercase" style={{fontSize:"3rem", fontWeight: "1"}}>Contact us</h1>
                        <Row>
                            <Col className="ml-auto mr-auto" md="8">
                                <Form className="contact-form">
                                    <Row>
                                        <Col md="6">
                                            <label>Name</label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="nc-icon nc-single-02" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Name" type="text" />
                                            </InputGroup>
                                        </Col>
                                        <Col md="6">
                                            <label>Email</label>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="nc-icon nc-email-85" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Email" type="text" />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <label className="mt-4">Message</label>
                                    <Input
                                        placeholder="Tell us your thoughts and feelings..."
                                        type="textarea"
                                        rows="4"
                                    />
                                    <Row>
                                        <Col className="ml-auto mr-auto mt-4 mb-2" md="4">
                                            <Button className="btn-fill" color="danger" size="lg">
                                                Send Message
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                </div>
            </>
        )
    }

}

Landing.propTypes = {
    logoutUser: PropTypes.func,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser })
(Landing);
