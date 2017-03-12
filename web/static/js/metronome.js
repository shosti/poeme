import Tock from 'tocktimer';

// TODO: MINUTES NOT SECONDS!
const minDuration = 6 * 1000;
const maxDuration = 15 * 1000;

export default (tempo) => {
  const playerElem = document.getElementById('player');
  const audio = document.getElementById('metro-audio');
  let timer = null;

  const playBeat = () => {
    audio.play();
  };

  const getDuration = () => {
    return Math.floor(minDuration + (Math.random() * (maxDuration - minDuration)));
  };

  const start = () => {
    if (timer) {
      return;
    }
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
    const duration = getDuration();
    playerElem.textContent = `${tempo} FOR ${duration}ms`;
    setTimeout(stop, duration);
  };

  const stop = () => {
    if (!timer) {
      return;
    }
    console.log('STOPPING');
    timer.stop();
    timer = null;
    playerElem.textContent = '';
  };

  return {
    start,
    stop,
  }
};
