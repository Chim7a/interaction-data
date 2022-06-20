import React, { useEffect, useState, useCallback } from "react";
import Box from '@mui/material/Box';
import { List,ListItemText,ListItem } from "@mui/material";

export default function InteractionPercentage({data}) {
  const [listData, setListData] = useState([]);

  const totalInteractions = data.length

 const populatePecentage = useCallback(
    (items) => {
      return items.reduce((acc, item) => {
        const newItem = {...item}
        const occurances = items.filter((interaction) => interaction.name === newItem.name)
        const amount = occurances.length
        const frequency = totalInteractions * amount
        const percentage = frequency / 100
        newItem.percentage = percentage
        acc.push(newItem)
        return acc
        },[])
    },[totalInteractions],
  )

  const removeDuplicate = (interactions) => {
    const filteredArr = interactions.reduce((acc, current) => {
      const x = acc.find(item => item.sector_id === current.sector_id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return filteredArr
    }

  useEffect(() => {
    if (data) {
      const newData = populatePecentage(data)
      const uniqueNewData = removeDuplicate(newData)
      setListData(uniqueNewData)
    }
  }, [data,populatePecentage]);

  return (
    <Box
      sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}
    >
      <List>
          <ListItem style={{backgroundColor:"rgba(0,0,0,0.2)"}}> 
            <ListItemText sx={{width:"15rem"}}> NAME</ListItemText> 
            <ListItemText sx={{width:"15rem"}}> DATE </ListItemText> 
            <ListItemText sx={{width:"15rem"}}> PERCENTAGE </ListItemText> 
          </ListItem>
          { listData.length > 0 && listData.map((interaction) => 
          <ListItem key={interaction.sector_id}> 
            <ListItemText sx={{width:"15rem"}}> {interaction.name}</ListItemText> 
            <ListItemText sx={{width:"15rem"}}> {interaction.date}</ListItemText> 
            <ListItemText sx={{width:"15rem"}}> {interaction.percentage}%</ListItemText> 
          </ListItem>
          )}     
      </List>
 
    </Box>
  );
}
