import React, { Component } from "react";
import logo from './logo.svg';
import BlogItem from "./BlogCard";
import classes from "./BlogCard.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTitle: false,
      cardData: [],
      cardData1: [],
      category: [],
      opt : 'Ordinary_Drink'
    };
    this.hideList = this.hideList.bind(this);
    this.handle = this.handle.bind(this);
    this.start = this.start.bind(this);
  }
  


  handle = (event) => {
    if(event.target.value === '')
    {
      this.setState({
        num: this.state.num
      },()=>{this.hideList();});

    }
    else
    {
    this.setState({
      num: event.target.value
    },()=>{this.hideList();});
  }

  }  


  hideList = async () => {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?f="+this.state.num);
    
    this.setState({
      cardData: response.data.drinks,
      //num: this.name.value
    });
  };


  DropMenu = (event) => {
      this.setState({
      opt : event.target.value
    },()=>this.handleDrop());
  };

  start = async() =>{
    // const resp = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
    // this.setState({
    //   cardData : resp.data.drinks
    // });
    const list = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
    this.setState({
      category : list.data.drinks
    })
  };


  handleDrop = async()=>{
    let response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+this.state.opt);
    this.setState({
      cardData1: response.data.drinks
    })
  }


 

  componentDidMount() {
    this.hideList();
    this.start();
  }


  render() {
    // console.log('Title State', this.state.showTitle);
    const category =  this.state.category.map((obj)=>{
      return(
  <option value={obj.strCategory}>{obj.strCategory}</option>
      )
    })
    const userCard = this.state.cardData.map((obj) => {
      return (
        <div className="col-lg-4">
        <div className={classes.card + ' text-center'}>
          <img src={obj.strDrinkThumb} className="img-thumbnail mt-2 text-center" alt="Avatar" />
          <div className={classes.container}>
            <h4>
              <b>
                
                  {obj.strDrink}
              
              </b>
            </h4>
            <p>{obj.strCategory}</p>
          </div>
        </div>
        </div>
      
      );
    });
    
    const cardData1 = this.state.cardData1.map((obj)=>{
      return (

        <div className="col-lg-4">
        <div className= "text-center ">
          <img src={obj.strDrinkThumb} className="img-thumbnail mt-2 text-center" alt="Avatar" />
          <div className={classes.container}>
            <h4>
              <b> {obj.strDrink}</b>
            </h4>
          </div>
        </div>
        </div>
        
      ); 
    })
    return (
      <div className="container">
  <select id = "dropdown" onChange={this.DropMenu}> {category} </select>

      <form>
        <label htmlFor="Drinks">Search Drink:-</label>
        <input type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" placeholder="Enter Drink " onChange ={this.handle}/>
      </form>
          <div className="row"> {cardData1} </div>
          </div>
      
    );  
   
  }
}

export default App;

