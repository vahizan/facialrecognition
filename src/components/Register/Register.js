import React, {Component} from 'react';
import './Register.css';
import {APP_URL} from './../../constants.js';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			errorName:'',
			errorEmail:'',
			errorPass:'',
			errorRetypePass:'',
			registerName:'',
			registerEmail: '',
			registerPass: '',
			registerRetypePass: '' ,
			registerPhone:'',
		};
	}
	
	onNameInput = (event)=> {
		this.setState({registerName:event.target.value});
	}
	onEmailInput = (event)=> {
		this.setState({registerEmail:event.target.value});
	}
	onPasswordInput = (event) => {
		this.setState({registerPass:event.target.value})
	}
	onPasswordRetypeInput = (event) => {
		this.setState({registerRetypePass:event.target.value})
	}
	onPhoneInput = (event)=> {
		this.setState({registerPhone:event.target.value});
	}
	validatePhone = (input,fieldErrorName) => {
		if(!input) return true;
        
	}
	validateField = (input,fieldErrorName) => (validateFn) =>{
		if(!input){
			this.setState({ [fieldErrorName]:input});
		}
		validateFn(input,fieldErrorName);
	}
	onSubmit = () => {
		const {onRouteChange,loadUser} = this.props;
		const {registerName,registerPhone,registerEmail,registerPass} = this.state;
		fetch(`${APP_URL}/register`,{
			method:'post',
			headers:{'Content-Type': 'application/json' },
			body:JSON.stringify({
				name: registerName,
				email: registerEmail,
				password: registerPass,
				phone: registerPhone,
			})
		}).then((response)=> response.json())
		.then((user)=>{
			if(user.id){
				loadUser(user);
				onRouteChange('home');
			}
		});
	}
	render(){
		return(
	   	<article className="br2 ba mv4 w-100 w-50-m w-25-l mw5 center shadow-5 bg-navy flex center">
			<main className="pa4 moon-gray" >
			  <div className="measure ">
			    <fieldset id="register" className="ba b--transparent ph0 mh0 br-2">
			      <legend className="f4 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Full Name</label>
			        <input 
			            onChange = {this.onNameInput}
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="text" 
			        	name="Full Name"  
			        	id="full_name"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	onChange = {this.onEmailInput}
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" 
			        	name="email-address"  
			        	id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	onChange = {this.onPasswordInput}
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" 
			        	name="password"  
			        	id="password"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="retype_password">Retype Password</label>
			        <input 
			            onChange = {this.onPasswordRetypeInput}
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" 
			        	name="retype_password"  
			        	id="retype_password"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="phone">Phone (optional)</label>
			        <input 
			        	onChange = {this.onPhoneInput}
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="tel" 
			        	name="phone"  
			        	id="phone"/>
			      </div>
			      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
			    </fieldset>
			    <div className="">
			      <input 
			      	onClick={this.onSubmit}
			      	id="register_now" 
			      	className="b ph3 pv2 input-reset ba b--moon-gray bg-transparent moon-gray br2 grow pointer f6 dib" 
			      	type="submit" 
			      	value="Register"/>
			    </div>
			  </div>
			</main>
		</article>	);
	}
	
}

export default Register;