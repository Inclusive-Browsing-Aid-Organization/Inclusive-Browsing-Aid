document.addEventListener("DOMContentLoaded", function () {
  //variables
  const inputText = document.getElementById("inputText");
  const boldTextButton = document.getElementById("boldTextButton");
  //bolds the text
  boldTextButton.addEventListener("click", function () {
    const text = inputText.value;
    const boldedText = text.replace(/\b\w{2}/g, function (match) {
      return `<b>${match}</b>`;
    });

    //the below changes the popup size based on how long the text is.
    inputText.style.display = "none";
    document.body.innerHTML = boldedText; // Update content
    const newHeight = document.documentElement.scrollHeight + 20;
    window.resizeTo(600, newHeight);
  });
});
