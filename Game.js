class Game { 
  constructor(updateTime) {
    this.updateTime = updateTime;
    this.myInterval = 0;
  }
  
  startGame() {
    if(myInterval > 0) {
      clearInterval(myInterval);
    }

    myInterval = setInterval('rules()', updateTime);
  }
  
  togglePause() {

  }

  changeUpdateTime() {

  }
}
