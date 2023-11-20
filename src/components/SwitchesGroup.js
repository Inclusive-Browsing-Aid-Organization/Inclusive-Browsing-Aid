import React, { useState } from "react";
import { Switch, FormGroup, FormControlLabel } from "@mui/material";

import SeizureSwitch from './switches/SeizureSwitch';
import BionicSwitch from './switches/BionicSwitch';
import ContrastSwitch from './switches/ContrastSwitch';
import FontSwitch from './switches/FontSwitch';


const SwitchesGroup = () => {
  const [switchState1, setSwitchState1] = useState(false);
  const [switchState2, setSwitchState2] = useState(false);
  const [switchState3, setSwitchState3] = useState(false);
  const [switchState4, setSwitchState4] = useState(false);
  const [switchState5, setSwitchState5] = useState(false);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    switch (name) {
      case "switch1":
        setSwitchState1(checked);
        break;
      case "switch2":
        setSwitchState2(checked);
        break;
      case "switch3":
        setSwitchState3(checked);
        break;
      case "switch4":
        setSwitchState4(checked);
        break;
      case "switch5":
        setSwitchState5(checked);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <FormGroup>
        <SeizureSwitch/>
        <BionicSwitch/>
        <ContrastSwitch/>
        <FontSwitch/>
        
      </FormGroup>
    </div>
  );
};

export default SwitchesGroup;
