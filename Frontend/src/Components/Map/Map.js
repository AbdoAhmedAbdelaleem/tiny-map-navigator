import React, { useRef, useEffect, useState } from 'react';
import DeckGL from 'deck.gl';
import { PolygonLayer } from 'deck.gl';
import './Map.css';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../State';
import { bindActionCreators } from 'redux';
import MapPolygonSelector from './MapPolygonSelector';
import Layout from '../Shared/Layout';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from 'mapbox-gl-geocoder';
import MapStyleSelector from './MapStyleSelector'

mapboxgl.accessToken =process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const [deck, setDeck] = useState(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/basic-v9');

  const dispatch = useDispatch();
  const { GetPolygonDetails } = bindActionCreators(actionCreators, dispatch);

  const { selectedPolygon, errorDetails, loadingDetails } = useSelector((state) => state.Polygons);

  // MapboxGeocoder is used in this component for search
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    // Other configuration options...
  });
  
  // we adding map inside Effect triggered by mapStyle to be changed when we change style (style satellite, street, ... etc)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [0, 0],
      bearing: 0,
      pitch: 0,
      zoom: 1,
    });
    map.addControl(geocoder);
    // Clean up on unmount
    return () => {
      return map.remove();
    };
  }, [mapStyle]);

  // This effect triggered when selected Polygon change or any change for deck,
  // This meanly to redraw new Layer above the map
  useEffect(() => {
    if (!deck || !selectedPolygon) return;

    console.log(selectedPolygon)
    // Update the layer data when selectedPolygon changes
    deck.setProps({
      layers: [
        new PolygonLayer({
          id: 'polygon-layer',
          data: [
            {
              // Simple polygon (array of coords)
              contour: selectedPolygon.area.map(e => [e.x,e.y]),
            },
          ],
          pickable: true,
          stroked: true,
          filled: true,
          lineWidthMinPixels: 1,
          getPolygon: (d) => d.contour,
          getFillColor: (d) => [255, 255, 120],
          getLineColor: [80, 80, 80],
          getLineWidth: 1,
        }),
      ],
    });
  }, [deck, selectedPolygon]);

  // This callback trigggered when user select polygon from the combobox
  const handlePolygonSelection = (selectedItem) => { debugger
    if (selectedItem)
      GetPolygonDetails(selectedItem);
    else if (deck)
      deck.setProps({ layers: []  });
  };

  return (
    <div>
      <Layout />
      <div className='map-container' ref={mapContainerRef} />
       {/* Add the MapboxGeocoder component */}
      {!errorDetails && !loadingDetails && (
        <DeckGL
          ref={(ref) => setDeck(ref && ref.deck)}
          className='deck-gl-container'
          controller={false}
          style={{ position: 'absolute', top: '0', left: '0', zIndex: '0', pointerEvents: 'none' }}
          initialViewState={{
            longitude: 0,
            latitude: 0,
            zoom: 1,
            pitch: 0,
            bearing: 0,
          }}
          layers={[]}
        />
      )}
      {/* Adding Polygon Selector component that allow user to select new polygon */}
      <MapPolygonSelector OnItemSelected={handlePolygonSelection} />

      {/* This is the buttons component that use hit to change map style */}
      <MapStyleSelector OnStyleChanged={(s) => setMapStyle(s)} />
    </div>
  );
};

export default Map;
