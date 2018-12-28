class Game { 
  constructor(updateTime) {
    this.updateTime = updateTime;
    this.interval = 0;
  }
  
  start(interval, game) {
    if(interval > 0) {
      clearInterval(interval);
    }

    interval = setInterval('game.rules()', updateTime);
  }
  
  togglePause() {

  }

  changeUpdateTime() {

  }
}
