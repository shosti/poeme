// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import { Socket } from 'phoenix';
import metronome from './metronome';

export default () => {
  const socket = new Socket('/socket', {});
  let metro = null;
  socket.connect();

  const channel = socket.channel('user:metronome', {});
  channel.on('set_tempo', ({ tempo }) => {
    metro = metronome(tempo);
  });
  channel.on('start', () => {
    if (metro) {
      metro.start();
    }
  });
  channel.on('stop', () => {
    if (metro) {
      metro.stop();
    }
  });
  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp) })
    .receive('error', resp => { console.log('Unable to join', resp) });

  return socket;
};
