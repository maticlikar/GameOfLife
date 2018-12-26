class Cell {

  constructor(grid, state, id, size) {
    this.grid = grid;
    this.state = state;
    this.size = size;

    this.div = document.createElement('DIV');
    div.classList.add('cell');
    div.classList.add('dead');

    this.id = id;
    this.row = parseInt(id.split(' ')[0]);
    this.col = parseInt(id.split(' ')[1]);
  }

  vonNeumannNeighborhood() {
  
  }

  mooreNeighborhood() {

  }

  toggleState() {
    if(div.classList.contains('alive')) {
      div.classList.remove('alive');
      div.classList.add('dead');
    } else {
      div.classList.remove('dead');
      div.classList.add('alive');
    }
  }
}
