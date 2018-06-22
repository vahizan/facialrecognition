import React from 'react';
import './Navigation.css'
const Navigation = ({onLoginChange}) => {
	return(
		<nav className="navigation">
			<p 
				onClick ={()=>{onLoginChange('login')}}
				className="w-25 shadow-1 pa3 grow dib f3-ns pr3 underline bg-navy  pointer link white mr4">Sign Out</p>
		</nav>
	);

}

export default Navigation;