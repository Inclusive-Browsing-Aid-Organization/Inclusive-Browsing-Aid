/*
 * https://html.onlineviewer.net/
<body style="background-color:green;">

<h1 style="color:black">This is a heading</h1>
<p id="p" style="color:red">This is a paragraph.</p>

</body>
 * https://stackoverflow.com/questions/197748/how-do-i-change-the-background-color-with-javascript
 * https://stackoverflow.com/questions/17925577/change-text-color-with-javascript
 * https://www.npmjs.com/package/color-contrast-checker
 */

export function contrastPage() {
  document.body.style.background = 'white';
  document.getElementById("p").style.color = 'black';
  //alert("contrast page");
  /*
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
  */
}

export function contrastReload() {
  //window.location.reload();
  //alert("reload");
  /*
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
*/
}
