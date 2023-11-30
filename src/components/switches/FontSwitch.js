/* global chrome */

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { makeFontAccessible, changeFontBack } from '../../utils/accessibleFont';

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
        )}" d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/></svg>')`,
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
      )}" d="m12.58 9.75-.87-.87.23-.66h.1l.54 1.53zm-2.23-2.23L10.92 6h2.14l2.55 6.79L22 19.17V4c0-1.1-.9-2-2-2H4.83l5.52 5.52zm10.14 15.79L19.17 22H4c-1.1 0-2-.9-2-2V4.83L.69 3.51 2.1 2.1l19.8 19.8-1.41 1.41zm-8.39-8.38-3.3-3.3L6.41 18h2.08l1.09-3.07h2.52z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function FontSwitch() {
  const [isCheckedFS, setisCheckedFS] = useState(false);
  const [labelColorFS, setlabelColorFS] = useState('#a0a0a0');  // dimmer color for "off" state
  const [divOpacityFS, setdivOpacityFS] = useState(0.5);  // dimmer opacity for "off" state
  
  useEffect(() => {
    chrome.storage.local.get(['isCheckedFS', 'labelColorFS', 'divOpacityFS'], function(result) {
      if (result.isCheckedFS !== undefined) {
        setisCheckedFS(result.isCheckedFS);
        setlabelColorFS(result.labelColorFS);
        setdivOpacityFS(result.divOpacityFS);
      }
    });
  }, []);
  
  useEffect(() => {
    const newlabelColorFS = isCheckedFS ? '#fcfcfd' : '#a0a0a0';
    const newdivOpacityFS = isCheckedFS ? 1 : 0.5;
  
    chrome.storage.local.set({ isCheckedFS, labelColorFS: newlabelColorFS, divOpacityFS: newdivOpacityFS }, () => {
      setlabelColorFS(newlabelColorFS);
      setdivOpacityFS(newdivOpacityFS);
    });
  }, [isCheckedFS]);

  const handleToggle = () => {
    const newisCheckedFS = !isCheckedFS;
    setisCheckedFS(newisCheckedFS); 
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const codeToExecute = newisCheckedFS ? makeFontAccessible : changeFontBack;

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: codeToExecute,
      });
    });
  }  
    
  return (
    <div class="border border-white" style={{ opacity: divOpacityFS }}>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch 
              sx={{ m: 1 }} 
              checked={isCheckedFS} 
              onChange={() => handleToggle()} 
            />
          }
          label={<span style={{color: labelColorFS}}>{`Accessible Font ${isCheckedFS ? 'ON' : 'OFF'}`}</span>}
        />
      </FormGroup>
    </div>
  );
}
