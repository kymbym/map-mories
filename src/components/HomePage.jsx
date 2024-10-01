import { useState, useEffect, useRef } from "react";
import { APIProvider, Map, MapControl, ControlPosition, AdvancedMarker, useMap, useMapsLibrary, useAdvancedMarkerRef, Pin } from "@vis.gl/react-google-maps";
import AddMarkerForm from "./AddMarkerForm";
import { fetchMarkers } from "../services/api";
import MarkerCard from "./MarkerCard";
import { Box, Button } from "@mui/material";
import EditMarkerForm from "./EditMarkerForm";
import { deleteMarker } from "../services/api";
import { Link } from "react-router-dom";
import '../App.css';

const apiKey = import.meta.env.VITE_API_KEY;

const MapHandler = ({ place, marker }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }

    marker.position = place.geometry?.location;
  }, [map, place, marker]);
  return null;
};

const PlaceAutocomplete = ({ onPlaceSelect, onPlaceSearch }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");
  
  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);
  
  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      <input ref={inputRef} onChange={onPlaceSearch}/>
    </div>
  );
};

const HomePage = () => {

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [markerPositions, setMarkerPositions] = useState([]);
  const [showAddMarkerForm, setShowAddMarkerForm] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [displayMarkerCard, setDisplayMarkerCard] = useState(false);
  const [markerCardData, setMarkerCardData] = useState({ date: null, title: "", description: "" });
  const [showEditMarkerForm, setShowEditMarkerForm] = useState(false);

  const handleMarkerClick = (e) => {
    const position = e.latLng; 
    console.log("clicked")
  
    const clickedLat = position.lat();
    const clickedLng = position.lng();

  const storedMarkerIndex = markerPositions.findIndex(
    marker => marker.lat === clickedLat && marker.lng === clickedLng
  );

  const isStoredMarker = storedMarkerIndex !== -1;

    setCurrentPosition({
      lat: clickedLat,
      lng: clickedLng,
    });

    if (isStoredMarker) {
      const marker = markerPositions[storedMarkerIndex];
        setMarkerCardData({
          date: marker.date,
          title: marker.title,
          description: marker.description,
          lat: marker.lat,
          lng: marker.lng,
          id: marker.id,
          image: marker.image
        })
      setDisplayMarkerCard(true); 
      setShowAddMarkerForm(false); 
      setShowEditMarkerForm(false);
    } else {
      setDisplayMarkerCard(false); 
      setShowAddMarkerForm(true);
      setShowEditMarkerForm(false);
      setMarkerCardData({ date: null, title: "", description: "" });
    }
};

  useEffect(() => {
  const getMarkers = async () => {
    const markers = await fetchMarkers();
    setMarkerPositions(markers);
  };

    getMarkers();
  }, [showAddMarkerForm]);

  const handleMarkerSubmit = () => {
    setShowAddMarkerForm(false);
    setDisplayMarkerCard(false);
    setShowEditMarkerForm(false);
  };

   const handleEdit = () => {
    setShowEditMarkerForm(true);
    setDisplayMarkerCard(false);
  };

  const handleDelete = async (id) => {
     await deleteMarker(id);
     setDisplayMarkerCard(false);
     setMarkerCardData({ date: null, title: "", description: "", lat: 0, lng: 0, id: "" });
     setMarkerPositions((positions) => positions.filter((marker) => marker.id !== id))
  }

  return (
    <>
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: 2,
          }}
        >
          <Link to="/travels/grid" >
            <Button variant="contained"
              sx={{ backgroundColor: "#C576AC", color: "#FFFFFF", fontFamily: "Dunkin", padding: "8px 15px", fontSize: "16px",
                '&:hover': {
                backgroundColor: "#662753" }
               }}>
              Travels Wrapped
            </Button>
          </Link>
        </Box>

      <Box
        sx={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
        }}
      >
      <APIProvider apiKey={apiKey}>
        <Box
      sx={{
        width: "100vw",
        height: "80vh",
        boxShadow: "3px 4px 2px rgba(0,0,0,0.2)",
      }}
    >
        <Map
          mapId={"bf51a910020fa25a"}
          style={{ width: "100%", height: "95%" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={4.5}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        > 
        </Map>
        </Box>
        {markerPositions.map((position) => (
          <AdvancedMarker key={position.id} position={{ lat: position.lat, lng: position.lng }} onClick={(e) => handleMarkerClick(e)}>
            <Pin background={'#81689D'} glyphColor={'#FFD0EC'} borderColor={'#FFD0EC'} scale={1.3}/>
          </AdvancedMarker>
          ))}
        <AdvancedMarker onClick={(e) => handleMarkerClick(e)} ref={markerRef} position={null}> <Pin scale={1.3} background={'#37B7C3'} glyphColor={'#EBF4F6'} borderColor={'#EBF4F6'}/> </AdvancedMarker>
        <MapControl position={ControlPosition.TOP}>
          <div className="autocomplete-control" >
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} onSearchChange={(e) => setSearchValue(e.target.value)} />
          </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} />
      </APIProvider>
      {showAddMarkerForm && <AddMarkerForm location={currentPosition} handleMarkerSubmit={handleMarkerSubmit}/>}
      {displayMarkerCard && <MarkerCard date={markerCardData.date} title={markerCardData.title} description={markerCardData.description} lat={markerCardData.lat} lng={markerCardData.lng} id={markerCardData.id} image={markerCardData.image} handleEdit={handleEdit} handleDelete={handleDelete}/>}
      {showEditMarkerForm && <EditMarkerForm markerCardData={markerCardData} handleMarkerSubmit={handleMarkerSubmit}/>}
  
    </Box>
    </Box>
    </>
  );
};

export default HomePage;