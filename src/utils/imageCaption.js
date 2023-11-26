export function makeCaptions() {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    const altText = img.getAttribute("alt");
    if (altText) {
      const captionDiv = document.createElement("div");
      captionDiv.className = "image-caption-extension";
      captionDiv.innerHTML = `<p>${altText}</p>`;
      img.parentNode.insertBefore(captionDiv, img.nextSibling);
    }
  });
}

export function removeCaptions() {
  const captions = document.querySelectorAll(".image-caption-extension");

  captions.forEach((caption) => {
    caption.parentNode.removeChild(caption);
  });
}
