class ConwayGameOfLife extends Game {

  constructor(grid, updateTime) {
    super(updateTime);
    this.grid = grid; 
  }

  rules() {
    if(!this.isPaused) {
      let kill = [];
      let revive = [];

      for (let i = 0; i < this.grid.cells.length; i++) {
        for (let j = 0; j < this.grid.cells[i].length; j++) {
          let cell = this.grid.cells[i][j];
          let neighbors = cell.mooreNeighborhood();
          let aliveNeighbors = 0;

          for (let k = 0; k < neighbors.length; k++) {
            if(neighbors[k].div.classList.contains('alive')) {
              aliveNeighbors++;
            }
          }

          if(i === 5 && j === 3) {
            console.log(aliveNeighbors);
          }
          
          if(cell.div.classList.contains('alive')) {
            if(aliveNeighbors < 2 || aliveNeighbors > 3) {
              kill.push(cell);
            }
          }

          if(cell.div.classList.contains('dead')) {
            if(aliveNeighbors === 3) {
              revive.push(cell);
            }
          }
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
    /*
    for (let i = 0; i < cellsToCheck.length; i++) {
      let neighbors = getAllNeighbors(cellsToCheck[i]);
      let aliveNeighbors = 0;

      for (let k = 0; k < neighbors.length; k++) {
        if(neighbors[k].classList.contains('alive')) {
          aliveNeighbors++;
        }
      }

      if(cellsToCheck[i].classList.contains('alive')) {
        if(aliveNeighbors < 2 || aliveNeighbors > 3) {
          kill.push(cellsToCheck[i]);
        }
      }

      if(cellsToCheck[i].classList.contains('dead')) {
        if(aliveNeighbors === 3) {
          revive.push(cellsToCheck[i]);

          if(newCellsToCheck.indexOf(cellsToCheck[i] === -1)) {
            newCellsToCheck.push(cellsToCheck[i]); 
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
        cellsToCheck.splice(i, 1);
        i--;
      }
      
    }

    for (let i = 0; i < newCellsToCheck.length; i++) {
      if(cellsToCheck.indexOf(newCellsToCheck[i]) === -1) {
        cellsToCheck.push(newCellsToCheck[i]);
      }
    }

    for(let i = 0; i < kill.length; i++) {
      kill[i].classList.remove('alive');
      kill[i].classList.add('dead');
    }

    for(let i = 0; i < revive.length; i++) {
      revive[i].classList.remove('dead');
      revive[i].classList.add('alive');
    }
    */
  }
}
