import React, { useState, useEffect } from 'react';
import { Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Button } from '@mui/material';
import TravelCard from './TravelCard';
import { fetchMarkers } from "../services/api";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import TableChartIcon from '@mui/icons-material/TableChart';
import IconButton from '@mui/material/IconButton';
import '../App.css';

const Travels = () => {
  const [travels, setTravels] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isTableView = location.pathname === "/travels/table";

  useEffect(() => {
    const getTravels = async () => {
      try {
        const fetchedTravels = await fetchMarkers();
        setTravels(fetchedTravels);
      } catch (error) {
        console.error("error fetching travels:", error);
      }
    };
    getTravels();
  }, []);

  const handleView = () => {
    if (isTableView) {
      navigate("/travels/grid");
    } else {
      navigate("/travels/table");
    }
  };

  return (
      <>
      {/* <Typography variant="h4" gutterBottom sx={{padding: 3, fontFamily: "Dunkin", color: "#662753" }}>Travels Wrapped</Typography> */}

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mb: 1, mt: 4 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1, maxWidth: "300px", width: "100%", justifyContent: "start" }}>
        <Link to="/" >
          <Button variant="contained"
            sx={{ backgroundColor: "#C576AC", color: "#FFFFFF", marginBottom: 1, fontFamily: "Dunkin", padding: "8px 15px", fontSize: "16px",
              '&:hover': {
              backgroundColor: "#662753" }
              }}>
            Back
          </Button>
        </Link>

      <IconButton onClick={handleView} sx={{ backgroundColor: "#C576AC", color: "#F5EDED", marginBottom: 1, fontFamily: "Dunkin", padding: "11px 11px", fontSize: "16px",
              '&:hover': {
              backgroundColor: "#662753" }
              }}>
        {isTableView ? <GridViewIcon sx={{ color: "#FFFFFF" }} /> : <TableChartIcon sx={{ color: "#FFFFFF" }} />}
      </IconButton>
      </Box>

      {isTableView ? (
        <TableContainer component={Paper} sx={{
        maxWidth: "70%",
        marginBottom: 0.9,
        borderRadius: 2,
        boxShadow: "3px 4px 2px rgba(0,0,0,0.2)",
        backgroundColor: "#FFFFFF",
        margin: "0 auto",
        mt: 2,
        border: "1.2px solid #662753"
      }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "15%", fontFamily: "Dunkin", backgroundColor: "#C576AC", color: "#FFFFFF", fontWeight: "bold", fontSize: "18px"}}>Date</TableCell>
              <TableCell sx={{ width: "15%", fontFamily: "Dunkin", backgroundColor: "#C576AC", color: "#FFFFFF", fontWeight: "bold", fontSize: "18px" }}>Title</TableCell>
              <TableCell sx={{ width: "90%", fontFamily: "Dunkin", backgroundColor: "#C576AC", color: "#FFFFFF", fontWeight: "bold", fontSize: "18px" }}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {travels.map((place) => (
              <TableRow key={place.id} 
              >
                <TableCell sx={{fontFamily: "Be Vietnam Pro", fontSize: "18px", borderBottom: "1.2px solid #662753"}}>{place.date}</TableCell>
                <TableCell sx={{fontFamily: "Be Vietnam Pro", fontSize: "18px", borderBottom: "1.2px solid #662753"}}>{place.title}</TableCell>
                <TableCell sx={{fontFamily: "Be Vietnam Pro", fontSize: "18px", borderBottom: "1.2px solid #662753"}}>{place.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ) :

      <Grid container spacing={0} rowGap={2} 
      sx={{ 
        maxWidth: "95%",   
        margin: "0 auto",   
        padding: 1,         
      }}>
        {travels.map((place) => (
          <Grid item sm={4} key={place.id} sx={{ display: "flex", justifyContent: "center" }}>
            <TravelCard 
              date={place.date} 
              title={place.title} 
              description={place.description}
              image={place.image}
            />
          </Grid>
        ))}
      </Grid>
      }
      </Box>
    </>
  );
};

export default Travels;
