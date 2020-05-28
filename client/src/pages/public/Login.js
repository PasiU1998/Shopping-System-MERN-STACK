import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser} from "../../actions/authActions";
import classnames from "classnames";
import Landing from "../../components/layout/Landing";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col, CardTitle
} from "reactstrap";


import App from "../../App";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {

        if ((this.props.auth.userRole === "admin") && (this.props.auth.isAuthenticated)) {
            this.props.history.push("/admin");
        } else if ((this.props.auth.userRole === "storeManager") && (this.props.auth.isAuthenticated)) {
            this.props.history.push("/storemanager");
        } else if (this.props.auth.isAuthenticated) {
            this.props.history.push("/user");
        }


    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.auth.userRole === "admin") && (nextProps.auth.isAuthenticated)) {
            this.props.history.push("/admin");
        } else if ((nextProps.auth.userRole === "storeManager") && (nextProps.auth.isAuthenticated)) {
            this.props.history.push("/storemanager");
        } else if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/user");
        }


        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData);
    };

    render() {
        const {errors} = this.state;

        return (

            <body className='bg-default'>
            <div className='main-content'>
                <div className='header bg-gradient-info py-5 py-lg-5'>
                    <div className='container'>
                        <div className='header-body text-center mb-7'>
                            <div className='justify-content-center row'>
                                <div className='col-md-6 col-lg-5'>
                                    <h1 className='text-white'>Welcome!</h1>
                                    <p className='text-lead text-light'>
                                        "Login to explore the convenient shopping experience!"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='separator separator-bottom separator-skew zindex-100'>
                        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1"
                             viewBox="0 0 2560 100" x="0" y="0">
                            <polygon className="fill-default" points="2560 0 2560 100 0 100">

                            </polygon>
                        </svg>
                    </div>
                </div>
                <div className='mt--8 pb-5 container'>
                    <div className='justify-content-center row'>
                        <Col lg="5" md="7" className="mb-7">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent pb-2">
                                    <div className="text-muted text-center mt-2 mb-3">
                                        <Link to="/" className="btn-flat waves-effect">
                                            <i className="material-icons left">keyboard_backspace</i> Back to
                                            home
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        Login Below
                                        <div>
                                           <small>
                                               Don't have an account? <Link to="/register">Create new account</Link>
                                           </small>
                                        </div>

                                    </div>
                                    <Form noValidate onSubmit={this.onSubmit} role="form">
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input onChange={this.onChange}
                                                       value={this.state.email}
                                                       error={errors.email}
                                                       id="email"
                                                       className={classnames("", {
                                                           invalid: errors.email || errors.emailnotfound
                                                       })}
                                                       placeholder="Email"
                                                       type="email"
                                                       autoComplete="new-email"/>
                                            </InputGroup>
                                            <span className="text-red">
                                                                          {errors.email}
                                                {errors.emailnotfound}
                                                                 </span>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>

                                                <Input onChange={this.onChange}
                                                       value={this.state.password}
                                                       error={errors.password}
                                                       id="password"
                                                       className={classnames("", {
                                                           invalid: errors.password || errors.passwordincorrect
                                                       })}
                                                       placeholder="Password"
                                                       type="password"
                                                       autoComplete="new-password"/>

                                            </InputGroup>
                                            <span className="text-red">
                                                                     {errors.password}
                                                {errors.passwordincorrect}
                                                                 </span>
                                        </FormGroup>
                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="submit">
                                                Sign in
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                </div>
            </div>
            </body>
        );

    }

}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);
