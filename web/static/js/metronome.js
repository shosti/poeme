import Tock from 'tocktimer';

export default () => {
  const metroElem = document.getElementById('metronome');
  const playerElem = document.getElementById('player');
  const tempoElem = document.getElementById('tempo');
  const audio = new window.Audio('images/metro.mp3');
  let timer = null;

  const playBeat = () => {
    audio.play();
  };

  const start = () => {
    const tempo = parseInt(tempoElem.value);
    if (isNaN(tempo)) {
      alert("No tempo!");
      return;
    }
    const interval = 60000 / tempo;
    timer = new Tock({
      interval,
      callback: playBeat,
    });
    timer.start();
    playerElem.textContent = 'PLAYING';
  };

  const stop = () => {
    window.clearInterval(player);
    timer.stop();
    timer = null;
    playerElem.textContent = '';
  };

  metroElem.onclick = () => {
    if (timer) {
      stop();
    } else {
      start();
    }
  };
};
