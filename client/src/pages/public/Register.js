import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";
import classnames from "classnames";

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

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            userRole: "",
            errors: {}
        };
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
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

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            userRole: "user"
        };

        console.log(newUser);

        this.props.registerUser(newUser, this.props.history);
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
                                        "Register to explore the convenient shopping experience!"
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
                        <Col lg="5" md="7">
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
                                        Register Below
                                      <div>
                                        <small>Already have an account? <Link to="/login">Log in</Link> </small>
                                      </div>

                                    </div>
                                    <Form noValidate onSubmit={this.onSubmit} role="form">
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-hat-3"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    onChange={this.onChange}
                                                    error={errors.name}
                                                    value={this.state.name}
                                                    id="name"
                                                    className={classnames("", {
                                                        invalid: errors.name
                                                    })} placeholder="Full name"
                                                    type="text"
                                                />
                                            </InputGroup>
                                          <span className="text-red">{errors.name}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.email}
                                                    error={errors.email}
                                                    id="email"
                                                    className={classnames("", {
                                                        invalid: errors.email
                                                    })}
                                                    placeholder="Email" type="email" autoComplete="new-email"/>
                                            </InputGroup>
                                          <span className="text-red">{errors.email}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.password}
                                                    error={errors.password}
                                                    id="password"
                                                    className={classnames("", {
                                                        invalid: errors.password
                                                    })}
                                                    placeholder="Password" type="password"
                                                    autoComplete="new-password"/>
                                            </InputGroup>
                                          <span className="text-red">{errors.password}</span>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    onChange={this.onChange}
                                                    value={this.state.password2}
                                                    error={errors.password2}
                                                    id="password2"
                                                    className={classnames("", {
                                                        invalid: errors.password2
                                                    })}
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                    autoComplete="new-password"/>
                                            </InputGroup>
                                          <span className="text-red">{errors.password2}</span>
                                        </FormGroup>

                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="submit">
                                                Register
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                    <div className='px-lg-5 py-lg-5 card-body'>

                    </div>
                </div>
            </div>


            </body>



            // <div className="container">
            //   <div className="row">
            //     <div className="col s8 offset-s2">
            //       <Link to="/" className="btn-flat waves-effect">
            //         <i className="material-icons left">keyboard_backspace</i> Back to
            //         home
            //       </Link>
            //       <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            //         <h4>
            //           <b>Register</b> below
            //         </h4>
            //         <p className="grey-text text-darken-1">
            //           Already have an account? <Link to="/login">Log in</Link>
            //         </p>
            //       </div>
            //       <form noValidate onSubmit={this.onSubmit}>
            //         <div className="input-field col s12">
            //           <input
            //             onChange={this.onChange}
            //             error={errors.name}
            //             value={this.state.name}
            //             id="name"
            //             type="text"
            //             className={classnames("", {
            //               invalid: errors.name
            //             })}
            //           />
            //           <label htmlFor="name">Name</label>
            //           <span className="red-text">{errors.name}</span>
            //         </div>
            //         <div className="input-field col s12">
            //           <input
            //             onChange={this.onChange}
            //             value={this.state.email}
            //             error={errors.email}
            //             id="email"
            //             type="email"
            //             className={classnames("", {
            //               invalid: errors.email
            //             })}
            //           />
            //           <label htmlFor="email">Email</label>
            //           <span className="red-text">{errors.email}</span>
            //         </div>
            //         <div className="input-field col s12">
            //           <input
            //             onChange={this.onChange}
            //             value={this.state.password}
            //             error={errors.password}
            //             id="password"
            //             type="password"
            //             className={classnames("", {
            //               invalid: errors.password
            //             })}
            //           />
            //           <label htmlFor="password">Password</label>
            //           <span className="red-text">{errors.password}</span>
            //         </div>
            //         <div className="input-field col s12">
            //           <input
            //             onChange={this.onChange}
            //             value={this.state.password2}
            //             error={errors.password2}
            //             id="password2"
            //             type="password"
            //             className={classnames("", {
            //               invalid: errors.password2
            //             })}
            //           />
            //           <label htmlFor="password2">Confirm Password</label>
            //           <span className="red-text">{errors.password2}</span>
            //         </div>
            //         <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            //           <button
            //             style={{
            //               width: "150px",
            //               borderRadius: "3px",
            //               letterSpacing: "1.5px",
            //               marginTop: "1rem"
            //             }}
            //             type="submit"
            //             className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            //           >
            //             Sign up
            //           </button>
            //         </div>
            //       </form>
            //     </div>
            //   </div>
            // </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerUser}
)(withRouter(Register));
