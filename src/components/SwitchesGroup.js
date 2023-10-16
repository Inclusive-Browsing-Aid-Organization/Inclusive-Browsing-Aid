import React, { useState } from 'react';

import Switch from './switch/Switch'

const SwitchesGroup = () => {
    const [switch1, setSwitch1] = useState(true);
    const [switch2, setSwitch2] = useState(true);
    const [switch3, setSwitch3] = useState(true);
    const [switch4, setSwitch4] = useState(true);
    const [switch5, setSwitch5] = useState(true);
  
    return (
<div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Switch 1</label>
        <Switch isOn={switch1} handleToggle={() => setSwitch1(!switch1)} color="#EF476F" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Switch 2</label>
        <Switch isOn={switch2} handleToggle={() => setSwitch2(!switch2)} color="#F9A825" /> 
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Switch 3</label>
        <Switch isOn={switch3} handleToggle={() => setSwitch3(!switch3)} color="#48BB78" /> 
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Switch 4</label>
        <Switch isOn={switch4} handleToggle={() => setSwitch4(!switch4)} color="#2D3E50" />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Switch 5</label>
        <Switch isOn={switch5} handleToggle={() => setSwitch5(!switch5)} color="#FF6B6B" /> 
      </div>
    </div>
    );
  };
  
  export default SwitchesGroup;