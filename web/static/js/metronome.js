import Tock from 'tocktimer';
import socket from './socket';

// TODO: MINUTES NOT SECONDS!
const minDuration = 6 * 1000;
const maxDuration = 15 * 1000;

export default () => {
  const playerElem = document.getElementById('metronome');
  const audio = document.getElementById('metro-audio');
  const testButton = document.getElementById('testbutton');
  const readyButton = document.getElementById('readybutton');
  const sock = socket();

  let channel = null
  let timer = null;
  let tempo = null;

  const playBeat = () => {
    audio.play();
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
      console.log("TEMPO", tempo);
      playerElem.className = 'ready';
    });
  };

  const getDuration = () => {
    return Math.floor(minDuration + (Math.random() * (maxDuration - minDuration)));
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
