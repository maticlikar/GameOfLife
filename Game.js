class Game { 
  constructor(updateTime) {
    this.updateTime = updateTime;
    this.interval = 0;
    this.isPaused = true;

    this.startButton = document.querySelector('.start');
    this.startButton.addEventListener('click', this.togglePause.bind(this));
  }

  start(interval, game) {
    if(interval > 0) {
      clearInterval(interval);
    }

    interval = setInterval('game.rules()', updateTime);
  }
  
  togglePause() {
    this.isPaused = !this.isPaused;

    if(this.isPaused) {
      this.startButton.innerText = 'Start';
    } else {
      this.startButton.innerText = 'Pause';
    }
  }

  changeUpdateTime() {

  }

  getIsPaused() {
    return this.isPaused;
  }
}
