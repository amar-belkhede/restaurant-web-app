import React, { Component } from "react";
import { actions } from "react-redux-form";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponents";
import Contact from "./ContactComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { addComment, fetchDishes } from "../redux/ActionCreators";
import {
    // addComment,
    postComment,
    fetchDishes,
    fetchComments,
    fetchPromos,
    fetchLeaders,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    // addComment: (dishId, rating, author, comment) =>
    //     dispatch(addComment(dishId, rating, author, comment)),
    postComment: (dishId, rating, author, comment) =>
        dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {
        dispatch(fetchDishes());
    },
    resetFeedbackForm: () => {
        dispatch(actions.reset("feedback"));
    },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    // addComment: (dishId, rating, author, comment) =>
    //     dispatch(addComment(dishId, rating, author, comment)),
    // fetchDishes: () => {
    //     dispatch(fetchDishes());
    // },
    // resetFeedbackForm: () => {
    //     dispatch(actions.reset("feedback"));
    // },
});

export class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    // onDishSelect(dish) {
    //     this.setState({ selectedDish: dish });
    // }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) => dish.featured
                        )[0]
                    }
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={
                        this.props.promotions.promotions.filter(
                            (promo) => promo.featured
                        )[0]
                    }
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
                    leader={
                        this.props.leaders.leaders.filter(
                            (leader) => leader.featured
                        )[0]
                    }
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess}
                />
            );
        };
        const DishWithId = ({ match }) => {
            return (
                <DishDetail
                    dish={
                        this.props.dishes.dishes.filter(
                            (dish) =>
                                dish.id === parseInt(match.params.dishId, 10)
                        )[0]
                    }
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter(
                        (comment) =>
                            comment.dishId === parseInt(match.params.dishId, 10)
                    )}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                    // addComment={this.props.addComment}
                />
            );
        };
        const ContactPage = () => {
            return <Contact />;
        };
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route
                        path="/aboutus"
                        component={() => (
                            <About
                                leaders={this.props.leaders.leaders}
                                leaderLoading={this.props.leaders.isLoading}
                                leaderErrMess={this.props.leaders.errMess}
                            />
                        )}
                    ></Route>
                    <Route
                        exact
                        path="/menu"
                        component={() => <Menu dishes={this.props.dishes} />}
                    />
                    <Route
                        exact
                        path="/contactus"
                        component={() => (
                            <Contact
                                resetFeedbackForm={this.props.resetFeedbackForm}
                            />
                        )}
                    />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Redirect to="/home" />
                </Switch>
                {/* <Menu
                    dishes={this.state.dishes}
                    onClick={(dishId) => this.onDishSelect(dishId)}
                />
                <DishDetail
                    dish={
                        this.state.dishes.filter(
                            (dish) => dish.id === this.state.selectedDish
                        )[0]
                    }
                /> */}
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
