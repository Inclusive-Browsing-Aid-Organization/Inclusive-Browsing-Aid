/* global chrome */

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { readTextContent, cancelReading } from '../../utils/textToSpeech';

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
        )}" d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>')`,
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
      )}" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function SpeechSwitch() {
  const [isCheckedTTS, setisCheckedTTS] = useState(false);
  const [labelColorTTS, setlabelColorTTS] = useState('#a0a0a0');  // dimmer color for "off" state
  const [divOpacityTTS, setdivOpacityTTS] = useState(0.5);  // dimmer opacity for "off" state
  
  useEffect(() => {
    chrome.storage.local.get(['isCheckedTTS', 'labelColorTTS', 'divOpacityTTS'], function(result) {
      if (result.isCheckedTTS !== undefined) {
        setisCheckedTTS(result.isCheckedTTS);
        setlabelColorTTS(result.labelColorTTS);
        setdivOpacityTTS(result.divOpacityTTS);
      }
    });
  }, []);
  
  useEffect(() => {
    const newlabelColorTTS = isCheckedTTS ? '#fcfcfd' : '#a0a0a0';
    const newdivOpacityTTS = isCheckedTTS ? 1 : 0.5;
  
    chrome.storage.local.set({ isCheckedTTS, labelColorTTS: newlabelColorTTS, divOpacityTTS: newdivOpacityTTS }, () => {
      setlabelColorTTS(newlabelColorTTS);
      setdivOpacityTTS(newdivOpacityTTS);
    });
  }, [isCheckedTTS]);

  const handleToggle = () => {
    const newisCheckedTTS = !isCheckedTTS;
    setisCheckedTTS(newisCheckedTTS); 
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const codeToExecute = newisCheckedTTS ? readTextContent : cancelReading;

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: codeToExecute,
      });
    });
  }  

  return (
    <div class="border border-white" style={{ opacity: divOpacityTTS }}>
      <FormGroup>
        <FormControlLabel
          control={
            <MaterialUISwitch 
              sx={{ m: 1 }} 
              checked={isCheckedTTS} 
              onChange={() => handleToggle()} 
            />
          }
          label={<span style={{color: labelColorTTS}}>{`Text To Speech ${isCheckedTTS ? 'ON' : 'OFF'}`}</span>}
        />
      </FormGroup>
    </div>
  );
}
