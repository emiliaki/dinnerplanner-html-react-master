import React, { Component } from "react";
import "./Sidebar.css";
import modelInstance from "../data/DinnerModel";


class Sidebar extends Component {
  constructor(props) {
    super(props);
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
      
    };
  }

  
  
  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }


  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    });
  }



  render() {
    return (
      <div id="Sidebar">
        <h3>My dinner</h3>
        <p>
          People:
          <input
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
          <br />
          Total number of guests: {this.state.numberOfGuests}
        </p>
        <div> Menu: {modelInstance.getFullMenu().map(dish =>
          <p> {dish.title}</p>
          )}
          </div>
      </div>
    );
  }
}

export default Sidebar;
