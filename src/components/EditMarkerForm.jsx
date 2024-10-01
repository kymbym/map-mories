import { updateMarker } from "../services/api";
import { useState, useEffect } from "react";
import { Typography, TextField, Button, Card } from "@mui/material";
import '../App.css';

const EditMarkerForm = ({ markerCardData, handleMarkerSubmit }) => {

  const { lat, lng, title, description, date, id } = markerCardData;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDate, setNewDate] = useState(date);
  
useEffect(() => {
    if (markerCardData) {
      setNewTitle(title);
      setNewDescription(description);
      setNewDate(date);
      console.log("marker id", id);
    }
  }, [markerCardData]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedData = {
      date: newDate,
      title: newTitle,
      description: newDescription,
      lat: lat,
      lng: lng,
    };

    try {
      const result = await updateMarker(id, updatedData);

      if (result) {
        alert("marker updated");
        handleMarkerSubmit();
      } else {
        alert("failed to update marker");
      }
    } catch (error) {
      console.error("error updating marker", error);
  };

  return (
    <>
    <Card
      component="form"
      onSubmit={handleEdit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 5,
        marginRight: 2,
        marginLeft: 4,
        border: "1px solid #ccc",
        width: "100%", 
        maxWidth: "300px", 
        height: "auto",
        maxHeight: "350px", 
        justifyContent: "center",
        alignContent: "center",
        boxShadow: "3px 4px 2px rgba(0,0,0,0.2)",
        backgroundColor: "#EEBEE3",
        borderRadius: 3,
      }}
    >
      <Typography sx={{ color: "#662753", fontFamily: "Dunkin" }} variant="h6">EDIT MARKER</Typography>
      <input type="date"onChange={(e) => setNewDate(e.target.value)} sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          marginBottom: "16px",
          fontFamily: "Be Vietnam Pro"
        }}/>
      <TextField
        label="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        required
        InputProps={{
          sx: { color: "#662753", fontFamily: "Be Vietnam Pro"},
        }}
        InputLabelProps={{
          sx: { color: "#662753", fontFamily: "Be Vietnam Pro" },
        }}
        variant="outlined"
        sx={{ backgroundColor: "#EEBEE3", color: "#662753", fontFamily: "Be Vietnam Pro" }}
      />
      <TextField
        label="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)} 
        required
        multiline
        rows={4}
        fullWidth
        InputProps={{
          sx: { color: "#662753", fontFamily: "Be Vietnam Pro" },
        }}
        InputLabelProps={{
          sx: { color: "#662753", fontFamily: "Be Vietnam Pro" },
        }}
        sx={{ backgroundColor: "#EEBEE3", color: "#662753", fontFamily: "Be Vietnam Pro" }}
      />
      <Button variant="contained" type="submit" sx={{ backgroundColor: "#FFFFFF", color: "#662753", marginRight: 1, fontFamily: "Dunkin",
        '&:hover': {
                backgroundColor: "#eeb5ee" }
       }}>
        SAVE
      </Button>
    </Card>

    </>
  )
}
}

export default EditMarkerForm;