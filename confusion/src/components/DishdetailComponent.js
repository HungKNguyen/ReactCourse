import React, {Component} from "react";
import {
    Card, CardBody, CardImg, CardText, CardTitle,
    Breadcrumb, BreadcrumbItem, Button,
    ModalHeader, ModalBody, Modal, Label
} from "reactstrap";
import { Link } from 'react-router-dom';
import {Control, Errors, LocalForm} from "react-redux-form";

const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg' /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className='form-group'>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select model=".rating" name="rating" id="rating"
                                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" id="author" name="author"
                                              placeholder="Your Name"
                                              className="form-control"
                                              validators={{
                                                  minLength: minLength(3), maxLength: maxLength(15)
                                              }}
                                />
                                <Errors className='text-danger' model='.author' show='touched'
                                        messages={{
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}/>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                                  rows="6"
                                                  className="form-control" />
                            </div>
                            <div className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderDish(dish) {
    return (
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments(comments) {
    const commentsList = comments.map((comment) => {
        const date = new Date(comment.date);
        const stringDate = date.toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author} , {stringDate}</p>
            </li>
        )
    })
    return (
        <div>
            <h5><b>Comments</b></h5>
            <ul className="list-unstyled">{commentsList}</ul>
            <CommentForm />
        </div>
    )
}

const Dishdetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className='col-md-5 col-12 m-1'>
                        {RenderDish(props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {RenderComments(props.comments)}
                    </div>
                </div>
            </div>
            )
    }
    else {
        return <div/>
    }
}

export default Dishdetail