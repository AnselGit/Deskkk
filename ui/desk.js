export function loadDesk(onContinue) {
  const div = document.createElement('div');
  div.id = 'desk';
  div.className = 'section';
  div.innerHTML = `
    <h1>Your Virtual Desk</h1>
    <p>Access flashcards, notes, and study tools.</p>
    <button id="desk-next">Go to Drills</button>
  `;
  document.body.appendChild(div);

  document.getElementById('desk-next').addEventListener('click', () => {
    onContinue(div);
  });
}
