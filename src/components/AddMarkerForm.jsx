import { createMarker } from '../services/api';
import { useState } from 'react';
import { Typography, Card, TextField, Button } from "@mui/material";
import Alert from '@mui/material/Alert';
import { uploadFile } from '../services/s3upload';
import '../App.css';

const AddMarkerForm = ({ location, handleMarkerSubmit }) => {

  const { lat, lng } = location || { lat: 0, lng: 0 };

  const [date, setDate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertSeverity, setAlertSeverity] = useState("success"); 

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setAlertMessage("uploading file...");
      setAlertSeverity("info");
      const uploadedImageUrl = await uploadFile(file); // uploads file from addmarkerform and attain url from aws s3
      setImageUrl(uploadedImageUrl); // set image url in state
      setImageUploaded(true); // image upload status
      console.log("uploaded image url", uploadedImageUrl);
      setAlertMessage("file uploaded successfully");
      setAlertSeverity("success");
    } catch (error) {
      console.error("error uploading file", error);
      setAlertMessage("failed to upload image");
      setAlertSeverity("error");
      setImageUploaded(false); 
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const markerData = {
      lat,
      lng,
      date,
      title,
      description,
      image: imageUrl, 
    };

    try {
      const result = await createMarker(markerData);

      if (result) {
        alert("marker saved");
        handleMarkerSubmit(); 
      } else {
        alert("failed to save marker");
      }
    } catch (error) {
      console.error("error saving marker", error);

    }
  };

  return (
     <Card
      component="form"
      onSubmit={handleAdd}
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
        maxHeight: "500px", 
        justifyContent: "center",
        alignContent: "center",
        boxShadow: "3px 4px 2px rgba(0,0,0,0.2)",
        backgroundColor: "#EEBEE3",
        borderRadius: 3,
      }}
    >
      <Typography sx={{ color: "#662753", fontFamily: "Dunkin" }} variant="h6">ADD MARKER</Typography>
      <input type="date" onChange={(e) => setDate(e.target.value)} sx={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          marginBottom: "16px",
          fontFamily: "Be Vietnam Pro"
        }}/>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        InputProps={{
          sx: { color: "#662753", fontFamily: "Be Vietnam Pro" },
        }}
        InputLabelProps={{
          sx: { color: "#662753", fontFamily: "Be Vietnam Pro" },
        }}
        variant="outlined"
        sx={{ backgroundColor: "#EEBEE3", color: "#662753", fontFamily: "Be Vietnam Pro" }}
      />
       <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} 
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
      
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      />

        {alertMessage && (
        <Alert severity={alertSeverity} sx={{ mt: 2 }}>
          {alertMessage}
        </Alert>
      )}


      <Button variant="contained" type="submit" sx={{ backgroundColor: "#FFFFFF", color: "#662753", marginRight: 1, fontFamily: "Dunkin",
        '&:hover': {
                backgroundColor: "#eeb5ee" }
       }}
       disabled={!imageUploaded}>
        SAVE
      </Button>
    </Card>
  );
};

export default AddMarkerForm;
