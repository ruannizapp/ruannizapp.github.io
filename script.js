const bola = document.getElementById('bola');

document.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;

  bola.style.left = `${x}px`;
  bola.style.top = `${y}px`;
});