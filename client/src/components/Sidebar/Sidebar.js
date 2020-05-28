
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col
} from "reactstrap";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";

class Sidebar extends React.Component {
    state = {
        collapseOpen: false
    };
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
    }

    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        console.log(this.props.location.pathname.indexOf(routeName));
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    // toggles collapse between opened and closed (true/false)
    toggleCollapse = () => {
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };

    // closes the collapse
    closeCollapse = () => {
        this.setState({
            collapseOpen: false
        });
    };

    // creates the links that appear in the left menu / Sidebar
    createLinks = (routes, layout) => {
        return routes.map((prop, key) => {
            if (prop.sidebar_link){
                if (prop.layout === layout){
                    return (
                        <NavItem key={key}>
                            <NavLink
                                to={prop.layout + prop.path}
                                tag={NavLinkRRD}
                                onClick={this.closeCollapse}
                                activeClassName="active"
                            >
                                <i className={prop.icon} />
                                {prop.name}
                            </NavLink>
                        </NavItem>
                    );
                }
            }
        });
    };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { bgColor, routes, logo, layout } = this.props;
        let navbarBrandProps;
        if (logo && logo.innerLink) {
            navbarBrandProps = {
                to: logo.innerLink,
                tag: Link
            };
        } else if (logo && logo.outterLink) {
            navbarBrandProps = {
                href: logo.outterLink,
                target: "_blank"
            };
        }
        return (
            <Navbar
                className="navbar-vertical fixed-left navbar-light bg-white"
                expand="md"
                id="sidenav-main"
            >
                <Container fluid>
                    {/* Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={this.toggleCollapse}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    {/* Brand */}
                    {logo ? (
                        <NavbarBrand className="pt-0" {...navbarBrandProps}>
                            <img
                                alt={logo.imgAlt}
                                className="navbar-brand-img"
                                src={logo.imgSrc}
                            />
                        </NavbarBrand>
                    ) : null}
                    {/* User */}
                    <Nav className="align-items-center d-md-none">
                        <NavItem>
                            <NavLink className="nav-link-icon" to="/" tag={Link}>
                                <i className="ni ni-planet" />
                                {/*<span className="nav-link-inner--text">Public Site</span>*/}
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                        alt="..."
                        src={require("../../assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
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
                    {/* Collapse */}
                    <Collapse navbar isOpen={this.state.collapseOpen}>
                        {/* Collapse header */}
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                {logo ? (
                                    <Col className="collapse-brand" xs="6">
                                        {logo.innerLink ? (
                                            <Link to={logo.innerLink}>
                                                <img alt={logo.imgAlt} src={logo.imgSrc} />
                                            </Link>
                                        ) : (
                                            <a href={logo.outterLink}>
                                                <img alt={logo.imgAlt} src={logo.imgSrc} />
                                            </a>
                                        )}
                                    </Col>
                                ) : null}
                                <Col className="collapse-close" xs="6">
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        onClick={this.toggleCollapse}
                                    >
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>

                        {/* Navigation */}
                        <Nav navbar>{this.createLinks(routes, layout)}</Nav>

                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

Sidebar.defaultProps = {
    routes: [{}]
};

Sidebar.propTypes = {
    layout: PropTypes.string,
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link to="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired
    }),
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Sidebar);

// export default Sidebar;
