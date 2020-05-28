import React , {Component} from "react";
import _findIndex from "lodash.findindex";

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
    FormGroup,
    Form,
    Input,
    UncontrolledTooltip, Button, Modal, Col
} from "reactstrap";
import axios from "axios";
import {GET_ERRORS} from "../../../actions/types";
import index from "../../../reducers";

class AllCategories extends Component{
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            categories: [],
            defaultModal: false,
            category_id: null,
            addCategoryTitle: "",
            currentCategoryTitle: "",
            editCategoryTitle: ""
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadCategories();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.editCategoryTitle !== this.props.editCategoryTitle) {
            this.setState({
                currentCategoryTitle: this.props.editCategoryTitle
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toggleModal = (state, category) => {

        this.setState({
            [state]: !this.state[state],
            category_id: category? category._id: '',
            currentCategoryTitle: category? category.title: '',
        });
    };

    loadCategories = () => {
        axios
            .get("/api/categories/getall")
            .then(res => {
                if (this._isMounted){
                    this.setState({
                        isLoaded: true,
                        categories: res.data
                    });
                }
            })
            .catch(err =>{
                this.setState({
                    isLoaded: true,
                    err
                });
            });
    };

    onTextChange = (event) => {
        this.setState({
            currentCategoryTitle : event.target.value
        });
    };

    addCategory = e => {
        e.preventDefault();

        this.setState({
            addCategoryTitle: this.state.currentCategoryTitle
        }, function () {
            this.addCategoryApiCall();
        });

    };

    editCategory = e => {
        e.preventDefault();

        this.setState({
            editCategoryTitle: this.state.currentCategoryTitle
        }, function () {
            this.editCategoryApiCall();
        });

    };

    addCategoryApiCall = () => {

        const newCategory = { title : this.state.addCategoryTitle};

        axios
            .post("/api/categories/store/", newCategory)
            .then(res => {
                this.setState({
                    addCategoryTitle : "",
                    currentCategoryTitle: "",
                    categories: [
                        ...this.state.categories,
                        res.data
                    ]
                });
                this.toggleModal("addCategoryModal", null)
            })
            .catch(err =>{
                console.log(err);
            });
    };

    editCategoryApiCall = () => {

        const updateCategory = { title : this.state.editCategoryTitle};

        axios
            .put("/api/categories/update/" + this.state.category_id, updateCategory)
            .then(res => {
                let categories = this.state.categories;
                let categoryIndex = _findIndex(this.state.categories, {id : this.state.category_id});

                categories.splice(categoryIndex, 1);
                this.setState({
                    editCategoryTitle : "",
                    currentCategoryTitle: "",
                    categories: categories
                });
                this.setState({
                    categories: [
                        ...this.state.categories,
                        res.data
                    ]
                });
                this.toggleModal("editCategoryModal", null)
            })
            .catch(err =>{
                console.log(err);
            });
    };

    deleteCategory = (id) =>{
        axios
            .delete("/api/categories/delete/" + id)
            .then(res => {
                let categories = this.state.categories;
                let categoryIndex = _findIndex(this.state.categories, {id : id});

                categories.splice(categoryIndex, 1);
                this.setState({
                    categories : categories,
                });
                this.toggleModal("notificationModal", null)
            })
            .catch(err =>{
                console.log(err);
            });
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
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Product Categories table</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#"
                                                onClick={() => this.toggleModal("addCategoryModal", null)}
                                            >
                                                Add Category
                                            </Button>
                                        </Col>
                                    </Row>

                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Created at</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.categories.map((value, index) => {
                                            return (
                                                <tr key={value._id}>
                                                    <td scope="row">{index+1}</td>
                                                    <td scope="row">{value.title}</td>
                                                    <td scope="row">{value.createdAt}</td>
                                                    <td scope="row">
                                                        <UncontrolledDropdown>
                                                            <DropdownToggle
                                                                className="btn-icon-only text-light"
                                                                href="#"
                                                                role="button"
                                                                size="sm"
                                                                color=""
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>

                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem onClick={() => this.toggleModal("notificationModal", value)}>
                                                                    <i className="fa fa-trash text-danger" />&nbsp;Delete Category

                                                                </DropdownItem>

                                                                <DropdownItem onClick={() => this.toggleModal("editCategoryModal", value)}>
                                                                    <i className="fa fa-edit text-primary" />&nbsp;Edit Category

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

                {/*delete modal*/}
                <Modal
                    className="modal-dialog-centered modal-danger"
                    contentClassName="bg-gradient-danger"
                    isOpen={this.state.notificationModal}
                    toggle={() => this.toggleModal("notificationModal", null)}
                >
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal", null)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <i className="ni ni-bell-55 ni-3x" />
                            <h4 className="heading mt-4">Delete Category</h4>
                            <p>
                                You are about to delete this category.
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="btn-white"
                            color="default"
                            type="button"
                            onClick={() => this.deleteCategory(this.state.category_id)}

                        >
                            Confirm
                        </Button>
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("notificationModal", null)}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>

                {/*add modal*/}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.addCategoryModal}
                    toggle={() => this.toggleModal("addCategoryModal", null)}
                >
                    <div className="modal-header">
                        <h3 className="modal-title" id="modal-title-default">
                            Add Category
                        </h3>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("addCategoryModal", null)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <Form role="form">
                                <FormGroup className="mb-3">
                                        <Input onChange={(e) => this.onTextChange(e)} name="title" placeholder="Title" type="text"/>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="btn-white"
                            color="default"
                            type="button"
                            onClick={(e) => this.addCategory(e)}
                        >
                            Add
                        </Button>
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("addCategoryModal", null)}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>

                {/*edit modal*/}
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.editCategoryModal}
                    toggle={() => this.toggleModal("editCategoryModal", null)}
                >
                    <div className="modal-header">
                        <h3 className="modal-title" id="modal-title-default">
                            Edit Category
                        </h3>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("editCategoryModal", null)}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="py-3 text-center">
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <Input onChange={(e) => this.onTextChange(e)} value={this.state.currentCategoryTitle} name="title" placeholder="Title" type="text" />
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button
                            className="btn-white"
                            color="default"
                            type="button"
                            onClick={(e) => this.editCategory(e)}
                        >
                            Update
                        </Button>
                        <Button
                            className="text-white ml-auto"
                            color="link"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("editCategoryModal", null)}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>
            </>
        )
    }

}

export default AllCategories;
