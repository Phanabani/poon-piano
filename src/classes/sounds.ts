export class Sounds {
  context: AudioContext;
  buffers: AudioBuffer[];
  bufferIndex: number;
  gainNode: GainNode;
  source: AudioBufferSourceNode;

  constructor(context: AudioContext, buffers: AudioBuffer[]) {
    this.context = context;
    this.buffers = buffers;
    this.bufferIndex = 0;
    this.gainNode = context.createGain();
    this.source = context.createBufferSource();
  }

  init() {
    this.gainNode = this.context.createGain();
    this.source = this.context.createBufferSource();
    this.source.buffer = this.buffers[this.bufferIndex];
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
  }

  play(stopPrevious = false) {
    if (stopPrevious) {
      this.stop();
    }

    // Increment index so next sample is played
    let nextBufferIndex = this.bufferIndex + 1;
    if (nextBufferIndex > this.buffers.length - 1) {
      nextBufferIndex = 0;
    }
    this.bufferIndex = nextBufferIndex;

    this.init();
    this.source.start(this.context.currentTime);
  }

  stop() {
    try {
      // Fades note out in 80ms
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
