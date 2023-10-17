import React, { useState } from "react";

import SwitchesGroup from './components/SwitchesGroup'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  const [appEnabled, setAppEnabled] = useState(false);

  const toggleApp = () => {
    setAppEnabled((prevEnabled) => !prevEnabled);
  };

  return (
    <div className="bg-timberWolf rounded-lg shadow-md ">
      <Header/>
      <SwitchesGroup/>
      <Footer/>
    </div>
  );
}

export default App;
