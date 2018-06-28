import React from 'react';
import './FaceRecognition.css'
import BoundingBox from './../BoundingBox/BoundingBox'
const FaceRecognition = ({imageUrl,boxes}) => {
	return(
		<div className="FaceRecognition center ma">
			<div className="mt2 absolute">
				<img id="inputImage" alt="processing detection" src={imageUrl} width="300px" height="auto" className="center shadow-1 pa3 grow dib f3-ns pr3 underline bg-navy  pointer"/>
				{
					boxes.map((box,i)=>{
						return <BoundingBox key={i} box={box}/>
					})
				}
			</div>
		</div>
	);

}

export default FaceRecognition;