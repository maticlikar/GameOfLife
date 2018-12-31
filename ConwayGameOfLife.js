class ConwayGameOfLife {
  constructor(updateTime) {
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
      let kill = [];
      let revive = [];
      let newCellsToCheck = [];

      for (let i = 0; i < this.cellsToCheck.length; i++) {
        let cell = this.cellsToCheck[i];
        let neighbors = cell.mooreNeighborhood();
        let aliveNeighbors = 0;

        for (let k = 0; k < neighbors.length; k++) {
          if(neighbors[k].div.classList.contains('alive')) {
            aliveNeighbors++;
          }
        }
        
        if(cell.div.classList.contains('alive')) {
          if(aliveNeighbors < 2 || aliveNeighbors > 3) {
            kill.push(cell);
          }
        }

        if(cell.div.classList.contains('dead')) {
          if(aliveNeighbors === 3) {
            revive.push(cell);

            if(newCellsToCheck.indexOf(cell === -1)) {
              newCellsToCheck.push(cell);
            }

            for (let i = 0; i < neighbors.length; i++) {
              if(newCellsToCheck.indexOf(neighbors[i]) === -1) {
                newCellsToCheck.push(neighbors[i]);
              }
            }
          }
        }

        // Don't need to check it if it doesn't have any neighbors anymore
        
        if(aliveNeighbors === 0) {
          this.cellsToCheck.splice(i, 1);
          i--;
        }
      }

      for (let i = 0; i < newCellsToCheck.length; i++) {
        if(this.cellsToCheck.indexOf(newCellsToCheck[i]) === -1) {
          this.cellsToCheck.push(newCellsToCheck[i]);
        }
      }

      for(let i = 0; i < kill.length; i++) {
        kill[i].div.classList.remove('alive');
        kill[i].div.classList.add('dead');
      }

      for(let i = 0; i < revive.length; i++) {
        revive[i].div.classList.remove('dead');
        revive[i].div.classList.add('alive');
      }
    }
  }
}
