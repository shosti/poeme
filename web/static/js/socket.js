import { Socket } from 'phoenix';
import metronome from './metronome';

export default () => {
  const socket = new Socket('/socket', {});
  socket.connect();

  let channel;
  const getChannel = () => (new Promise((resolve, reject) => {
    if (channel) {
      return resolve(channel);
    }

    channel = socket.channel('user:metronome', {});
    channel.join()
      .receive('ok', resp => {
        resolve(channel);
      }).receive('error', resp => {
        reject(resp);
      });
  }));

  const getTempo = () => (new Promise((resolve, reject) => {
    if (!channel) {
      return reject(new Error('Channel is not connected!'));
    }

    channel.push('get_tempo', {})
      .receive('ok', ({ tempo }) => resolve(tempo))
      .receive('error', ({ reason }) => reject(reason))
      .receive('timeout', () => reject(new Error('Channel timeout')));
  }));

  return {
    getChannel,
    getTempo,
  };
};
