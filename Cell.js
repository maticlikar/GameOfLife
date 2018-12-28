class Cell {

  constructor(grid, row, col) {
    this.grid = grid;
    this.row = row;
    this.col = col;

    this.div = document.createElement('DIV');
    this.div.classList.add('cell');
    this.div.classList.add('dead');

    this.div.addEventListener('click', this.toggleState);
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

  }

  toggleState() {
    if(this.classList.contains('alive')) {
      this.classList.remove('alive');
      this.classList.add('dead');
    } else {
      this.classList.remove('dead');
      this.classList.add('alive');
    }
  }
}
