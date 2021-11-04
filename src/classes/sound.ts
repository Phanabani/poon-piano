export class Sound {
  context: AudioContext;
  buffer: AudioBuffer;
  gainNode: GainNode;
  source: AudioBufferSourceNode;

  constructor(context: AudioContext, buffer: AudioBuffer) {
    this.context = context;
    this.buffer = buffer;
    this.gainNode = context.createGain();
    this.source = context.createBufferSource();
  }

  init() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }

  play() {
    this.init();
    const currentTime = this.context.currentTime;
    this.source.start(currentTime);

    // Fades sound out 80ms before it stops playing
    this.gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      currentTime + this.buffer.duration - 0.08,
    );
  }

  stop() {
    try {
      this.gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.context.currentTime + 0.08,
      );
      this.source.stop(this.context.currentTime + 0.08);
    } catch {
      // May fail if sound hasn't been played yet
    }
  }
}
