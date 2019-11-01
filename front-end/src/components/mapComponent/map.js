import React from 'react';
import {getMarkersLayer} from './markerLayer.js';

import ol from 'openlayers';
import 'ol/ol.css';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';


class Map extends React.Component {
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

  componentDidUpdate(prevProps, prevState) {
    this.state.featuresLayer.setSource(
      new ol.source.Vector({
        features: this.props.routes
      })
    );

    //this.state.map.addLayer(markerVectorLayer);
    var markersArray = [
    	{
    	'latitude': 23.87,
    	'longitude': 45.66,
    	'name': 'Iasi'
    	}
    ];


	var markerVectorLayer = getMarkersLayer(markersArray);
	this.state.map.addLayer(markerVectorLayer);
	//this.state.map.getView().fit(markerVectorLayer.getSource().getExtent(), this.state.map.getSize());
  }

  render() {
    return <div ref="mapContainer"> </div>;
  }
}
export default Map;
