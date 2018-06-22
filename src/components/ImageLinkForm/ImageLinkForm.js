import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange,onButtonSubmit})=> {
	return(
		<div>
			<p className="f3">{'This app will detect the faces in your pictures. Try it out! '}</p>
			<div className="center">
				<div className="pa4 br3 shadow-5 form center">
					<input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
					<button 
						onClick={onButtonSubmit}
						className="w-30 grow f4 dib link ph3 pv2 white bg-light-blue center">Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;