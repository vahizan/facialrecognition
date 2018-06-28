import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './../../face-recognition.png';
const Logo = () => {
	return(
		<div className="ma4 mt0 flex items-center">
			<Tilt className="Tilt br2 shadow-2 " options={{ max : 25 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner"><img className="pt3" src={logo} alt="face-recognition logo" style={{height:100,width:75}}/> </div>
			</Tilt>
		</div>
	);
}

export default Logo;