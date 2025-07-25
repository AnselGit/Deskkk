export function loadFlips(onContinue) {
  const div = document.createElement('div');
  div.id = 'flips';
  div.className = 'section';
  div.innerHTML = `
    <h1>Flashcards</h1>
    <p>Flip and learn with 3D study cards.</p>
    <button id="flips-next">Finish</button>
  `;
  document.body.appendChild(div);

  document.getElementById('flips-next').addEventListener('click', () => {
    onContinue(div);
  });
}
