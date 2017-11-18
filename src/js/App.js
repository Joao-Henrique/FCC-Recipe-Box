import React, {Component} from "react";
import logo from "../img/logo.svg";
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
          <h1>The Best Recipes In Town</h1>
          <div className="col-md-6 projectSection">

            {/* ACCORDION FOR THE STORED RECIPES */}
            <div className="wraper">
              <h3>Recipe Box</h3>
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
                    value={this.state.recipes.recipeName}
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
                <Button bsStyle="success" onClick={(event) => this.saveNewRecipe()}>Save</Button>
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
              className="addNewRecipeButton"
              bsStyle="success"
              onClick={(event) => this.open("showAdd", currentIndex)}>Add New Recipe</Button>
          </div>

          {/* PROJECT DESCRIPTION */}
          <div className="col-md-6 information">
            <h2>Project description:</h2>
            <h5>Recipe Box is a Project made for
              <a href="https://www.freecodecamp.org/" target="blank">FreeCodeCamp's</a>
              Data Visualization Certification using React. You can add, edit and delete
              recipes. The recipes are stored in the browser's local storage so you can
              restart the browser and they won't disapear.
            </h5>
            <h2>Project date:</h2>
            <h5>November 2017</h5>
          </div>
        </div>

        {/* FOOTER */}
        <footer>
          <div className=" footer row ">
            <div className="col-md-6 socialFooter ">
              <ul className="social-network social-circle ">
                <li className="separatorHidden">
                  <a className="socialIcon">
                    <i>|</i>
                  </a>
                </li>
                {/* PORTFOLIO */}
                <li>
                  <a
                    className="socialIcon "
                    href="https://joao-henrique.github.io/JH-Portfolio/"
                    target="blank"
                    title="Portfolio">
                    <i className="fa fa-home "></i>
                  </a>
                </li>
                {/* FACEBOOK */}
                <li>
                  <a
                    className="socialIcon "
                    href="https://www.facebook.com/ljoaohenriquel "
                    target="blank"
                    title="Facebook ">
                    <i className="fa fa-facebook "></i>
                  </a>
                </li>
                {/* LINKEDIN */}
                <li>
                  <a
                    className="socialIcon "
                    href="https://www.linkedin.com/feed/?trk="
                    target="blank"
                    title="Linkedin ">
                    <i className="fa fa-linkedin "></i>
                  </a>
                </li>
                {/* CODEPEN */}
                <li>
                  <a
                    className="socialIcon "
                    href="https://codepen.io/Joao_Henrique/"
                    target="blank"
                    title="Codepen ">
                    <i className="fa fa-codepen "></i>
                  </a>
                </li>
                {/* GLITCH */}
                <li>
                  <a
                    className="socialIcon "
                    href="https://glitch.com/@Joao-Henrique"
                    target="blank"
                    title="Glitch ">
                    <i className="fa fa-rocket "></i>
                  </a>
                </li>
                {/* GITHUB */}
                <li>
                  <a
                    className="socialIcon "
                    href="https://github.com/Joao-Henrique "
                    target="blank"
                    title="Github ">
                    <i className="fa fa-github "></i>
                  </a>
                </li>
                {/* STACK OVERFLOW */}
                <li>
                  <a
                    className="socialIcon "
                    href="https://github.com/Joao-Henrique "
                    target="blank"
                    title="Stack Overflow ">
                    <i class="fa fa-stack-overflow "></i>
                  </a>
                </li>
                <li className="separator">
                  <a className="socialIcon">
                    <i>|</i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 authorFooter ">
              <h6>
                <i className="fa fa-copyright "></i>
                João Henrique 2017</h6>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;