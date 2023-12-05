interface Props {
    OnSearchInPolygonTriggered: (text: string) => void 
}
const MapPolygonsFinder = (props: Props) => {

    const handleKeyDown = (event:React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            const inputValue = (event.target as HTMLInputElement).value;
            props.OnSearchInPolygonTriggered(inputValue);
        }
    }
    return (
        <div className='search-polygons'>
          <input type="text"  onKeyDown={handleKeyDown} placeholder="Search in Polygons by writing point seperate by Comma.  X,Y "/>
        </div>
      );
}

export default MapPolygonsFinder