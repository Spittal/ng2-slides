declare interface Player {
  playbackRate: number;
  onfinish: (e) => void;
  play();
  pause();
  finish();
  reverse();
}
