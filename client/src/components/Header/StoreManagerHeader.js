
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import axios from "axios";

class StoreManagerHeader extends React.Component {


  constructor(props) {
    super(props);
    this.state ={
      store_managers: 0,
      users: 0,
      products: 0,
      orders: 0
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadOrders();
    this.loadUsers();
    this.loadProducts();
  }

  loadUsers = () => {
    axios
        .post("/api/users/findUsersByRole" , {userRole: "user"}
        )
        .then(res => {

          this.setState({
            isLoaded: true,
            users: res.data.length
          });
        })
        .catch(err =>{
          this.setState({
            isLoaded: true,
            err
          });
        });
  };

  loadOrders = () => {
    axios
        .get("/api/orders/all")
        .then(res => {
          if (this._isMounted){
            this.setState({
              isLoaded: true,
              orders: res.data.length
            });
            console.log(this.state.orders,"Dashboard");
          }
        })
        .catch(err =>{
          this.setState({

            err
          });
          console.log(err,"dsdsdas");
        });
    console.log("Hellooo")
  };

  loadProducts = () => {
    this._isMounted = true;
    axios
        .get("/api/products/allproducts")
        .then(res => {
          if (this._isMounted){
            this.setState({
              isLoaded: true,
              products: res.data.length
            });
          }
          console.log(res);
        })
        .catch(err =>{
          this.setState({
            isLoaded: true,
            err
          });
        });
  };


  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row className="my-2">
                        <div className="col">
                          <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                          >
                            Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{this.state.users}</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row className="my-2">
                        <div className="col">
                          <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                          >
                            Products
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.products}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-tshirt" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row className="my-2">
                        <div className="col">
                          <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                          >
                            Orders
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {this.state.orders}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-shopping-cart" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default StoreManagerHeader;
