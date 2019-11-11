import React from 'react';

import ol from 'openlayers';
import 'ol/ol.css';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

export async function getRouteLayer(){
	const promise = await fetch('https://route.api.here.com/routing/7.2/calculateroute.json?waypoint0=47.1517%2C27.5879&waypoint1=46.7712%2C23.6236&mode=fastest%3Bcar%3Btraffic%3Aenabled&app_id=eiPUTOVjxY1rwovi7Kwi&app_code=obXES72dtgrH1PgkTGNWNQ&departure=now');
    var test = await promise.json();
    //console.log(test);
    if(test != null){
    	var markersArray = test.response.route[0].leg[0].maneuver;
    	//console.log(markersArray);
		var markers = [];
		markersArray.forEach(function(marker) {
			markers.push(ol.proj.transform([marker.position.longitude, marker.position.latitude], 'EPSG:4326',   'EPSG:3857'));
		});
 	return createRouteLayer(markers);
    }
	return null;
}

function createRouteLayer(markers){

	var routeVectorLayer = new ol.layer.Vector({
	    source: new ol.source.Vector({
	        features: [new ol.Feature({
	            geometry: new ol.geom.LineString(markers, 'XY'),
	            name: 'Line'
	        })]
	    }),
	    style: new ol.style.Style({
	        stroke: new ol.style.Stroke({
	          width: 4, color: [20, 20, 20, 0.8]
	        })
      })
	});

	return routeVectorLayer;
}