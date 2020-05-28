import React , {Component} from "react";
import PropTypes from "prop-types";



import Header from "../../../components/Header/Header";

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
    Button, CardBody, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input
} from "reactstrap";
import axios from "axios";
import {GET_ERRORS} from "../../../actions/types";
import index from "../../../reducers";
import {connect} from "react-redux";
import {deleteUser, updatePassword, updateUser} from "../../../actions/authActions";
import _findIndex from "lodash.findindex";

class AllUsers extends Component{
    _isMounted = false;
    all = [];

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            error: null,
            isLoaded: false,
            users: [],
            user_name: null,
            userRole: "user",
            defaultModal: false,


            changePassword: "",
            changePasswordConfirm: "",
            passwordErrors : {},

        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state.name);
        // console.log(this.state.email);
    };

    toggleModal = (state,user_id) => {
        this.setState({
            [state]: !this.state[state],
            user_id: user_id

        });
    };



    componentDidMount() {
        //this._isMounted = true;

        axios
            .post("/api/users/findUsersByRole" , {userRole: this.state.userRole}
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
        let recordIndex = _findIndex(user,{_id : id})

        console.log(recordIndex);

        user.splice(recordIndex,1);
        this.setState({
            users: user
        });
        this.toggleModal("notificationModal",null)


        //console.log(this.state.users);


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


        //this.props.updatePassword(id,newPassword,this.props.history);
        //history.push("/admin/users/all");


        console.log(newPassword);

    };

    render() {
        return (
            <>
                <Header/>

                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Users Table</h3>
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
                                                                    href="#pablo"

                                                                    //onClick={this.onUserDeleteClick(value._id)}
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


AllUsers.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,

    {deleteUser,updatePassword}
)(AllUsers);
