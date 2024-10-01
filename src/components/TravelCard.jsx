import React from 'react';
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import '../App.css';

const TravelCard = ({ date, title, description, image }) => {
  return (
    <>

    <Card variant="outlined"
      sx={{ 
          width: "400px",  
          height: "600px", 
          padding: 3,
          margin: 2,
          backgroundColor: "#EEBEE3",
          borderRadius: 3,
          alignContent: "center",
          justifyContent: "center",
          boxShadow: "3px 4px 2px rgba(0,0,0,0.2)",
          overflow: "visible"
        }}>
          <CardContent sx={{ 
          height: "85%", 
          overflowY: "auto", 
          padding: 3, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          {image && (
          <Box>
            <img src={image} alt={title} style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Box>
        )}
          <Typography sx={{ color: "#662753", fontSize: 16, fontFamily: "Be Vietnam Pro", marginBottom: 1.5, marginTop: 1.5}} gutterBottom>
            {date}
          </Typography>
          <Typography sx={{ color: "#662753", fontFamily: "Dunkin" }} variant="h5">
            {title}
          </Typography>
           <Divider sx={{ my: 1.5, backgroundColor: "#ffffff" }} />
          <Typography sx={{ color: "#662753", fontSize: 18, fontFamily: "Be Vietnam Pro" }} >
            {description}
          </Typography>
      </CardContent>
    </Card>
    </>
  );
}

export default TravelCard;
