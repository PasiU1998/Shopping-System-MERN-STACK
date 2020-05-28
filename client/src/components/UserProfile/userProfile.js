
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Alert } from "reactstrap";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import UserHeader from "../Header/UserHeader.js";
import {logoutUser, updatePassword, updateUser} from "../../actions/authActions";
import axios from "axios";
import {GET_ERRORS} from "../../actions/types";

class userProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.auth.user.name,
            email: this.props.auth.user.email,
            firstName: this.props.auth.user.firstName,
            lastName: this.props.auth.user.lastName,
            address: this.props.auth.user.address,
            city: this.props.auth.user.city,
            password: [],
            passwordOne: [],
            errors: {}
        };



    }

    componentDidUpdate(prevProps, prevState, snapshot) {


        if (prevProps.auth.user.name !== this.props.auth.user.name){
            console.log("hellooooooo");
            this.setState({
                name : this.props.auth.user.name,
                firstName: this.props.auth.user.firstName,
                lastName: this.props.auth.user.lastName,
                address: this.props.auth.user.address,
                city: this.props.auth.user.city,



            });
        }
    }

    componentDidMount() {
        this.setState({
            name: this.state.name,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
        })
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        // console.log(this.state.name);
        // console.log(this.state.email);
    };


    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city
        };

        this.setState({
            name: this.state.name,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,

        });
        this.props.auth.user.name = newUser.name;
        this.props.auth.user.firstName = newUser.firstName;
        this.props.auth.user.lastName = newUser.lastName;
        this.props.auth.user.address = newUser.address;
        this.props.auth.user.city = newUser.city;


        // console.log(newUser,"Hellooo");

        this.props.updateUser(this.props.auth.user.id,newUser,this.props.history);
        // console.log(this.state.name,"sdasd");

    };


    onPasswordUpdate = e => {
        e.preventDefault();

        const newPassword = {
            password: this.state.password,
            passwordOne: this.state.passwordOne
        };

       this.props.updatePassword(this.props.auth.user.id,newPassword,this.props.history);


        console.log(newPassword);

    }

    render() {
        const { user } = this.props.auth;
        const { errors } = this.state;
        return (
            <>
                <UserHeader />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-1" xl="12">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">My account</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={(e) => this.onSubmit(e)}
                                                size="sm"
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form >
                                        <h6 className="heading-small text-muted mb-4">
                                            User information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Full Name
                                                        </label>
                                                        <Input
                                                            onChange={this.onChange}

                                                            error={errors.name}
                                                            className="form-control-alternative"
                                                            id="name"
                                                            placeholder="Username"
                                                            type="text"
                                                            value={this.state.name}
                                                            className={classnames("", {
                                                                invalid: errors.name
                                                            })}
                                                        />
                                                        <span className="text-red">{errors.name}</span>

                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            onChange={this.onChange}
                                                            // error={errors.name}
                                                            className="form-control-alternative"
                                                            id="email"
                                                            readOnly
                                                            placeholder="jesse@example.com"
                                                            type="email"
                                                            value={this.state.email}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            {/*<Row>*/}
                                            {/*    <Col lg="6">*/}
                                            {/*        <FormGroup>*/}
                                            {/*            <label*/}
                                            {/*                className="form-control-label"*/}
                                            {/*                htmlFor="input-first-name"*/}
                                            {/*            >*/}
                                            {/*                First name*/}
                                            {/*            </label>*/}
                                            {/*            <Input*/}
                                            {/*                onChange={this.onChange}*/}
                                            {/*                // error={errors.name}*/}
                                            {/*                className="form-control-alternative"*/}
                                            {/*                id="firstName"*/}
                                            {/*                placeholder="First name"*/}
                                            {/*                type="text"*/}
                                            {/*                value= {this.state.firstName}*/}
                                            {/*            />*/}
                                            {/*        </FormGroup>*/}
                                            {/*    </Col>*/}
                                            {/*    <Col lg="6">*/}
                                            {/*        <FormGroup>*/}
                                            {/*            <label*/}
                                            {/*                className="form-control-label"*/}
                                            {/*                htmlFor="input-last-name"*/}
                                            {/*            >*/}
                                            {/*                Last name*/}
                                            {/*            </label>*/}
                                            {/*            <Input*/}
                                            {/*                onChange={this.onChange}*/}
                                            {/*                // error={errors.name}*/}
                                            {/*                className="form-control-alternative"*/}
                                            {/*                id="lastName"*/}
                                            {/*                placeholder="Last name"*/}
                                            {/*                type="text"*/}
                                            {/*                value= {this.state.lastName}*/}

                                            {/*            />*/}
                                            {/*        </FormGroup>*/}
                                            {/*    </Col>*/}
                                            {/*</Row>*/}
                                        </div>
                                        <hr className="my-4" />
                                        {/* Address */}
                                        <h6 className="heading-small text-muted mb-4">
                                            Contact information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-address"
                                                        >
                                                            Address
                                                        </label>
                                                        <Input
                                                            onChange={this.onChange}
                                                            // error={errors.name}
                                                            className="form-control-alternative"
                                                            id="address"
                                                            placeholder="Home Address"
                                                            type="text"
                                                            value= {this.state.address}

                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-city"
                                                        >
                                                            City
                                                        </label>
                                                        <Input
                                                            onChange={this.onChange}
                                                            // error={errors.name}
                                                            className="form-control-alternative"
                                                            id="city"
                                                            placeholder="City"
                                                            type="text"
                                                            value= {this.state.city}

                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </div>

                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col className="order-xl-1" xl="12" >
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Change Password</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={(e) => this.onPasswordUpdate(e)}
                                                size="sm"
                                            >
                                                Save
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form >
                                        <h6 className="heading-small text-muted mb-4">
                                            New Password
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            New Password
                                                        </label>
                                                        <Input
                                                            onChange={this.onChange}
                                                            error={errors.name}
                                                            className="form-control-alternative"
                                                            id="password"
                                                            placeholder="Enter Password"
                                                            type="password"
                                                            value= {this.state.password}
                                                        />
                                                        <span className="text-red">{errors.password}</span>
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Confirm New Password
                                                        </label>
                                                        <Input
                                                            onChange={this.onChange}
                                                            error={errors.name}
                                                            className="form-control-alternative"
                                                            id="passwordOne"
                                                            placeholder="Confirm Password"
                                                            type="password"
                                                            value= {this.state.passwordOne}

                                                        />
                                                        <span className="text-red">{errors.password2}</span>

                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>


                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>


                    </Row>
                </Container>
            </>
        );
    }
}

userProfile.propTypes = {
    updatePassword: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {updateUser,updatePassword}
)(userProfile);
