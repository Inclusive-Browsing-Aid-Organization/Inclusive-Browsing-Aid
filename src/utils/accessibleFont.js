export function makeFontAccessible() {
  const target = document.querySelectorAll("p");

  target.forEach(function (currentValue) {
    currentValue.style.font = '16px arial,serif';
  });

}

export function changeFontBack() {
  window.location.reload();
}
