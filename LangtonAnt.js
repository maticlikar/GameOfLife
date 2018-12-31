class LangtonAnt {
  constructor(updateTime) {
    this.ant = 
    this.updateTime = updateTime;
    this.interval = 0;
    this.isPaused = true;
    this.cellsToCheck = [];

    this.startButton = document.querySelector('.start');
    this.startButton.addEventListener('click', this.togglePause.bind(this));

    this.speedButton = document.querySelector('.submit_speed');
    this.speedButton.addEventListener('click', this.changeUpdateTime.bind(this));
  }

  start() {
    this.interval = setInterval( () => this.rules(), this.updateTime);
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
    this.updateTime = parseInt(document.querySelector('.speed_text').value);
    
    clearInterval(this.interval);
    
    this.start();
  }

  rules() {
    if(!this.isPaused) {

    }
  }
}
