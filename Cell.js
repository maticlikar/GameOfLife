class Cell {

  constructor(game, grid, row, col) {
    this.game = game;
    this.grid = grid;
    this.row = row;
    this.col = col;

    this.div = document.createElement('DIV');
    this.div.classList.add('cell');
    this.div.classList.add('dead');

    // Adding all the event listeners
    
    this.div.addEventListener('click', this.toggleState.bind(this));
    this.div.addEventListener('mouseover', function() {
      this.classList.add('mouseover');
    });

    this.div.addEventListener('mouseout', function() {
      
      if(this.classList.contains('mouseover')) {
        this.classList.remove('mouseover');
      }
    });
  }

  vonNeumannNeighborhood() {
  
  }

  mooreNeighborhood() {
    let row = this.row;
    let col = this.col;
    let neighbors = [];

    if(row - 1 >= 0 && col - 1 >= 0) {
      neighbors.push(this.grid.cells[row - 1][col - 1]);
    }

    if(row - 1 >= 0) {
      neighbors.push(this.grid.cells[row - 1][col]);
    }

    if(row - 1 >= 0 && col + 1 < this.grid.totalSize) {
      neighbors.push(this.grid.cells[row - 1][col + 1]);
    }

    if(col - 1 >= 0) {
      neighbors.push(this.grid.cells[row][col - 1]);
    }

    if(col + 1 < this.grid.totalSize) {
      neighbors.push(this.grid.cells[row][col + 1]);
    }

    if(row + 1 < this.grid.totalSize && col - 1 >= 0) {
      neighbors.push(this.grid.cells[row + 1][col - 1]);
    }

    if(row + 1 < this.grid.totalSize) {
      neighbors.push(this.grid.cells[row + 1][col]);
    }

    if(row + 1 < this.grid.totalSize && col + 1 < this.grid.totalSize) {
      neighbors.push(this.grid.cells[row + 1][col + 1]);
    }

    return neighbors;
  }

  toggleState(event) {
    let row = event.target.id.split(' ')[0];
    let col = event.target.id.split(' ')[1];

    if(this.div.classList.contains('alive')) {
      this.div.classList.remove('alive');
      this.div.classList.add('dead');
    } else {
      this.div.classList.remove('dead');
      this.div.classList.add('alive');

      if(this.game.cellsToCheck.indexOf(this.grid.cells[row][col]) === -1) {
        this.game.cellsToCheck.push(this.grid.cells[row][col]); 
      }

      let neighbors = this.mooreNeighborhood();

      if(this.game.constructor.name === 'ConwayGameOfLife') {
        let neighbors = this.mooreNeighborhood();
      }

      for (let i = 0; i < neighbors.length; i++) {
        if(this.game.cellsToCheck.indexOf(neighbors[i]) === -1) {
          this.game.cellsToCheck.push(neighbors[i]);
        }
      }
    }
  }
}
