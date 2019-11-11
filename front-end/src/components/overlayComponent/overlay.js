import React from 'react';
import Autocomplete from  'react-autocomplete';
import {getMarkersLayer} from '../mapComponent/markerLayer.js';

class Overlay extends React.Component {

 constructor(props) {
    super(props);
    this.state = { 
		value: '' ,
		items: [],
		map : null
	};
  }

componentWillReceiveProps(props) {
    this.setState({
    	map: props.map
    });
  }

	async onChangeHandler(event, value){
		if(this.state.value !== "" && value === ""){
			this.setState({ items: [] });
		}

	 	this.setState({value});
	 	var promise = await fetch(`https://places.cit.api.here.com/places/v1/autosuggest?at=47.151726,27.587914&q=${this.state.value}&app_id=eiPUTOVjxY1rwovi7Kwi&app_code=obXES72dtgrH1PgkTGNWNQ`);
		var promiseResult = await promise.json();
		this.setState({ items: promiseResult.results });
		console.log(promiseResult);	
	}

	onSelectHandler(value, item){
		debugger
		this.setState({ value });
		let markersArray = [
		{
    	'latitude': item.position[0],
    	'longitude': item.position[1],
    	'name': item.title
    	}];

		var markerLayer = getMarkersLayer(markersArray);
		this.state.map.addLayer(markerLayer);

	}

	render() {
    return <div className="overlay">
    			<div className="autocompleteComponent">
		    		<Autocomplete
			          value={ this.state.value }
			          inputProps={{ id: 'states-autocomplete' }}
			          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
			          items={ this.state.items }
			          getItemValue={ item => item.title }
			          onChange={(event, value) => this.onChangeHandler(event, value) }
			          onSelect={(value, item) => this.onSelectHandler(value, item) }
			          renderMenu={ children => (
			            <div className = "menu">
			              { children }
			            </div>
			          )}
			          renderItem={ (item, isHighlighted) => (
			            <div
			              className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
			              key={ item.id } >
			              { item.title }
			            </div>
			          )}
			        />  
    			</div>
    	</div>;
  }
}
export default Overlay;
