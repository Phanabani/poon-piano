// LOCAL FILES
// Constants
import { VOLUME_FADE_TIME } from '../constants';

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
    // Fades note out
    try {
      // https://stackoverflow.com/a/34480323/2933708
      // We have to set the value at the current time, otherwise the ramp curve
      // will be stretched back to the value we set when starting playback and
      // cause a click (discontinuity in the gain curve)
      this.gainNode.gain.setValueAtTime(
        this.gainNode.gain.value,
        this.context.currentTime,
      );
      // Changed from exponential to linear ramp because the exponential
      // also unfortunately introduces clicking due to the sharp initial rate
      // of change. The end value cannot be 0 because of how the function was
      // designed, but the steepness of the curve is also strongly related to
      // how close this end value is to 0. This means no matter what you try,
      // you will be getting a click somewhere. The perfect solution would be
      // to have control over the steepness of the curve while also maintaining
      // the end value.
      this.gainNode.gain.linearRampToValueAtTime(
        0,
        this.context.currentTime + VOLUME_FADE_TIME,
      );
      this.source.stop(this.context.currentTime + VOLUME_FADE_TIME);
    } catch {
      // May fail if sound hasn't been played yet
    }
  }
}
