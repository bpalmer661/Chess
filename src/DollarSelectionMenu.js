import React, { useEffect } from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { useDispatch } from "react-redux";





const options = [
  0,
  1,
  2,
  3,
];



export default function DollarSelectionMenu() {

  


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  
  const dispatch = useDispatch();
  

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

useEffect(() => {

localStorage.setItem("DollarPreference",options[selectedIndex])


}, [selectedIndex,dispatch])








  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div 
    
    >

  
      <List
className="button is-primary"
       style={{
        height: "41px",
        // width:"40vw",
        width:"120px",
        border: "1px solid #dfe1e5",
        borderRadius: "4px",
        boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
        hoverBackgroundColor: "#eee",
        //color: "#212121",
        color: "white",
        fontSize: "1vw",
        fontFamily: "Arial",
        iconColor: "grey",
        lineColor: "rgb(232, 234, 237)",
        placeholderColor: "grey",
        padding:"0px",
        marginLeft:"5px",
        left:"0",
        textAlign:"center",
        
       


        
       }}
      component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          onClick={handleClickListItem}
        >
          <ListItemText 
          primary={`$ ${options[selectedIndex]}`} 
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{
          // backgroundColor: "black",
          marginTop:"99",
        
        }}
      >
        {options.map((option, index) => (
          <MenuItem
style={{
          width:"100vw",
          fontSize:"3vh"
        }}
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
          


            $ {`${option}`} 
          
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

 