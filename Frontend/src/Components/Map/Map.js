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
import MapPolygonsFinder from './MapPolygonsFinder';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_ACCESSTOKEN;

const Map = () => {
  const mapContainerRef = useRef(null);
  const [deck, setDeck] = useState(null);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/basic-v9');

  const dispatch = useDispatch();
  const { GetPolygonDetails, SearchPolygons } = bindActionCreators(actionCreators, dispatch);

  const { selectedPolygon, errorDetails, loadingDetails, searchPolygonsResult, successSearch } = useSelector((state) => state.Polygons);

  // MapboxGeocoder is used in this component for search
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    // Other configuration options...
  });

  // we adding map inside Effect triggered by mapStyle to be changed when we change style (style satellite, street, ... etc)
  let centerX = 0;
  let centerY = 0;
  useEffect(() => {
    // Just to help the case of Select Polygon we retrieve from backend one element 
    //so we are trying to make it as array with one element to be unified with the search
    let listRetrived = []
    if (searchPolygonsResult)
      listRetrived = searchPolygonsResult;

    if (selectedPolygon)
      listRetrived = [selectedPolygon];

    if (!mapContainerRef.current) return;

    if (listRetrived && listRetrived.length > 0) {
      let sumPoints = listRetrived
        .flatMap(e => e.area.coordinates[0]) // Flatten the nested arrays
        .reduce(
          (acc, [x, y]) => [acc[0] + x, acc[1] + y],
          [0, 0]
        );
        var count = listRetrived
          .flatMap(e => e.area.coordinates[0]).length
       let center =  sumPoints.map(coordSum => coordSum / count); // Calculate the average
      
      console.log('Calculated Center:', center);

      centerX = center[0];
      centerY = center[1];
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [centerX, centerY],
      bearing: 0,
      pitch: 0,
      zoom: 2,
    });

    if (listRetrived && listRetrived.length > 0) {
      const coordinates = listRetrived.flatMap(e => e.area.coordinates).flatMap(e => e);
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      map.fitBounds(bounds, { padding: 20 });

      map.on('style.load', () => {
        if (listRetrived) {
          const polygons = listRetrived.map(e => e.area.coordinates[0]);

          // Add a new layer for the highlighted polygon
          for (let i = 0; i < listRetrived.length; i++) {
            map.addLayer({
              id: `highlighted-polygon ${i}`,
              type: 'fill',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: {
                    type: 'Polygon',
                    coordinates: [polygons[i]], // Wrap in an array to create a polygon
                  },
                },
              },
              paint: {
                'fill-color': 'blue', // Change the fill color to highlight
                'fill-opacity': 0.5,
              },
            });
          }
        }
      });

    }
    map.addControl(geocoder);
    // Clean up on unmount
    return () => {
      return map.remove();
    };
  }, [mapStyle, selectedPolygon, searchPolygonsResult]);

  // This effect triggered when selected Polygon change or any change for deck,
  // This meanly to redraw new Layer above the map
  // useEffect(() => {
  //   debugger;
  //   let listRetived = null;
  //   if (selectedPolygon)
  //     listRetived = [selectedPolygon];
  //   else if (searchPolygonsResult && searchPolygonsResult.length > 0)
  //     listRetived = searchPolygonsResult;
  //   if (!deck || !listRetived) return;

  //   console.log(selectedPolygon)
  //   // Update the layer data when selectedPolygon changes
  //   var polygonLayers = [];
  //   for (let i = 0; i < listRetived.length; i++) {
  //     polygonLayers.push(new PolygonLayer({
  //       id: 'polygon-layer',
  //       data: [
  //         {
  //           // Simple polygon (array of coords)
  //           contour: listRetived[i].area.coordinates[0],
  //         },
  //       ],
  //       pickable: true,
  //       stroked: true,
  //       filled: true,
  //       lineWidthMinPixels: 10,
  //       getPolygon: (d) => d.contour,
  //       getFillColor: (d) => [20, 255, 120],
  //       getLineColor: [80, 80, 80],
  //       getLineWidth: 1,
  //     }));
  //   }
  //   deck.setProps({
  //     layers: polygonLayers,
  //   });
  // }, [deck, selectedPolygon, searchPolygonsResult]);

  // This callback trigggered when user select polygon from the combobox
  const handlePolygonSelection = (selectedItem) => {
    if (selectedItem)
      GetPolygonDetails(selectedItem);
    else if (deck)
      deck.setProps({ layers: [] });
  };

  const isNumber = (text) => {
    // Using isNaN
    // isNaN returns true if the provided value is NaN (which is the case for non-numeric strings)
    return !isNaN(Number(text));
  };

  const OnPolygonsSearchTriggered = (data) => { debugger
    let coordinatesToSearch = [];
      var coordinates = data.split(',');
      if (coordinates.length != 2 || coordinates.some(e => !isNumber(e.trim()))) {
        alert('Wrong data in search');
        return;
      }
      coordinatesToSearch.push(coordinates.map(e => Number(e.trim())))
    
    var searchData = {
      "points": [
        coordinatesToSearch
      ]
    }
    SearchPolygons(searchData);
  }
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
            target: [centerX, centerY],
          }}
          layers={[]}
        />
      )}
      {/* Adding Polygon Selector component that allow user to select new polygon */}
      <MapPolygonSelector OnItemSelected={handlePolygonSelection} />

      {/* This is the buttons component that use hit to change map style */}
      <MapStyleSelector OnStyleChanged={(s) => setMapStyle(s)} />

      {/* This is the Search in polygon Component  */}
      <MapPolygonsFinder OnSearchInPolygonTriggered={OnPolygonsSearchTriggered}></MapPolygonsFinder>
    </div>
  );
};

export default Map;
