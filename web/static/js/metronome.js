export default () => {
  const metroElem = document.getElementById('metronome');
  const playerElem = document.getElementById('player');
  const tempoElem = document.getElementById('tempo');
  const audio = new window.Audio('images/metro.mp3');

  let player = null;
  const playBeat = () => {
    audio.play();
  }

  const start = () => {
    const tempo = parseInt(tempoElem.value);
    if (isNaN(tempo)) {
      alert("No tempo!");
      return;
    }
    playBeat();
    const interval = 60000 / tempo;
    player = window.setInterval(playBeat, interval);
    playerElem.textContent = 'PLAYING';
  };

  const stop = () => {
    window.clearInterval(player);
    player = null;
    playerElem.textContent = '';
  };

  metroElem.onclick = () => {
    if (player) {
      stop();
    } else {
      start();
    }
  };
};
