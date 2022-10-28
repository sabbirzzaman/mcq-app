const scoreEl = document.getElementById('score');

const score = localStorage.getItem('score');

scoreEl.innerText = score || 0;
