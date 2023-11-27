import { FormGroup } from "@mui/material";

import SeizureSwitch from './switches/SeizureSwitch';
import BionicSwitch from './switches/BionicSwitch';
import ContrastSwitch from './switches/ContrastSwitch';
import FontSwitch from './switches/FontSwitch';
import CaptionSwitch from './switches/CaptionSwitch';
import SpeechSwitch from './switches/TextToSpeech';

const SwitchesGroup = () => {
  return (
    <div className="p-2 flex flex-col justify-center items-center">
      <FormGroup>
        <SeizureSwitch/>
        <BionicSwitch/>
        <ContrastSwitch/>
        <FontSwitch/>
        <CaptionSwitch/>
        <SpeechSwitch/>
      </FormGroup>
    </div>
  );
};

export default SwitchesGroup;
