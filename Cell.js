class Cell {

  constructor(grid, row, col) {
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

  toggleState() {
    console.log(this.row + ' ' + this.col);

    if(this.div.classList.contains('alive')) {
      this.div.classList.remove('alive');
      this.div.classList.add('dead');
    } else {
      this.div.classList.remove('dead');
      this.div.classList.add('alive');
    }
  }
}
