import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({imageUrl,box}) => {
	return(
		<div className="FaceRecognition center ma">
			<div className="mt2 absolute">
				<img id="inputImage" alt="" src={imageUrl} width="300px" height="auto" className="center shadow-1 pa3 grow dib f3-ns pr3 underline bg-navy  pointer"/>
				<div className="faceBoundaries " style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);

}

export default FaceRecognition;