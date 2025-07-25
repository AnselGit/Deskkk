export function loadDrills(onContinue) {
  const div = document.createElement('div');
  div.id = 'drills';
  div.className = 'section';
  div.innerHTML = `
    <h1>Practice Time!</h1>
    <p>Answer quiz drills and test your knowledge.</p>
    <button id="drills-next">Go to Flashcards</button>
  `;
  document.body.appendChild(div);

  document.getElementById('drills-next').addEventListener('click', () => {
    onContinue(div);
  });
}
