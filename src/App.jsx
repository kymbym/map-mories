import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TravelsTable from './components/TravelWrapped';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';

const App = () => {

  return (
    <>
    <AppBar position="static" style={{ background: "#C576AC" }}>
        <Toolbar>
          <Typography variant="h5" sx={{fontFamily:"Dunkin", color:"#FFFFFF"}}> 
            Kymmy's Travel Diary ଘ(੭ˊᵕˋ)੭* ੈ✩‧₊˚
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
          <Route path="/" element={<HomePage /> } />
          <Route path="/travels/table" element={<TravelsTable /> } />
          <Route path="/travels/grid" element={<TravelsTable /> } />
      </Routes>
    </>
  )
}

export default App;