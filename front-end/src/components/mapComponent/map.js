import React from 'react';

import ol from 'openlayers';
import 'ol/ol.css';

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
  }

  render() {
    return <div ref="mapContainer"> </div>;
  }
}
export default Map;
