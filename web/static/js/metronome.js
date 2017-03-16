import Tock from 'tocktimer';
import socket from './socket';
import audio from './audio';

const minDuration = 6 * 60 * 1000;
const maxDuration = 15 * 60 * 1000;

export default () => {
  const playerElem = document.getElementById('metronome');
  const player = audio();
  const testButton = document.getElementById('testbutton');
  const readyButton = document.getElementById('readybutton');
  const sock = socket();

  let channel = null
  let timer = null;
  let tempo = null;

  const playBeat = () => {
    player.play();
  };

  const pending = () => {
    playerElem.className = 'pending';
    testButton.className = 'shown-button';
    testButton.onclick = testSound;
    readyButton.onclick = ready;
  };

  const testSound = () => {
    playBeat();
    readyButton.className = 'shown-button';
  }

  const ready = () => {
    testButton.className = 'hidden';
    readyButton.className = 'hidden';
    sock.getTempo().then(t => {
      tempo = t;
      playerElem.className = 'ready';
    }, reason => {
      error(reason);
    });
  };

  const gaussianRand = () => {
    const n = 6;
    let rand = 0;

    for (let i = 0; i < n; i++) {
      rand += Math.random();
    }

    return rand / n;
  }

  const getDuration = () => {
    return Math.floor(minDuration + (gaussianRand() * (maxDuration - minDuration)));
  };

  const error = (reason) => {
    console.log('Error: ', reason);
    playerElem.className = 'not-ready';
  };

  const start = () => {
    if (!tempo) {
      throw new Error('Tempo not set!');
    }

    playerElem.className = 'playing';
    if (timer) {
      return;
    }
    const interval = 60000 / tempo;
    timer = new Tock({
      interval,
      callback: playBeat,
    });
    timer.start();
    const duration = getDuration();
    setTimeout(stop, duration);
  };

  const stop = () => {
    if (!timer) {
      return;
    }
    timer.stop();
    timer = null;
  };

  sock.getChannel().then(chan => {
    channel = chan;
    channel.on('start', start);
    channel.on('stop', stop);
    pending();
  });
};
