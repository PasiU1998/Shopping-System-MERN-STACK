
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// reactstrap components
import { Button, Container, Row, Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
    } from "reactstrap";
import {connect} from "react-redux";
import {deactivateAccount, logoutUser} from "../../actions/authActions";

class UserHeader extends React.Component {

    state = {
        defaultModal: false
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    onDeactivateClick = e => {
        e.preventDefault();
        this.props.deactivateAccount(this.props.auth.user.id,this.props.history);
    };

  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "300px",
            backgroundImage:
              "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
                <Col lg="7" md="10">
                    <h1 className=" text-white">Hello {this.props.auth.user.name}</h1>
                    <p className="text-white mt-0 mb-5">
                        This is your profile page. You can update your details,
                        update password and deactivate account
                    </p>
                    <Button

                        color="warning"
                        type="button"
                        onClick={() => this.toggleModal("notificationModal")}
                    >
                        Account Deactivation
                    </Button>

                    <Modal
                        className="modal-dialog-centered modal-danger"
                        contentClassName="bg-gradient-danger"
                        isOpen={this.state.notificationModal}
                        toggle={() => this.toggleModal("notificationModal")}
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
                                onClick={() => this.toggleModal("notificationModal")}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <i className="ni ni-bell-55 ni-3x" />
                                <h4 className="heading mt-4">Account Deactivation</h4>
                                <p>
                                    You are about to deactivate your account.You will lost your all information.
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button
                                className="btn-white"
                                color="default"
                                type="button"
                                onClick={this.onDeactivateClick}

                            >
                                Ok, Got it
                            </Button>
                            <Button
                                className="text-white ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.toggleModal("notificationModal")}
                            >
                                Close
                            </Button>
                        </div>
                    </Modal>


                </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

UserHeader.propTypes = {
    deactivateAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deactivateAccount }
)(UserHeader);
