/* global chrome */

HTMLElement.prototype.q = function(selector) {
    return Array.from(this.querySelectorAll(selector));
}
function qq(t) {
    return document.qq(t);
}

let originalFont = chrome.fontSettings.getFont;

export function makeFontAccessible() {
    
  function changeFont() {
    const fontID = 'Arial';
    qq("Arial").forEach(el => el.style.fontFamily = fontID);
    chrome.fontSettings.setFont(
      {
        fontID,
        genericFamily: 'standard',
      },
      () => chrome.runtime.sendMessage({})
    );

  }

  changeFont();
}

export function changeFontBack() {
  function revertFont(textnode) {
    const fontID = originalFont;
    qq("Arial").forEach(el => el.style.fontFamily = fontID);
    chrome.fontSettings.setFont(
      {
        fontID,
        genericFamily: 'standard',
      },
      () => chrome.runtime.sendMessage({})
    );
  }

  revertFont();
}
