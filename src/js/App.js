import React, {Component} from "react";
import logo from "../img/logo.svg";
import "../styles/App.css";
import Accordion from "react-bootstrap/lib/Accordion";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import ReactModal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar"

class App extends Component {

  state = {
    recipes: [
      {
        recipeName: "Bolonhesa",
        ingredients: ["Massa", "Molho de tomate", "Carne"]
      }, {
        recipeName: "Pizza",
        ingredients: ["Queijo", "Molho de tomate", "Fiambre"]
      }, {
        recipeName: "Canelones",
        ingredients: ["Massa", "Molho de tomate", "Carne"]
      }
    ]
  }

  render() {
    const {recipes} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">FCC Recipe Box by João Henrique</h1>
        </header>

        <div className="container">
          <Accordion>
            {recipes.map((recipe, index) => (
              <Panel header={recipe.recipeName} eventKey={index} key={index}>
                <ol>
                  {recipe
                    .ingredients
                    .map((ingredient, index) => (
                      <li key={index}>
                        {ingredient}
                      </li>
                    ))}
                </ol>
                <ButtonToolbar></ButtonToolbar>
              </Panel>
            ))}
          </Accordion>
        </div>
      </div>
    );
  }
}

export default App;