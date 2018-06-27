import React , {Component} from 'react';
import {APP_URL} from './../../constants.js';
class Login extends Component{
	constructor(props){
		super(props);
		this.state = {
			loggingInEmail: '',
			loggingInPass:''
		};
	}
	onSubmit = () => {
		const {onRouteChange,loadUser} = this.props;
		const {loggingInEmail,loggingInPass} = this.state;
		fetch(`${APP_URL}/login`,{
			method:'post',
			headers:{'Content-Type': 'application/json' },
			body:JSON.stringify({
				email: loggingInEmail,
				password: loggingInPass
			})
		}).then(response => response.json())
		.then((user)=>{
			if(user.id){
				loadUser(user);
				onRouteChange('home');
			}
		});
	}
	onEmailChange = (event)=> {
		this.setState({loggingInEmail:event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({loggingInPass:event.target.value})
	}
	

	render(){
		const {onRouteChange} = this.props;
		
		return(
		<article className="br2 ba mv4 w-100 w-50-m w-25-l mw5 center shadow-5 bg-navy flex center">
				<main className="pa4 b--light-gray moon-gray">
					  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f4 fw6 ph0 mh0">Sign In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input 
					        	onChange={this.onEmailChange}
					        	className="pa2 input-reset ba bg-moon-gray hover-bg-black hover-white w-100" 
					        	type="email" 
					        	name="email-address"  
					        	id="email-address"/>
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input 
					  			onChange={this.onPasswordChange}
					        	className="b pa2 input-reset ba bg-moon-gray hover-bg-black hover-white w-100" 
					        	type="password" 
					        	name="password"  
					        	id="password"/>
					      </div>
					      <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me </label>
					    </fieldset>
					    <div className="">
					      <input 
					      	  onClick ={this.onSubmit}
						      className="b ph3 pv2 input-reset ba grow pointer black f6 dib" 
						      type="submit" 
						      value="Sign in"/>
					    </div>
					    <div className="lh-copy mt3">
					      <p
					       onClick = {()=> {
					       	onRouteChange('register')
					       }}
					       className="f6 link dim moon-gray db pointer">Register</p>
					      {
					      //<a href="#0" className="f6 link dim moon-gray db">Forgot your password?</a>
					  	  }
					    </div>
					  </div>
				</main>
		</article>
		);
	}
	
}

export default Login;