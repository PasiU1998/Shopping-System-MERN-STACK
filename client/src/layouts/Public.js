
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";

// core components
import LandingNavbar from "../components/Navbar/LandingNavbar";
import Footer from "../components/Footer/PublicFooter";
// import Sidebar from "../components/Sidebar/Sidebar";

import routes from "../routes";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../actions/authActions";
import AdminFooter from "../components/Footer/Footer";


class Public extends React.Component {
    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/") {
                return (
                    <Route
                        exact path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    render() {
        return (
            <>
                <div ref="mainContent">
                    <LandingNavbar
                        {...this.props}
                        navBarColor = "transparent"
                        navBarFontColor= "text-white"
                    />

                    <Switch>

                        {this.getRoutes(routes)}
                    </Switch>
                    {/*<Container>*/}
                        <Footer />
                    {/*</Container>*/}
                </div>

            </>
        );
    }
}

Public.propTypes = {
    logoutUser: PropTypes.func,
    auth: PropTypes.object,
    cart: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Public);
