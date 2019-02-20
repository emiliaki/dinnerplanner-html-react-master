import React, { Component } from "react";
import modelInstance from "../data/DinnerModel";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./Dishdetails.css"

class Dishdetails extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error 
    this.state = {
    status: 'INITIAL',
    dish: this.props.info.match.params.dishId,
    numberOfGuests: modelInstance.getNumberOfGuests()
   
    }
  }

  componentDidMount() {
    this.props.model.addObserver(this);
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getDish(this.state.dish)
      .then(newdish => {
        this.setState({
          status: "LOADED",
          dish: newdish
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }
  
  update() {
    this.setState({
      numberOfGuests: modelInstance.getNumberOfGuests()
    })
  }


  addToMenu =()=> {
    console.log(this.state.dish);
    modelInstance.addDishToMenu(this.state.dish)
    
  }

  render() {

    let dishimage = null;
    let dishtitle = null;
    let preparation = null;
    let ingredients = null;
    let totalprice = null;

    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishimage = <em>Loading...</em>;
        break;
      case "LOADED":
      dishimage = <img id='detailimage' src={this.state.dish.image}/>
      dishtitle = <h3>{this.state.dish.title}</h3>
      preparation = <p id="preparation">{this.state.dish.instructions}</p>
    
      ingredients = this.state.dish.extendedIngredients.map(ing => (
        <div>
            <p>{Math.round(ing.measures.metric.amount * this.state.numberOfGuests)}{ing.measures.metric.unitShort} {ing.originalName}</p>
            <div>{this.state.numberOfGuests} SEK</div>
        </div>  
      ));

      totalprice = Math.round(this.state.dish.pricePerServing * this.state.numberOfGuests); 
        
        
        break;
      default:
        dishimage = <b>Failed to load data, please try again</b>;

        break;
    }


    return (
      <div class="row">

        <div id="row">
          <div className="Sidebardetail">
            <Sidebar model={this.props.model}/>
        
        </div>
        
        
          <div id="DishDetails">
            <h3 id="title">{dishtitle}</h3>
            <ul>{dishimage}</ul>
            <p>{preparation}</p>
            <Link to="/search">
            <button>back to search</button>
            </Link>
          </div>
        
        
          <div id="ingredientscreen">
              <h4>Ingredients for {this.state.numberOfGuests} guests: </h4>
              {ingredients}
              
              <div id="totalprice">Totalprice: {totalprice} SEK</div>
              <Link to="/search">
                <button onClick={this.addToMenu}>Add to Menu</button>
              </Link> 
             
        </div>
          
        </div>
      </div>
    );
  }
}

export default Dishdetails;