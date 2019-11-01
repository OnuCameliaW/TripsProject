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

function createMarkerLayer(markers){

	var labelStyle = createLabelStyle();

	var vectorSource = new ol.source.Vector({
	  features: markers
	});
	var markerVectorLayer = new ol.layer.Vector({
	  source: vectorSource,
	  style: function(feature) {
	      var labelName = feature.get('name');
	      var iconStyle = createIconStyle();
	      labelStyle.getText().setText(labelName);
	      return [iconStyle, labelStyle];
	  }
	});

	return markerVectorLayer;
}

function createMarker(marker){
	return new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.fromLonLat([marker.longitude, marker.latitude])),
		name: marker.name
	});
}

function createIconStyle(){
	return new ol.style.Style({
	    image:  new ol.style.Circle({
	        radius: 6,
	        stroke: new ol.style.Stroke({
	            color: '#fff'
	        }),
	        fill: new ol.style.Fill({
	            color: 'red'
	        })
	    })
	  });
}

function createLabelStyle(){
	return new ol.style.Style({
	    text: new ol.style.Text({
	        font: '22px Calibri,sans-serif',
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
}
  	





