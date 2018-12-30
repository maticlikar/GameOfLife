class ConwayGameOfLife extends Game {

  constructor(updateTime) {
    super(updateTime);
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
