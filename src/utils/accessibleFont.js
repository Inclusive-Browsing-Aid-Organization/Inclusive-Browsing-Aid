//Tyler Rossi

let originalFont = chrome.fontSettings.getFont;

export function makeFontAccessible() {
    function changeFont(textnode) {
        const fontId =  "Arial"
        chrome.fontSettings.setFont({
            fontID,
            genericFamily: "standard"
        })
    }

    changeFont(document.body);
}

export function changeFontBack() {
    
}