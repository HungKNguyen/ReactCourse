import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from 'react-router-dom';

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