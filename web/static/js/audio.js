const AudioContext = typeof window.AudioContext === 'undefined' ? webkitAudioContext : window.AudioContext;

export default () => {
  const ctx = new AudioContext();
  let audioData;

  fetch('images/metro.mp3').then(resp => {
    return resp.arrayBuffer();
  }).then(buf => {
    audioData = buf;
  });

  const play = () => {
    if (!audioData) {
      throw new Error('Audio data not downloaded');
    }
    const src = ctx.createBufferSource();
    return ctx.decodeAudioData(audioData, (buf) => {
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    });
  };

  return {
    play,
  };
};
