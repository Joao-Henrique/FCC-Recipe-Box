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
          <h1>The Best Recipes In Town</h1>
          <div className="col-md-6 projectSection">

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
          <div class="col-md-6 information">
            <h2>Project description:</h2>
            <h5>JavaScript Calculator is a Project made for
              <a href="https://www.freecodecamp.org/" target="blank">FreeCodeCamp's</a>
              FrontEnd Certification using HTML, CSS, jQuery and JavaScript. You can use it
              like you would use a normal calculator.
            </h5>
            <h2>Project date:</h2>
            <h5>March 2017</h5>
          </div>
        </div>
        <footer>
          <div class=" footer row ">
            <div class="col-md-6 socialFooter ">
              <ul class="social-network social-circle ">
                <li class="separatorHidden">
                  <a class="socialIcon">
                    <i>|</i>
                  </a>
                </li>

                <li>
                  <a
                    class="socialIcon "
                    href="https://joao-henrique.github.io/JH-Portfolio/"
                    target="blank"
                    title="Portfolio">
                    <i class="fa fa-home "></i>
                  </a>
                </li>

                <li>
                  <a
                    class="socialIcon "
                    href="https://www.facebook.com/ljoaohenriquel "
                    target="blank"
                    class="icoFacebook
                    "
                    title="Facebook ">
                    <i class="fa fa-facebook "></i>
                  </a>
                </li>

                <li>
                  <a
                    class="socialIcon "
                    href="https://www.linkedin.com/feed/?trk="
                    target="blank"
                    class=" icoLinkedin "
                    title="Linkedin ">
                    <i class="fa fa-linkedin "></i>
                  </a>
                </li>

                <li>
                  <a
                    class="socialIcon "
                    href="https://codepen.io/Joao_Henrique/"
                    target="blank"
                    title="Codepen ">
                    <i class="fa fa-codepen "></i>
                  </a>
                </li>

                <li>
                  <a
                    class="socialIcon "
                    href="https://glitch.com/@Joao-Henrique"
                    target="blank"
                    title="Glitch ">
                    <i class="fa fa-rocket "></i>
                  </a>
                </li>

                <li>
                  <a
                    class="socialIcon "
                    href="https://github.com/Joao-Henrique "
                    target="blank"
                    class="icoGithub "
                    title="Github ">
                    <i class="fa fa-github "></i>
                  </a>
                </li>
                <li class="separator">
                  <a class="socialIcon">
                    <i>|</i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-6 authorFooter ">
              <h6>&copy João Henrique 2017</h6>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;