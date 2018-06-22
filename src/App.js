import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Login from "./components/Login/Login";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const particlesConfig = {
      particles: {
          number: {
            value: 30,
            density:{
              enable:true,
              value_area: 800
            }
          }
      }
}

const app = new Clarifai.App({
 apiKey: 'd055746d4fcd4ab18e84046fcede4474'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'login'
    }
  }
  calculateFaceLocation = (data)=> {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log("clarifaiFace",clarifaiFace);
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height= Number(image.height);
    console.log(width,height); 
    return {
        topRow: height * clarifaiFace.top_row,
        rightCol: width - (width * clarifaiFace.right_col),
        bottomRow: height - ( height * clarifaiFace.bottom_row),
        leftCol: width * clarifaiFace.left_col
    }
  }

  faceBounds = (box) =>{
    this.setState({box});
  }
  onInputChange = (event) =>{
    this.setState({input:event.target.value});
  }

  onLoginChange = (route) =>{
      this.setState({route});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,  this.state.input)
    .then(response => this.faceBounds(this.calculateFaceLocation(response)))
    .catch(error => console.log("error",error));  
  }

  render() {
    return (
      <div className="App">
        <div>
          <Particles 
                className = "particles"
                params={particlesConfig}
           />
          <Navigation onLoginChange={this.onLoginChange}/>
          {this.state.route === 'login'
          ?  <Login onLoginChange={ this.onLoginChange }/>
          : <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm 
                  onButtonSubmit={this.onButtonSubmit}
                  onInputChange={this.onInputChange}/>
               <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          }
  
          </div>
      </div>
    );
  }
}

export default App;
