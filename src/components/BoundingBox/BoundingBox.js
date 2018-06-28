import React, {Component} from 'react';

class BoundingBox extends Component{
	render(){
		const {topRow,rightCol,bottomRow,leftCol} = this.props.box;
		return(
			<div className="faceBoundaries" style= {{top:topRow, right: rightCol, bottom: bottomRow, left: leftCol}} ></div>
		);
	}
}

export default BoundingBox;