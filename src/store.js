import React, { Component } from "react";
import logo from "./logo.svg";
// import BlogItem from "./BlogCard";
import classes from "./BlogCard.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      cardData: [],
      cartData: { cartItems: [], cartTotal: 0 },
      price: 0,
      isHovering: false,
    };
    this.add = this.add.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  add = (obj, index) => {
    var itemsArr = this.state.cartData.cartItems;
    if (
      this.state.cartData.cartItems &&
      Object.values(this.state.cartData.cartItems).includes(index)
    ) {
      itemsArr.splice(itemsArr.indexOf(index), 1);
      this.setState({
        cartData: {
          ...this.state.cartData,
          ["cartItems"]: itemsArr,
          ...this.state.cartData,
          ["cartTotal"]: this.state.cartData.cartTotal - obj.price,
        },
      });
    } else {
      itemsArr.push(index);
      this.setState({
        cartData: {
          ...this.state.cartData,
          ["cartItems"]: itemsArr,
          ...this.state.cartData,
          ["cartTotal"]: this.state.cartData.cartTotal + obj.price,
        },
      });
    }
  };

  start = async () => {
    const list = await axios.get(
      "https://fakestoreapi.com/products/category/electronics"
    );
    this.setState({
      cardData: list.data,
    });

    console.log(this.state.cardData);
  };

  componentDidMount() {
    this.start();
  }

  handleMouseHover() {
    this.setState({
      isHovering: !this.state.isHovering,
    });
  }

  render() {
    console.log(this.state.cartData.cartItems);

    const cardData = this.state.cardData.map((obj, index) => {
      return (
        <div className="col-lg-4">
          <div className={`mt-2 ${classes.card}`}>
            <div className="text-center">
              <img
                src={obj.image}
                className="img-thumbnail mt-2 text-center"
                alt="Avatar"
              />
              <div className={classes.container}>
                <h4>
                  <b> {obj.title}</b>
                </h4>
                <p>{obj.price}</p>
                <button
                  type="button"
                  class="btn btn-info "
                  onClick={() => this.add(obj, index)}
                >
                  {this.state.cartData.cartItems &&
                  Object.values(this.state.cartData.cartItems).includes(index)
                    ? "Remove"
                    : "Add"}
                </button>
                <p className="mt-1">{/* <kbd>{obj.quantity}</kbd> */}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
    const cardItems = this.state.cartData.cartItems.map((obj) => {
      return (
        <div>
          <img
            src={this.state.cardData[obj].image}
            className="img-thumbnail mt-4 text-center"
            alt="Avatar"
          />
          {this.state.cardData[obj].title}{" "}
        </div>
      );
    });
    return (
      <div className="container">
        <button
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
          type="button"
          class="btn btn-dark"
        >
          Cart value :{" "}
          {this.state.cartData.cartItems
            ? this.state.cartData.cartItems.length
            : 0}
        </button>
        <button type="button" class="btn btn-grey">
          Price : {this.state.cartData.cartTotal}
        </button>
        {/* <ul class="dropdown"> {cardItems} </ul> */}

        <div className="row mt-5"> {cardData} </div>
        {this.state.isHovering ? (
          <div className={classes.cardItems}> {cardItems} </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;