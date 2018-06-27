import React , {Component} from 'react';

class Rank extends Component {
	
	render(){
		const {name,entries} = this.props;
		return(
			<div>
				<div className="ranking white f3">
					{name} {'your current rank is... '}
				</div>
				<div className=" white f1">
					{entries}
				</div>
			</div>
    	);
	}
}
export default Rank;