import React from 'react';

import ol from 'openlayers';
import 'ol/ol.css';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

export function getMarkersLayer(markersArray){
	var markers = [];
	markersArray.forEach(function(marker) {
	  markers.push(createMarker(marker));
	});
 	
 	return createMarkerLayer(markers);
}

function createMarker(marker){
	console.log(marker.latitude);
	console.log(marker.longitude);

	return new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.fromLonLat([27.587914, 47.151726])),
		name: "6"
	});
}

function createMarkerLayer(markers){
	var colors = ['red', 'green', 'blue', 'black'];
	var iconStyles = [];

	colors.forEach(function(color) {
	  iconStyles.push(new ol.style.Style({
	    image:  new ol.style.Circle({
	        radius: 6,
	        stroke: new ol.style.Stroke({
	            color: '#fff'
	        }),
	        fill: new ol.style.Fill({
	            color: color
	        })
	    })
	  }))
	});

	var labelStyle = new ol.style.Style({
	    text: new ol.style.Text({
	        font: '12px Calibri,sans-serif',
	        overflow: true,
	        fill: new ol.style.Fill({
	            color: '#000'
	        }),
	        stroke: new ol.style.Stroke({
	            color: '#fff',
	            width: 3
	        }),
	        textBaseline: 'bottom',
	        offsetY: -8
	    })
	});

	var vectorSource = new ol.source.Vector({
	  features: markers
	});
	var markerVectorLayer = new ol.layer.Vector({
	  source: vectorSource,
	  style: function(feature) {
	      var name = feature.get('name');
	      var iconStyle = iconStyles[parseInt(name)%colors.length];
	      labelStyle.getText().setText(name);
	      return [iconStyle, labelStyle];
	  }
	});

	return markerVectorLayer;
}
  	





