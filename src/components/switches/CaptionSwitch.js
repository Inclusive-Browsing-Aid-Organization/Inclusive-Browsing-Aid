/* global chrome */

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import { makeFontAccessible, changeFontBack } from "../../utils/accessibleFont";
import { makeCaptions, removeCaptions } from "../../utils/imageCaption";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#d23370",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M20 4H6.83l8 8H20v2h-3.17l4.93 4.93c.15-.28.24-.59.24-.93V6c0-1.1-.9-2-2-2zM1.04 3.87l1.2 1.2C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h13.17l2.96 2.96 1.41-1.41L2.45 2.45 1.04 3.87zM8 12v2H4v-2h4zm6 4.83V18H4v-2h9.17l.83.83z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function CaptionSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const [labelColor, setLabelColor] = useState("#a0a0a0"); // dimmer color for "off" state
  const [divOpacity, setDivOpacity] = useState(0.5); // dimmer opacity for "off" state

  useEffect(() => {
    setLabelColor(isChecked ? "#fcfcfd" : "#a0a0a0"); // bright when "on", dim when "off"
    setDivOpacity(isChecked ? 1 : 0.5); // fully visible when "on", half-opacity when "off"
  }, [isChecked]);

  const handleToggle = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const codeToExecute = newIsChecked ? makeCaptions : removeCaptions;

      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: codeToExecute,
      });
    });
  };

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
          label={
            <span style={{ color: labelColor }}>{`Image Captions ${
              isChecked ? "ON" : "OFF"
            }`}</span>
          }
        />
      </FormGroup>
    </div>
  );
}
