import React, { useState } from 'react';
import SwitchesGroup from './SwitchesGroup'

function ToggleMenu() {
  const [value, setValue] = useState(false);


  return (
    <div className="toggle-menu">
      <Switch
        isOn={value}
        handleToggle={() => setValue(!value)}
        color='#EF476F'
      />
    </div>
  );
}

export default ToggleMenu;
