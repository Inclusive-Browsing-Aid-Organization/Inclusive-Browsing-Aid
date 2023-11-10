//Tyler Rossi

let originalFont = chrome.fontSettings.getFont;

export function makeFontAccessible() {
    function changeFont() {
        const fontId =  "Arial"
        chrome.fontSettings.setFont({
            fontID,
            genericFamily: "standard"
        })
    }

    changeFont();
}

export function changeFontBack() {
    function revertFont(textnode) {
        const fontID = originalFont;
        chrome.fontSettings.setFont({
            fontID,
            genericFamily: "standard"
        })
    }

    revertFont();
}