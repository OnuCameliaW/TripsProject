import React from 'react';
import {getMarkersLayer} from './markerLayer.js';
import {getRouteLayer} from './routeLayer.js';
import Overlay from '../overlayComponent/overlay.js';


import ol from 'openlayers';
import 'ol/ol.css';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';


class Map extends React.Component {

constructor(props) {
    super(props);
    this.state = { 
		map: null,
	    featuresLayer: null
	};
  }

	componentDidMount() {
    var featuresLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features:[],
      })
    });

    var map = new ol.Map({
      target: this.refs.mapContainer,
      layers: [
		new ol.layer.Tile({
		  source: new ol.source.OSM()
		}),
        featuresLayer
      ],
		view: new ol.View({
		      center: ol.proj.fromLonLat([27.587914,47.151726]),
		      zoom: 8
		    })
    });

	this.setState({ 
	      map: map,
	      featuresLayer: featuresLayer
	    });
   }

  async componentDidUpdate(prevProps, prevState) {
    this.state.featuresLayer.setSource(
      new ol.source.Vector({
        features: this.props.routes
      })
    );

    var markersArray = [
    	{
    	'latitude': 47.151726,
    	'longitude': 27.587914,
    	'name': 'Iasi'
    	},
    	{
    	'latitude': 46.7712,
    	'longitude': 23.6236,
    	'name': 'Cluj'
    	}
    ];


	var markerLayer = getMarkersLayer(markersArray);

	var routeLayer = await getRouteLayer(markersArray);

	this.state.map.addLayer(markerLayer);
    this.state.map.addLayer(routeLayer);

	//this.state.map.getView().fit(markerVectorLayer.getSource().getExtent(), this.state.map.getSize());
  }

  render() {
    return <div>
		    	<Overlay 
		    		map = {this.state.map}
		    	/>
		    	<div ref="mapContainer"> </div>
    	</div>;
  }
}
export default Map;
