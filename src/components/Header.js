/* global chrome */

import React, { useEffect, useState } from 'react';

const Header = () => {
  const [currentURL, setCurrentURL] = useState('');

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const fullURL = tabs[0]?.url || 'N/A';
        const urlObj = new URL(fullURL);
        let importantPart = `${urlObj.hostname}`;

        if (importantPart.length > 13) {
          importantPart = importantPart.slice(0, 27) + '...';
        }
        setCurrentURL(importantPart);
      });
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-nepink mb-4 text-center mt-2 font-sans text-3xl">BROWSING AID</h1>
      <div className="flex">
        <p className="text-center border border-white w-full text-newhite text-md"> Now Affecting: {currentURL || 'Site Not Found...'}</p>
      </div>
    </>
  );
};

export default Header;
