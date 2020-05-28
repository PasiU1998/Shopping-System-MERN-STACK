import React , {Component} from "react";
import PropTypes from "prop-types";


import { createCart } from "../../../actions/cartActions";
import Header from "../../../components/Header/Header";
import {createWishList} from "../../../actions/wishlistActions";

import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Modal,
    Button,
    Col,
    CardBody,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import axios from "axios";
import {GET_ERRORS} from "../../../actions/types";
import index from "../../../reducers";
import {connect} from "react-redux";
import {deleteUser, registerStoreManager, updatePassword, updateUser} from "../../../actions/authActions";
import _findIndex from "lodash.findindex";

class AllStoreManagers extends Component{
    _isMounted = false;
    all = [];

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            isLoaded: false,
            users: [],
            defaultModal: false,

            name: "",
            email: "",
            password: "",
            password2: "",
            userRole: "",
            errors: {},
            errors1: {
                name: "",
                email: "",
                password: "",
                password2: "",
            },
            changePassword: "",
            changePasswordConfirm: "",
            passwordErrors : {},
            userId: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors,
                //errors1: nextProps.errors1,
            });
        }
    }

    toggleModal = (state,user_id) => {
        this.setState({
            [state]: !this.state[state],
                user_id: user_id
        });
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };



    componentDidMount() {
        //this._isMounted = true;

        axios
            .post("/api/users/findUsersByRole" , {userRole: "storeManager"}
            )
            .then(res => {

                this.setState({
                    isLoaded: true,
                    users: res.data
                });
            })
            .catch(err =>{
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    }

    // componentWillUnmount() {
    //     this._isMounted = false;
    // }

    onUserDeleteClick = (id) => {
        this.props.deleteUser(id,this.props.history);
        let user = this.state.users;
        let recordIndex = _findIndex(user,{_id : id});

        console.log(recordIndex);

        user.splice(recordIndex,1);
        this.setState({
            users: user
        });
        this.toggleModal("notificationModal",null)


        //console.log(this.state.users);


    };

    registerNewStoreManager = (e) => {
        e.preventDefault();


        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            userRole: "storeManager"
        };

        axios
            .post("/api/users/register", newUser)
            .then(res => {

                this.setState({
                    users: [
                        ...this.state.users,
                        res.data
                    ]
                });
                //this.props.history.push("/admin/storemanagers/all");
                this.toggleModal("formModal",null)

                const newCart = {
                    user_id: res.data._id,
                    products: []
                };
                this.props.createCart(newCart);

                const newWishlist ={
                  user_id: res.data._id,
                  products: []
                };
            })
            .catch(err =>{
                    console.log(err.response.data);
                    this.setState({
                             errors1: err.response.data
                    });
                     console.log(this.state.errors1)
            }
            );



        console.log(newUser);

        // const allgood = this.props.registerStoreManager(newUser, this.props.history);
        // console.log(allgood,"sdsdsadaasdsa");
        // if (allgood === true){
        //     this.setState({
        //         users: [
        //             ...this.state.users,
        //             newUser
        //         ]
        //     });
        // }
        // this.setState({
        //     users: [
        //         ...this.state.users,
        //         newUser
        //     ]
        // });
    };

    onPasswordUpdate = (id) => {

        const newPassword = {
            password: this.state.changePassword,
            passwordOne: this.state.changePasswordConfirm
        };

        axios
            .put("/api/users/updatePassword/" + id , {
                password:newPassword.password,
                password2: newPassword.passwordOne
            })
            .then(res => {
                //history.push("/admin")
                this.toggleModal("changePasswordModal",null)

            })
            .catch(err =>{
                console.log(err.response.data);
                this.setState({
                    passwordErrors: err.response.data
                });
                console.log(this.state.errors1)
                }

            );

        // this.props.updatePassword(id,newPassword,this.props.history);
        // this.toggleModal("changePasswordModal",null)



        console.log(newPassword);

    };


    render() {
        const { errors } = this.state;
        return (
            <>
                <Header/>

                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Store Managers Table</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={() => this.toggleModal("formModal")}
                                                size="sm"
                                            >
                                                Register New Store Manager
                                            </Button>

                                            <Modal
                                                className="modal-dialog-centered"
                                                size="sm"
                                                isOpen={this.state.formModal}
                                                toggle={() => this.toggleModal("formModal")}
                                            >
                                                <div className="modal-body p-0">
                                                    <Card className="bg-secondary shadow border-0">

                                                        <CardBody className="px-lg-5 py-lg-5">
                                                            <div className="text-center text-muted mb-4">
                                                                <small>Register New Store Manager</small>
                                                            </div>
                                                            <Form role="form">
                                                                <FormGroup className="mb-3">
                                                                    <InputGroup className="input-group-alternative">
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText>
                                                                                <i className="ni ni-circle-08" />
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                        <Input placeholder="Full Name"
                                                                               onChange={this.onChange}
                                                                               //error={this.state.errors1}
                                                                               value={this.state.name}
                                                                               id="name"
                                                                               type="text"
                                                                        />

                                                                    </InputGroup>
                                                                    <span className="text-red">{this.state.errors1.name}</span>

                                                                </FormGroup>
                                                                <FormGroup className="mb-3">
                                                                    <InputGroup className="input-group-alternative">
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText>
                                                                                <i className="ni ni-email-83" />
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                        <Input placeholder="Email"
                                                                               onChange={this.onChange}
                                                                               value={this.state.email}
                                                                               //error={errors.email}
                                                                               id="email"
                                                                               type="email"
                                                                        />

                                                                    </InputGroup>
                                                                    <span className="text-red">{this.state.errors1.email}</span>


                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <InputGroup className="input-group-alternative">
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText>
                                                                                <i className="ni ni-lock-circle-open" />
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                        <Input placeholder="Password"
                                                                               onChange={this.onChange}
                                                                               value={this.state.password}
                                                                              // error={errors.password}
                                                                               id="password"
                                                                               type="password"
                                                                        />

                                                                    </InputGroup>
                                                                    <span className="text-red">{this.state.errors1.password}</span>


                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <InputGroup className="input-group-alternative">
                                                                        <InputGroupAddon addonType="prepend">
                                                                            <InputGroupText>
                                                                                <i className="ni ni-lock-circle-open" />
                                                                            </InputGroupText>
                                                                        </InputGroupAddon>
                                                                        <Input placeholder="Confirm Password"
                                                                               onChange={this.onChange}
                                                                               value={this.state.password2}
                                                                               //error={errors.password2}
                                                                               id="password2"
                                                                               type="password"
                                                                        />

                                                                    </InputGroup>
                                                                    <span className="text-red">{this.state.errors1.password2}</span>


                                                                </FormGroup>
                                                                <div className="text-center">
                                                                    <Button
                                                                        className="my-4"
                                                                        color="primary"
                                                                        type="button"
                                                                        data-dismiss="modal"
                                                                        onClick={this.registerNewStoreManager}
                                                                    >
                                                                        Register Store Manager
                                                                    </Button>
                                                                </div>
                                                            </Form>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            </Modal>


                                        </Col>
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Full Name </th>
                                        <th scope="col">Email </th>
                                        <th scope="col">Address</th>
                                        <th scope="col">City</th>
                                        <th scope="col" />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.users.map((value, index) => {
                                            return (
                                                <tr key={value.email}>
                                                    <td scope="row">{value.name}</td>
                                                    <td scope="row">{value.email}</td>
                                                    <td scope="row">{value.address}</td>
                                                    <td scope="row">{value.city}</td>
                                                    <td className="text-right">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#pablo"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem

                                                                    onClick={() => this.toggleModal("changePasswordModal",value._id)}

                                                                ><i className="fas fa-edit text-primary"></i>&nbsp;
                                                                    Update Password
                                                                </DropdownItem>
                                                                <DropdownItem
                                                                    //href="#pablo"

                                                                    //onClick={this.onUserDeleteClick(value._id)}
                                                                    //onClick={ (e) => this.onUserDeleteClick(value._id)}
                                                                    onClick={() => this.toggleModal("notificationModal",value._id)}
                                                                ><i className="fa fa-trash text-danger" />&nbsp;
                                                                    Delete
                                                                </DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination
                                            className="pagination justify-content-end mb-0"
                                            listClassName="justify-content-end mb-0"
                                        >
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                    tabIndex="-1"
                                                >
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="disabled">
                                                <PaginationLink
                                                    href="#pablo"
                                                    onClick={e => e.preventDefault()}
                                                >
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>

                <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={this.state.notificationModal}
                    toggle={() => this.toggleModal("notificationModal",null)}
                >
                    <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-notification">
                            Your attention is required
                        </h6>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal",null)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className="ni ni-bell-55 ni-3x" />
                            <h4 className="heading mt-4">You should read this!</h4>
                            <p>
                                You are about to delete the user
                                You will lose all the information
                                of this user
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button className="btn-white"
                                color="default"
                                type="button"
                                onClick={ (e) => this.onUserDeleteClick(this.state.user_id)}

                        >
                            Ok, Got it
                        </Button>
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal",null)}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>

                <Modal
                    className="modal-dialog-centered"
                    size="sm"
                    isOpen={this.state.changePasswordModal}
                    toggle={() => this.toggleModal("changePasswordModal",null)}
                >
                    <div className="modal-body p-0">
                        <Card className="bg-secondary shadow border-0">

                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <small>Update Password</small>
                                </div>
                                <Form role="form">
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Password"
                                                   onChange={this.onChange}
                                                   value={this.state.changePassword}
                                                // error={errors.password}
                                                   id="changePassword"
                                                   type="password"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{this.state.passwordErrors.password}</span>


                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ni ni-lock-circle-open" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Confirm Password"
                                                   onChange={this.onChange}
                                                   value={this.state.changePasswordConfirm}
                                                //error={errors.password2}
                                                   id="changePasswordConfirm"
                                                   type="password"
                                            />

                                        </InputGroup>
                                        <span className="text-red">{this.state.passwordErrors.password2}</span>



                                    </FormGroup>
                                    <div className="text-center">
                                        <Button
                                            className="my-4"
                                            color="primary"
                                            type="button"
                                            data-dismiss="modal"
                                            onClick={(e) =>  this.onPasswordUpdate(this.state.user_id)}

                                        >
                                            Update Password
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </Modal>
            </>
        )
    }

}


AllStoreManagers.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    registerStoreManager: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,
    createCart:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors

});

export default connect(
    mapStateToProps,
    {deleteUser,registerStoreManager,updatePassword, createCart, createWishList}
)(AllStoreManagers);
