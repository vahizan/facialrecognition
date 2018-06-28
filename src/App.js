import React, { Component } from 'react';
import './App.css';
import {APP_URL} from './constants.js';
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
//import Clarifai from 'clarifai';

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

/*const app = new Clarifai.App({
 apiKey: 'd055746d4fcd4ab18e84046fcede4474'
});*/

const initialState =  {
      input: '',
      imageUrl: '',
      boxes: [],
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

   boxToPosition = (boundingBox) => (imageWidth,imageHeight) =>{
    return {
        topRow: imageHeight * boundingBox.top_row,
        rightCol: imageWidth - (imageWidth * boundingBox.right_col),
        bottomRow: imageHeight - ( imageHeight * boundingBox.bottom_row),
        leftCol: imageWidth * boundingBox.left_col
    }
  }
  calculateFaceLocation = (data) => {
    //set up an empty array to hold all position objects
    const boxes = [];
    //get image width and height
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height= Number(image.height);
    //get array of bounding boxes
    const clarifaiFaces = data.outputs[0].data.regions;
    //convert each element to bounding box values Object
    clarifaiFaces.forEach((face)=>{
        //get the right bounding box positions obj
        const boundingBox = face.region_info.bounding_box;
        //convert box to css top,right,left,bottom box positions
        const posObj = this.boxToPosition(boundingBox)(width,height);
        //add obj to array
        boxes.push(posObj);
    });
    return boxes;
  }


  faceBounds = (boxes) =>{
    this.setState({boxes});
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
    this.setState({imageUrl: this.state.input});
    console.log('input',this.state.input);
    fetch(`${APP_URL}/imageurl`,{
          method:'post',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({
            imageUrl: this.state.input
          })
    })
    .then(response => response.json())
    .then(response => {
      if(response){
        fetch(`${APP_URL}/image`,{
          method:'put',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify({
            id: this.state.user.id
          })
        }).then(response => response.json())
        .then(entries => {
            if(entries){
              this.setState(Object.assign(this.state.user,{entries}));
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
               <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
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
