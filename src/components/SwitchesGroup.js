import React, { useState } from 'react';

import Switch from './switch/Switch'

const SwitchesGroup = () => {
    const [switch1, setSwitch1] = useState(true);
    const [switch2, setSwitch2] = useState(true);
    const [switch3, setSwitch3] = useState(true);
    const [switch4, setSwitch4] = useState(true);
    const [switch5, setSwitch5] = useState(true);
  
    return (
    <div className='p-2 flex flex-col justify-center items-center'>
      <div className="mb-2 flex items-center justify-between">
        <Switch isOn={switch1} handleToggle={() => setSwitch1(!switch1)} color="#6C698D" />
      <label className="block text-ultraViolet text-sm font-bold ml-2">Switch 1</label>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <Switch isOn={switch2} handleToggle={() => setSwitch2(!switch2)} color="#6E6271" />
        <label className="block text-ultraViolet text-sm font-bold ml-2">Switch 2</label>
      </div>
      
      <div className="mb-2 flex items-center justify-between">
        <Switch isOn={switch3} handleToggle={() => setSwitch3(!switch3)} color="#BFAFA6" />
        <label className="block text-ultraViolet text-sm font-bold ml-2">Switch 3</label>
      </div>
      
      <div className="mb-2 flex items-center justify-between">
        <Switch isOn={switch4} handleToggle={() => setSwitch4(!switch4)} color="#AA968A" />
        <label className="block text-ultraViolet text-sm font-bold ml-2">Switch 4</label>
      </div>
      
      <div className="mb-2 flex items-center justify-between">
        <Switch isOn={switch5} handleToggle={() => setSwitch5(!switch5)} color="#6E6A6F" />
        <label className="block text-ultraViolet text-sm font-bold ml-2">Switch 5</label>
      </div>
    </div>
    );
  };
  
  export default SwitchesGroup;