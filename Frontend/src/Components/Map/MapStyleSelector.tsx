import { useState } from "react";

interface Props {
  OnStyleChanged: (style: string) => void 
}
// control Buutons on screen that allow user to change map style
const MapStyleSelector = (props: Props) => {
  // Some predefined styles  you can know more details from https://docs.mapbox.com/api/maps/styles/  
  const basicStyle = 'mapbox://styles/mapbox/basic-v9'
  const navigationStyle = 'mapbox://styles/mapbox/navigation-day-v1'
  const darkStyle = 'mapbox://styles/mapbox/dark-v11'
  const streetStyle = 'mapbox://styles/mapbox/streets-v11'
  const satelliteStyle = 'mapbox://styles/mapbox/satellite-streets-v11'

  // Style Change binding
  const [selectedStyle, setSelectedStyle] = useState<string>(basicStyle);
  const handleStyleChange = (style: string) => {
    setSelectedStyle(style)
    // Call parent to do the change on map
    props.OnStyleChanged(style);
  }

  return (
    <div>
      <div className='style-selector-div'>
        <button
          onClick={() => handleStyleChange(basicStyle)}
          className={selectedStyle === basicStyle ? 'map-style-active' : ''}  
        >
          Basic
        </button>
        <button 
          onClick={() => handleStyleChange(navigationStyle)}
          className={selectedStyle === navigationStyle ? 'map-style-active' : ''}
        >
          Navigation
        </button>
        <button 
          onClick={() => handleStyleChange(darkStyle)}
          className={selectedStyle === darkStyle ? 'map-style-active' : ''}
        >
          Dark
        </button>
        <button 
          onClick={() => handleStyleChange(streetStyle)}
          className={selectedStyle === streetStyle ? 'map-style-active' : ''}
        >
          Streets
        </button>
        <button 
          onClick={() => handleStyleChange(satelliteStyle)}
          className={selectedStyle === satelliteStyle ? 'map-style-active' : ''}
        >
          Satellite
        </button>
      </div>
    </div>
  )
}

export default MapStyleSelector