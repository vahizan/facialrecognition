import React from 'react';
import './Navigation.css'
const Navigation = ({isLoggedIn,onRouteChange}) => {
	return(
		<nav className="navigation">
		   { isLoggedIn
		   ?<p 
				onClick ={()=>{onRouteChange('logout')}}
				className="w-35 shadow-1 pa3 grow dib f3-ns pr3 underline bg-navy  pointer link white mr4">Sign Out</p>
		   :<div>
			<p 
				onClick ={()=>{onRouteChange('login')}}
				className="w-30 shadow-1 pa3 grow dib f3-ns pr3 underline bg-navy  pointer link white mr4">Sign In</p>
			<p 
				onClick ={()=>{onRouteChange('register')}}
				className="w-40 shadow-1 pa3 grow dib f3-ns pr3 underline bg-navy  pointer link white mr4">Register</p>
			</div>
		 }
		</nav>
	);

}

export default Navigation;