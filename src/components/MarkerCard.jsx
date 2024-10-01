import { Card, CardContent, Typography, Divider, Box, Button } from "@mui/material";
import '../App.css';

const MarkerCard = ({ date, title, description, id, handleEdit, handleDelete, image }) => {

  console.log("image url marker card", image)

    return (
    <>
    
      <Card variant="outlined"
      sx={{ 
          width: "400px", 
          height: "500px", 
          overflow: "hidden",
          padding: 5,
          marginRight: 2,
          marginLeft: 4,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#EEBEE3",
          borderRadius: 3,
          boxShadow: "3px 4px 2px rgba(0,0,0,0.2)",
        }}>
        <CardContent sx={{ 
          height: "85%", 
          overflowY: "auto", 
          padding: 3, 
          display: "flex",
          flexDirection: "column",
          alignItems: "center" }}>
          
          <Box>
            <img src={image} alt={title} style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Box>
        
          <Typography sx={{ fontSize: 16, color: "#662753", fontFamily: "Be Vietnam Pro", marginBottom: 1.5, marginTop: 1.5 }} gutterBottom>
            {date}
          </Typography>
          <Typography sx={{ color: "#662753", fontFamily: "Dunkin", marginBottom: 2 }} variant="h5">
            {title}
          </Typography>
           <Divider sx={{ backgroundColor: "#ffffff" }} />
          <Typography sx={{ color: "#662753", fontSize: 18, fontFamily: "Be Vietnam Pro"  }} >
            {description}
          </Typography>
           <Box sx={{ mt: 3 }}>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: "#FFFFFF", color: "#662753", marginRight: 2, fontFamily: "Dunkin",
                '&:hover': {
                backgroundColor: "#C576AC" }
               }}
              onClick={() => handleEdit({ title, description })}
            >
              EDIT
            </Button>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: "#FFFFFF", color: "#662753", fontFamily: "Dunkin",
                '&:hover': {
                backgroundColor: "#C576AC" }
              }}
              onClick={() => handleDelete(id)}
            >
              DELETE
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

 export default MarkerCard;