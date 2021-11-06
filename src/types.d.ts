declare module '*.mp3';
declare module '*.ogg';

interface Window {
  webkitAudioContext: typeof AudioContext;
}
