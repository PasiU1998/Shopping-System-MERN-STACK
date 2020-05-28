
import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container
} from "reactstrap";

function LandingNavbar(props) {
    const user = props.auth;

    const [navbarColor, setNavbarColor] = React.useState({WebkitTransition: "all .4s", background: props.navBarColor, paddingTop: "25px", boxShadow: "none", fontWeight: 700});
    const [navbarFontColor, setNavbarFontColor] = React.useState(props.navBarFontColor);
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
    const [productCount, setProductCount] = React.useState(0);

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
    };

    const getProductCountInCart = () => {
        if (Object.keys(props.cart.cart).length != 0 && props.cart.cart.constructor === Object){
            setProductCount(props.cart.cart.products.length);
        }else{
            setProductCount(0);
        }
    };

    React.useEffect(() => {
        getProductCountInCart();

        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 299 ||
                document.body.scrollTop > 299
            ) {
                setNavbarColor({WebkitTransition: "all .4s", background: "#fff", boxShadow: "0 6px 10px -4px rgba(0,0,0,.15)", fontWeight: 700});
                setNavbarFontColor("text-dark");
            } else if (
                document.documentElement.scrollTop < 300 ||
                document.body.scrollTop < 300
            ) {
                setNavbarColor({WebkitTransition: "all .4s", background: props.navBarColor, paddingTop: "25px", boxShadow: "none", fontWeight: 700});
                setNavbarFontColor(props.navBarFontColor);
            }
        };

        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };


    });

    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    return (
        <Navbar
            className={classnames("fixed-top")}
            style={navbarColor}
            color-on-scroll="300"
            expand="lg"
        >
            <Container>
                <div className={classnames("navbar-translate", navbarFontColor)}>
                    <NavbarBrand
                        data-placement="top"
                        to="/"
                        tag={Link}
                    >
                        <img src={require("../../assets/img/brand/logo.png")} width={200} />
                        {/*Online Shopping*/}
                    </NavbarBrand>
                    <button
                        aria-expanded={navbarCollapse}
                        className={classnames("navbar-toggler navbar-toggler", {
                            toggled: navbarCollapse
                        })}
                        onClick={toggleNavbarCollapse}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                </div>
                <Collapse
                    className="justify-content-end"
                    navbar
                    isOpen={navbarCollapse}
                >
                    {
                        (user.isAuthenticated)? (
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className={classnames(navbarFontColor)} to="/product/all" tag={Link}>
                                        Products
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames(" notification", navbarFontColor)} to="/wishlist" tag={Link}>
                                        <i className="fa fa-heart" title="Wishlist"></i>&nbsp;
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames(" notification", navbarFontColor)} to="/cart" tag={Link}>
                                        <i className="fa fa-shopping-cart" title="View Cart"></i>&nbsp;
                                        {
                                            (productCount != 0)? (
                                                <span className="badge badge-danger">{productCount}</span>
                                            ):null
                                        }
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    {
                                        (user.userRole === "admin") ? (
                                            <NavLink className={classnames(navbarFontColor)} to="/admin" tag={Link}>
                                                Dashboard
                                            </NavLink>
                                        ) : null
                                    }
                                    {
                                        (user.userRole === "storeManager") ? (
                                            <NavLink className={classnames(navbarFontColor)} to="/storemanager" tag={Link}>
                                                Dashboard
                                            </NavLink>
                                        ) : null
                                    }
                                    {
                                        (user.userRole === "user") ?(
                                            <NavLink className={classnames(navbarFontColor)} to="/user/" tag={Link}>
                                                Dashboard
                                            </NavLink>
                                        ) : null
                                    }

                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames(navbarFontColor)} to="#" onClick={onLogoutClick} tag={Link}>
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        ) : (
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className={classnames(navbarFontColor)} to="/product/all" tag={Link}>
                                        Products
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames(navbarFontColor)} to="/login" tag={Link}>
                                        Login
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames(navbarFontColor)} to="/register" tag={Link}>
                                        Register
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        )
                    }

                </Collapse>
            </Container>
        </Navbar>
    );
}

export default LandingNavbar;
