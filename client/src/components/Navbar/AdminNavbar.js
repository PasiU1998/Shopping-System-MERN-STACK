import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Media
} from "reactstrap";


class AdminNavbar extends React.Component {


    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };


    render() {
        const { user } = this.props.auth;
        return (
            <div className="main-content" ref="mainContent">
                <>
                    <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                        <Container fluid>
                            <h2
                                className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                                to="/"
                            >
                                {this.props.NavbarText}
                            </h2>

                            <Nav className="align-items-center d-none d-md-flex" navbar>
                                <NavItem>
                                    <NavLink className="nav-link-icon" to="/" tag={Link}>
                                        <i className="ni ni-planet" />
                                        <span className="nav-link-inner--text">Public Site</span>
                                    </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav>
                                    <DropdownToggle className="pr-0" nav>
                                        <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                          <img
                                              alt="..."
                                              src={require("../../assets/img/theme/team-4-800x800.jpg")}
                                          />
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                          <span className="mb-0 text-sm font-weight-bold">
                                           {user.name.split(" ")[0]}
                                          </span>
                                         </Media>
                                        </Media>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                        <DropdownItem className="noti-title" header tag="div">
                                            <h6 className="text-overflow m-0">Welcome!</h6>
                                        </DropdownItem>
                                        <DropdownItem to={this.props.UserProfileLink} tag={Link}>
                                            <i className="ni ni-single-02" />
                                            <span>My profile</span>
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem href="#pablo"
                                                      onClick={this.onLogoutClick}
                                        >
                                            <i className="ni ni-user-run" />
                                            <span>Logout</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Container>
                    </Navbar>
                </>
            </div>
        );
    }
}


AdminNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(AdminNavbar);
