class Grid {

  constructor(game, size) {
    this.game = game;
    this.size = size;
    this.totalSize = size * 3;
    this.div = document.querySelector('.grid');
    this.height = this.div.parentElement.clientHeight;
    this.width = this.div.parentElement.clientWidth;
    this.visible = true;

    this.sizeButton = document.querySelector('.submit_size');
    this.sizeButton.addEventListener('click', this.changeSize.bind(this));

    this.toggleGridButton = document.querySelector('.toggle_grid');
    this.toggleGridButton.addEventListener('click', this.toggleGrid.bind(this));

    this.cells = this.populateCells();     
  }

  convertGridToText() {

  }

  convertTextToGrid() {
    
  }

  populateCells() {
    let cells = [];

    for (let i = 0; i < this.totalSize; i++) {
      cells[i] = [];
    }

    let min = this.size;
    let max = this.size + (this.size - 1);

    for (let i = 0; i < this.totalSize; i++) {
      for (let j = 0; j < this.totalSize; j++) {
        let cell = new Cell(game, this, i, j);        

        // Only set the middle ones as visible
        if(!(i >= min && i <= max && j >= min && j <= max)) {
          cell.div.style.display = 'none';
        }

        cell.div.id = i + ' ' + j;

        if(this.visible) {
          // The '- 2' comes from the borders for each cell being 1px on each side
          cell.div.style.border = '1px solid lightgray'; 
          cell.div.style.width = ((this.width / this.size) - 2).toString() + 'px';
          cell.div.style.height = ((this.height / this.size) - 2).toString() + 'px';
        } else {
          cell.div.style.border = 'none'; 
          cell.div.style.width = ((this.width / this.size)).toString() + 'px';
          cell.div.style.height = ((this.height / this.size)).toString() + 'px';
        }

        cells[i][j] = cell;
        this.div.appendChild(cell.div);
      }  
    }

    return cells;
  }

  toggleGrid() {
    for (let i = this.size; i < 2 * this.size; i++) {
      for (let j = this.size; j < 2 * this.size; j++) {
        if(this.visible) {
          this.cells[i][j].div.style.border = 'none'; 

          this.cells[i][j].div.style.width = ((this.width/this.size)).toString() + 'px';
          this.cells[i][j].div.style.height = ((this.height/this.size)).toString() + 'px';
        } else { 
          this.cells[i][j].div.style.border = '1px solid lightgray'; 

          this.cells[i][j].div.style.width = ((this.width/this.size) - 2).toString() + 'px';
          this.cells[i][j].div.style.height = ((this.height/this.size) - 2).toString() + 'px';
        }
      }
    } 

    this.visible = !this.visible;
  }

  changeSize() {
    this.size = parseInt(document.querySelector('.size_text').value);
    this.totalSize = this.size * 3;

    game.cellsToCheck = [];
    
    while (this.div.firstChild) {
      this.div.removeChild(this.div.firstChild);
    }

    this.cells = this.populateCells();
  }
}
