import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";

// core components
import AdminNavbar from "../components/Navbar/AdminNavbar";
import AdminFooter from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import routes from "../routes";


class Admin extends React.Component {
    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }
    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.layout === "/admin") {
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
                <Sidebar
                    {...this.props}
                    layout="/admin"
                    routes={routes}
                    logo={{
                        innerLink: "/admin",
                        imgSrc: require("../assets/img/brand/logo.jpg"),
                        imgAlt: "..."
                    }}
                    UserProfileLink = "/admin/userProfile"

                />
                <div className="main-content" ref="mainContent">
                    <AdminNavbar
                        {...this.props}
                        NavbarText="Admin Area"
                        UserProfileLink = "/admin/userProfile"

                    />
                    <Switch>

                        {this.getRoutes(routes)}
                    </Switch>
                    <Container fluid>
                        <AdminFooter />
                    </Container>
                </div>
            </>
        );
    }
}

export default Admin;
