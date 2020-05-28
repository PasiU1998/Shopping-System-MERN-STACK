import React , {Component} from "react";
// reactstrap components


class singleProductView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: []

        };
        this.state.products = props.products
        console.log(props.products)

    }

    render() {
        return (
            <>

                <div className="container">
                    <div className="card">
                        <div className="container-fliud">
                            <div className="wrapper row">
                                <div className="preview col-md-6">

                                    <div className="preview-pic tab-content">
                                        <div className="tab-pane active" id="pic-1"><img
                                            src="http://placekitten.com/400/252"/></div>

                                    </div>

                                </div>
                                <div className="details col-md-6">
                                    <h3 className="product-title">men's shoes fashion</h3>
                                    <div className="rating">
                                        <div className="stars">
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star checked"></span>
                                            <span className="fa fa-star"></span>
                                            <span className="fa fa-star"></span>
                                        </div>
                                        <span className="review-no">41 reviews</span>
                                    </div>
                                    <p className="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu
                                        laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu
                                        delectus posuere.</p>
                                    <h4 className="price">current price: <span>$180</span></h4>
                                    <p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87
                                        votes)</strong></p>
                                    <h5 className="sizes">sizes:
                                        <span className="size" data-toggle="tooltip" title="small">s</span>
                                        <span className="size" data-toggle="tooltip" title="medium">m</span>
                                        <span className="size" data-toggle="tooltip" title="large">l</span>
                                        <span className="size" data-toggle="tooltip" title="xtra large">xl</span>
                                    </h5>
                                    <h5 className="colors">colors:
                                        <span className="color orange not-available" data-toggle="tooltip"
                                              title="Not In store"></span>
                                        <span className="color green"></span>
                                        <span className="color blue"></span>
                                    </h5>
                                    <div className="action">
                                        <button className="add-to-cart btn btn-default" type="button">add to cart
                                        </button>
                                        <button className="like btn btn-default" type="button"><span
                                            className="fa fa-heart"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>





            </>
        );
    }

}

export default singleProductView;
