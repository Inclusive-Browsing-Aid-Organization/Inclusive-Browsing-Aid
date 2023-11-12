/* global chrome */

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { disableAllTimeouts, locationreload } from '../../utils/seizure';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M11.59 7.41 15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#d23370',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function SeizureSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const [labelColor, setLabelColor] = useState('#a0a0a0');  // dimmer color for "off" state
  const [divOpacity, setDivOpacity] = useState(0.5);  // dimmer opacity for "off" state
  
  useEffect(() => {
    setLabelColor(isChecked ? '#fcfcfd' : '#a0a0a0');  // bright when "on", dim when "off"
    setDivOpacity(isChecked ? 1 : 0.5);  // fully visible when "on", half-opacity when "off"
  }, [isChecked]);

  const handleToggle = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked); 
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const codeToExecute = newIsChecked ? disableAllTimeouts : locationreload;

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: codeToExecute,
      });
    });
  }  

  return (
    <div class="border border-white" style={{ opacity: divOpacity }}>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch 
              sx={{ m: 1 }} 
              checked={isChecked} 
              onChange={() => handleToggle()} 
            />
          }
          label={<span style={{color: labelColor}}>{`Seizure Safety ${isChecked ? 'ON' : 'OFF'}`}</span>}
        />
      </FormGroup>
    </div>
  );
}
