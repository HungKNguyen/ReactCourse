import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";

class Dishdetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
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

    renderComments(comments) {
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
            </div>
        )
    }

    render() {
        if (this.props.dish != null) {
            return (
                <div className="row">
                    <div className='col-md-5 col-12 m-1'>
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
                )
        }
        else {
            return <div></div>
        }
    }
}

export default Dishdetail