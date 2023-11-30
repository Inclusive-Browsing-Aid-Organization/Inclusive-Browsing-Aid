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
        )}" d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6h2v-2h16v2h2v-6c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8z"/></svg>')`,
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
      )}" d="M12 7.5c.97 0 1.75-.78 1.75-1.75S12.97 4 12 4s-1.75.78-1.75 1.75S11.03 7.5 12 7.5zM14 20v-5h1v-4.5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2V15h1v5h4z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function SeizureSwitch() {
  const [isCheckedSS, setisCheckedSS] = useState(false);
  const [labelColorSS, setlabelColorSS] = useState('#a0a0a0');  // dimmer color for "off" state
  const [divOpacitySS, setdivOpacitySS] = useState(0.5);  // dimmer opacity for "off" state
  
  useEffect(() => {
    chrome.storage.local.get(['isCheckedSS', 'labelColorSS', 'divOpacitySS'], function(result) {
      if (result.isCheckedSS !== undefined) {
        setisCheckedSS(result.isCheckedSS);
        setlabelColorSS(result.labelColorSS);
        setdivOpacitySS(result.divOpacitySS);
      }
    });
  }, []);
  
  useEffect(() => {
    const newlabelColorSS = isCheckedSS ? '#fcfcfd' : '#a0a0a0';
    const newdivOpacitySS = isCheckedSS ? 1 : 0.5;
  
    chrome.storage.local.set({ isCheckedSS, labelColorSS: newlabelColorSS, divOpacitySS: newdivOpacitySS }, () => {
      setlabelColorSS(newlabelColorSS);
      setdivOpacitySS(newdivOpacitySS);
    });
  }, [isCheckedSS]);

  const handleToggle = () => {
    const newisCheckedSS = !isCheckedSS;
    setisCheckedSS(newisCheckedSS); 
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const codeToExecute = newisCheckedSS ? disableAllTimeouts : locationreload;

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: codeToExecute,
      });
    });
  }  

  return (
    <div class="border border-white" style={{ opacity: divOpacitySS }}>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch 
              sx={{ m: 1 }} 
              checked={isCheckedSS} 
              onChange={() => handleToggle()} 
            />
          }
          label={<span style={{color: labelColorSS}}>{`Seizure Safety ${isCheckedSS ? 'ON' : 'OFF'}`}</span>}
        />
      </FormGroup>
    </div>
  );
}
