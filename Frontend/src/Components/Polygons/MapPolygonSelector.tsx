import './Map.css';
import Layout from '../Shared/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../State';
import { bindActionCreators } from 'redux';
import { State } from '../../State';
import React, { useEffect } from 'react';

interface Props {
  OnItemSelected: (item: string) => void
}
const MapPolygonSelector = (props: Props) => {
  const dispatch = useDispatch();
  const { GetPolygonNames, GetPolygonDetails } = bindActionCreators(actionCreators, dispatch);
  const { polygonTitles, errorNames, loadingNames } = useSelector((state: State) => state.Polygons);

  // When Component Mounted get Polygons Titles
  useEffect(() => {
    GetPolygonNames();
  }, []);

  const handleSelectionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value != "-1")
      props.OnItemSelected(e.target.value);
    else
      props.OnItemSelected('');
  };

  return (
    <div className='polygon-selector'>
      <select onChange={handleSelectionChanged} className="form-select">
        <option value={-1}>Select Polygon</option>
        {polygonTitles?.map((e, index) => (
          <option key={index} value={e}>
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MapPolygonSelector;
