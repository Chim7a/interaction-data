import React, { useEffect, useState } from "react";
import InteractionPercentage from '../component/interaction-percentage/InteractionPercentage';
import NavBar from '../component/navbar/NavBar';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Home = () => {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setShowLoading(true)
    axios.get(`http://localhost:8080/interactions`)
    .then(res => {
      const interactions = res.data;
      setData(interactions);
      setShowLoading(false)
    })
  }, [])

  return (
    <div >
        <NavBar />  

        <div style={{padding:"30px"}}>
            <div style={{display:"flex", justifyContent:"center"}}>
              {showLoading && (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>)}
            </div>
          
            {data.length > 0 &&
              <div>
                <div>
                  <InteractionPercentage data={data}/>
                </div>              
              </div>
            }
        </div>
    </div>
  )
}

export default Home;