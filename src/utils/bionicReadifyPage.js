
export function makeFirstThreeLettersBold() {
  function boldFirstThree(textNode) {
    
    const text = textNode.nodeValue;
    const boldedText = text.replace(/\b(\w{1,3})(\w*?)\b/g, '<strong>$1</strong>$2');
    const wrapper = document.createElement('span');
    wrapper.innerHTML = boldedText;
    textNode.parentNode.replaceChild(wrapper, textNode);
  }

  function traverseAndBold(node) {
    for (const child of node.childNodes) {
      switch (child.nodeType) {
        case 1:
          traverseAndBold(child);
          break;
        case 3:
          boldFirstThree(child);
          break;
        default:
          break;
      }
    }
  }
  traverseAndBold(document.body);
}

export function removeBold() {
  function unboldTextNode(spanNode) {
    let htmlContent = spanNode.innerHTML;
    htmlContent = htmlContent.replace(/<\/?strong>/g, '');
    spanNode.innerHTML = htmlContent;
  }  

  function traverseAndUnbold(node) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 1 && child.tagName === 'SPAN') {
        unboldTextNode(child); 
        if (child.childNodes.length === 1 && child.childNodes[0].nodeType === 3) {
          const textNode = document.createTextNode(child.textContent);
          child.parentNode.replaceChild(textNode, child);
        }
      } else if (child.nodeType === 1) {
        traverseAndUnbold(child); 
      }
    });
  }
  traverseAndUnbold(document.body);
}

