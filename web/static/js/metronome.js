import Tock from 'tocktimer';

// TODO: MINUTES NOT SECONDS!
const minDuration = 6 * 1000;
const maxDuration = 15 * 1000;

export default (tempo) => {
  const playerElem = document.getElementById('player');
  const audio = new Audio('images/metro.mp3');
  let timer = null;

  const playBeat = () => {
    audio.play();
  };

  const getDuration = () => {
    // Fake "gaussian" random in [0, 1]
    let rand = 0;
    for (let i = 0; i < 6; i++) {
      rand += Math.random();
    }
    rand = rand / 6.0;

    return Math.floor(minDuration + (rand * (maxDuration - minDuration)));
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
