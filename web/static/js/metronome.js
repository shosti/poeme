import Tock from 'tocktimer';

const maxDuration = 12 * 60 * 1000;
const minDuration = 6 * 60 * 1000;

export default (tempo) => {
  const metroElem = document.getElementById('metronome');
  const playerElem = document.getElementById('player');
  const tempoElem = document.getElementById('tempo');
  const audio = new Audio('images/metro.mp3');
  let timer = null;

  const playBeat = () => {
    audio.play();
  };

  const getDuration = () => (
    minDuration + Math.floor(Math.random() * (maxDuration - minDuration))
  );

  const start = () => {
    if (isNaN(tempo)) {
      throw new Error("No tempo!");
      return;
    }
    const interval = 60000 / tempo;
    timer = new Tock({
      interval,
      callback: playBeat,
    });
    timer.start();
    playerElem.textContent = 'PLAYING';
    const duration = getDuration();
    console.log("DURA", duration)
    setTimeout(stop, duration);
  };

  const stop = () => {
    console.log('STOPPING');
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

  return {
    start,
    stop,
  }
};
