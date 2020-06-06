import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
    if (dish != null)
        return (
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle className="font-weight-bold">
                        {dish.name}
                    </CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else return <div></div>;
}

function RenderComments({ comments }) {
    if (comments != null) {
        const comm = comments.map((c) => {
            return (
                <li key={c.id}>
                    <p>{c.comment}</p>
                    <p>
                        --{c.author},
                        {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                        }).format(new Date(Date.parse(c.date)))}
                    </p>
                </li>
            );
        });
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">{comm}</ul>
            </div>
        );
    } else {
        return <div></div>;
    }
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1 ">
                        <RenderComments comments={props.dish.comments} />
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};
export default DishDetail;
// export class DishDetail extends Component {
//     componentDidMount() {
//         console.log("menu componentDidMount is invoked");
//     }

//     componentDidUpdate() {
//         console.log("menu componentDidUpdate is invoked");
//     }

//     renderDish(dish) {
//         if (dish != null)
//             return (
//                 <Card>
//                     <CardImg top src={dish.image} alt={dish.name} />
//                     <CardBody>
//                         <CardTitle className="font-weight-bold">
//                             {dish.name}
//                         </CardTitle>
//                         <CardText>{dish.description}</CardText>
//                     </CardBody>
//                 </Card>
//             );
//         else return <div></div>;
//     }

//     formatDate({ date }) {
//         return new Date(date).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//         });
//     }

//     renderComments(dish) {
//         if (dish != null) {
//             const comm = dish.comments.map((c) => {
//                 var date = new Date(c.date);

//                 return (
//                     <li key={c.id}>
//                         <p>{c.comment}</p>
//                         <p>
//                             --{c.author},{this.formatDate({ date })}
//                         </p>
//                     </li>
//                 );
//             });
//             return (
//                 <div>
//                     <h4>Comments</h4>
//                     <ul className="list-unstyled">{comm}</ul>
//                 </div>
//             );
//         } else {
//             return <div></div>;
//         }
//     }

//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12 col-md-5 m-1">
//                         {this.renderDish(this.props.dish)}
//                     </div>
//                     <div className="col-12 col-md-5 m-1 ">
//                         {this.renderComments(this.props.dish)}
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
