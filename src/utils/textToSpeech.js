  export function readTextContent() {
    console.log('Text Content Triggered');
    document.addEventListener("selectionchange", () => {
      setTimeout(() => {
        window.speechSynthesis.cancel();
        readSelectedText();
      }, 1000);
    });
  }

  function readSelectedText() {
    console.log('TEST Event Listener Triggered');
        let selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            let synth = window.speechSynthesis;
            let utterance = new SpeechSynthesisUtterance(selectedText);
            synth.speak(utterance);

        }
  }

  export function cancelReading() {
    window.speechSynthesis.cancelReading();
  }

  
  