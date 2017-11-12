import React, {Component} from "react";
import logo from "../img/logo.svg";
import "../styles/App.css";
import Accordion from "react-bootstrap/lib/Accordion";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Modal from "react-bootstrap/lib/Modal";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar"

class App extends Component {

  state = {
    recipes: [],
    showEdit: false,
    showAdd: false,
    currentIndex: 0,
    newestRecipe: {
      recipeName: "",
      ingredients: []
    }
  }

  // OPEN MODAL FUNCTION
  open = (state, currentIndex) => {
    this.setState({[state]: true});
    this.setState({currentIndex});
  }

  // CLOSE MODAL FUNCTION
  close = () => {
    if (this.state.showAdd) {
      this.setState({showAdd: false})
    } else if (this.state.showEdit) {
      this.setState({showEdit: false})
    }
  }

  // SAVE NEW RECIPE FUNCTION
  saveNewRecipe() {
    let recipes = this
      .state
      .recipes
      .slice();
    recipes.push({recipeName: this.state.newestRecipe.recipeName, ingredients: this.state.newestRecipe.ingredients});
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({recipes});
    this.setState({
      newestRecipe: {
        recipeName: "",
        ingredients: []
      }
    })
    this.close();
  }

  // DELETE RECIPE FUNCTION
  deleteRecipe(index) {
    let recipes = this.state.recipes;
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({recipes});
  }

  // UPDATE NEWEST RECIPE FUNCTION
  updateNewRecipe(recipeName, ingredients) {
    this.setState({
      newestRecipe: {
        recipeName: recipeName,
        ingredients: ingredients
      }
    });
  }

  // UPDATE EDITED RECIPE NAME FUNCTION
  updateRecipeName(recipeName, currentIndex) {
    let recipes = this
      .state
      .recipes
      .slice();
    recipes[currentIndex] = {
      recipeName: recipeName,
      ingredients: recipes[currentIndex].ingredients
    };
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({recipes});
  }

  // UPDATE EDITED INGREDIENTS FUNCTION
  updateIngredients(ingredients, currentIndex) {
    let recipes = this
      .state
      .recipes
      .slice();
    recipes[currentIndex] = {
      recipeName: recipes[currentIndex].recipeName,
      ingredients: ingredients
    };
    localStorage.setItem("recipes", JSON.stringify(recipes));
    this.setState({recipes});
  }

  /////////////////////////////////////////////////////////////

  componentWillMount() {
    this.setState({
      recipe: {
        recipeName: "Bolonhesa",
        ingredients: ["one", "two", "thre"]
      }
    })
  }

  componentDidMount() {
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    this.setState({recipes});
    console.log(recipes);
    console.log(this.state);
  }

  //////////////////////////////////////////////////////////////////////
  render() {
    const {recipes, newestRecipe, currentIndex} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2 className="App-title">FCC Recipe Box by João Henrique</h2>
        </header>

        <div className=" row">
          <div className="col-md-6 projectSection">
            <h1>The Best Recipes In Town</h1>

            {/* ACCORDION FOR THE STORED RECIPES */}
            <div class="wraper">
              <Accordion className="accordion">
                {recipes.map((recipe, index) => (
                  <Panel
                    className="panel"
                    header={recipe.recipeName}
                    eventKey={index}
                    key={index}>
                    <div>
                      <h4>Ingredients:</h4>
                      {recipe
                        .ingredients
                        .map((ingredient, index) => (
                          <div className="list-group-item" key={index}>
                            {ingredient}
                          </div>
                        ))}
                    </div>
                    <ButtonToolbar>
                      <Button bsStyle="danger" onClick={(event) => this.deleteRecipe(index)}>Delete Recipe</Button>
                      <Button bsStyle="warning" onClick={(event) => this.open("showEdit", index)}>Edit Recipe</Button>
                    </ButtonToolbar>
                  </Panel>
                ))}
              </Accordion>
            </div>

            {/* MODAL TO EDIT RECIPE */}
            <Modal show={this.state.showEdit} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={localStorage.recipes[currentIndex].recipeName}
                    placeholder="Enter recipe name"
                    onChange={(event) => this.updateRecipeName(event.target.value, currentIndex)}></FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl
                    type="textarea"
                    value={recipes.ingredients}
                    componentClass="textarea"
                    onChange={(event) => this.updateIngredients(event.target.value.split(","), currentIndex)}></FormControl>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="success" onClick={(event) => this.saveNewRecipe()}>Save Recipe</Button>
                <Button bsStyle="danger" onClick={(event) => this.close()}>Cancel</Button>
              </Modal.Footer>
            </Modal>

            {/* MODAL TO ADD NEW RECIPE */}
            <Modal show={this.state.showAdd} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Add Recipe</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Recipe Name</ControlLabel>
                  <FormControl
                    type="text"
                    value={newestRecipe.recipeName}
                    placeholder="Enter recipe name"
                    onChange={(event) => this.updateNewRecipe(event.target.value, this.state.ingredients)}></FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Ingredients</ControlLabel>
                  <FormControl
                    type="textarea"
                    value={newestRecipe.ingredients}
                    placeholder='Enter ingredients separated by ","'
                    onChange={(event) => this.updateNewRecipe(newestRecipe.recipeName, event.target.value.split(","))}></FormControl>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="success" onClick={(event) => this.saveNewRecipe()}>Save Recipe</Button>
                <Button bsStyle="danger" onClick={(event) => this.close()}>Cancel</Button>
              </Modal.Footer>
            </Modal>
            <Button
              bsStyle="success"
              onClick={(event) => this.open("showAdd", currentIndex)}>Add New Recipe</Button>
          </div>
          <div className="col-md-6">
            <div className="aboutSection">
              <h1>About this project</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;