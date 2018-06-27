import React, { Component } from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
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

const initialState =  {
      input: '',
      imageUrl: '',
      box: {},
      route: 'login',
      isLoggedIn: false,
      user:{
        id:'',
        name:'',
        email:'',
        entries: 0,
        joined: ''
      }
  }
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) =>{
    const {id,name,email,entries,joined} = data;
    this.setState({user:{
        id,
        name,
        email,
        entries,
        joined
    }});
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

  onRouteChange = (route) =>{
      if(route === 'logout'){
           this.setState(initialState);
      }else if(route === 'home'){
        this.setState({isLoggedIn:true});
      }
      this.setState({route: route});
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,  this.state.input)
    .then(response => {
      if(response){
        fetch("http://localhost:3000/image",{
          method:'put',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json())
        .then(entries => {
            if(entries){
              this.setState(Object.assign(this.state.user,{entries}));
              console.log('user',entries);
            }
        });
      }
      this.faceBounds(this.calculateFaceLocation(response))
    })
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
          <Navigation isLoggedIn={this.state.isLoggedIn} onRouteChange={this.onRouteChange}/>

          {this.state.route === 'home'
          ?  <div>
              <Logo/>
              <Rank entries={this.state.user.entries} name = {this.state.user.name}/>
              <ImageLinkForm 
                  onButtonSubmit={this.onButtonSubmit}
                  onInputChange={this.onInputChange}/>
               <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          : (
            this.state.route === 'login'

            ? <Login loadUser={this.loadUser} onRouteChange={ this.onRouteChange }/> 
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )

          }
  
          </div>
      </div>
    );
  }
}

export default App;
