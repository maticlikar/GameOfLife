class Grid {

  constructor(size) {
    this.size = size;
    this.totalSize = size * 3;
    this.div = document.querySelector('.grid');
    this.height = this.div.parentElement.clientHeight;
    this.width = this.div.parentElement.clientWidth;
    this.visible = true;

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
        let cell = new Cell(this, i, j);        

        // Only set the middle ones as visible
        if(!(i >= min && i <= max && j >= min && j <= max)) {
          cell.div.style.display = 'none';
        }

        if(this.visible) {
          // The '- 2' comes from the borders for each cell being 1px on each side
          cell.div.style.width = ((this.width / this.size) - 2).toString() + 'px';
          cell.div.style.height = ((this.height / this.size) - 2).toString() + 'px';
        } else {
          cell.div.style.width = ((this.width / this.size)).toString() + 'px';
          cell.div.style.height = ((this.height / this.size)).toString() + 'px';
        }

        cells[i][j] = cell;
        this.div.appendChild(cell.div);
      }  
    }

    console.log(cells);

    return cells;
    /*
    for (let i = 0; i < totalSize; i++) {
      for (let j = 0; j < totalSize; j++) {
        let id = i + ' ' + j;

        let cell = document.createElement('DIV'); 
        cell.classList.add('cell');
        cell.classList.add('dead');
        cell.id = i + " " + j;

        // Only set the middle ones as visible
        if(!(i >= min && i <= max && j >= min && j <= max)) {
          cell.style.display = 'none';
        }

        // The '- 2' comes from the fact that the borders for each cell are 1px on each side
        cell.style.width = ((initWidth/size) - 2).toString() + 'px';
        cell.style.height = ((initHeight/size) - 2).toString() + 'px';

        cells[i][j] = cell;

        grid.appendChild(cell);

        cell.addEventListener('click', toggleCellState);
        cell.addEventListener('mouseover', function() {

          if(this.classList.contains('dead')) {
            this.classList.add('mouseover');
          }
        });

        cell.addEventListener('mouseout', function() {
          
          if(this.classList.contains('mouseover')) {
            this.classList.remove('mouseover');
          }
        });
      } 
    }

    return cells;
    */
  }

  toggleGrid() {

  }

  changeSize() {

  }
}
