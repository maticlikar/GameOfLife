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

    this.presetButton = document.querySelector('.submit_preset');
    this.presetButton.addEventListener('click', this.convertTextToGrid.bind(this));
    
    this.convertToTextButton = document.querySelector('.convert_to_text');
    this.convertToTextButton.addEventListener('click', this.convertGridToText.bind(this));

    this.cells = this.populateCells();     
    this.cellsToCheck = [];
  }

  convertGridToText() {
    let returnString = '';

    returnString += this.size + '\n';

    returnString += '[\n';
    for (let i = this.size; i < 2 * this.size; i++) {
      returnString += '['
      for (let j = this.size; j < 2 * this.size - 1; j++) {
        if(this.cells[i][j].div.classList.contains('alive')) {
          returnString += '1, ';
        } else {
          returnString += '0, ';
        }
      } 

      if(this.cells[i][2 * this.size - 1].div.classList.contains('alive')) {
        returnString += '1';
      } else {
        returnString += '0';
      }

      if(i < 2 * this.size - 1) {
        returnString += '],\n';
      } else {
        returnString += ']\n';
      }
    }

    returnString += ']';

    document.querySelector('.preset_text').value = returnString;
  }

  convertTextToGrid() {
    let preset = document.querySelector('.preset_text').value.replace(/\s/g, "");

    if (preset.charAt(0) >= '0' && preset.charAt(0) <= '9') {
      let size = preset.split('[');
      size = parseInt(size[0]);

      document.querySelector('.size_text').value = size;

      this.sizeButton.click(); 
    }

    // Converting from string to 2D array
    preset = preset.split('[');
    preset.splice(0, 2);
    preset = preset.map(x => x.replace(/,/g, ''));
    preset = preset.map(x => x.replace(/]/g, ''));
    preset = preset.map(x => Array.from(x));
    preset = preset.map(x => x.map(y => parseInt(y)));

    if(preset.length > this.size) {
      window.alert("The size of array given is larger than size of current game." +
                   " Change the sizes to match each other.");
      return;
    }

    // Filling the cell array
    for (let i = 0; i < preset.length; i++) {
      if(preset[i].length > this.size) {
        window.alert("The size of array given is larger than size of current game." +
                     " Change the sizes to match each other.");
        return;
      }

      for (let j = 0; j < preset[i].length; j++) {

        let r = i + this.size;
        let c = j + this.size;

        if(preset[i][j]) {
          if(this.cells[r][c].div.classList.contains('dead')) {
            this.cells[r][c].div.classList.remove('dead');
            this.cells[r][c].div.classList.add('alive');

            if(this.game.cellsToCheck.indexOf(this.cells[r][c]) === -1) {
              this.game.cellsToCheck.push(this.cells[r][c]); 
            }

            let neighbors = this.cells[r][c].mooreNeighborhood();

            if(game.constructor.name === 'ConwayGameOfLife') {
              neighbors = this.cells[r][c].mooreNeighborhood();
            }

            for (let i = 0; i < neighbors.length; i++) {
              if(this.game.cellsToCheck.indexOf(neighbors[i]) === -1) {
                this.game.cellsToCheck.push(neighbors[i]);
              }
            }
          }
        } else {
          if(this.cells[r][c].div.classList.contains('alive')) {
            this.cells[r][c].div.classList.remove('alive');
            this.cells[r][c].div.classList.add('dead');
          }
        }
      } 
    }
  }

  populateCells() {
    let cells = [];

    for (let i = 0; i < this.totalSize; i++) {
      cells[i] = [];
    }

    for (let i = 0; i < this.totalSize; i++) {
      for (let j = 0; j < this.totalSize; j++) {
        let cell = new Cell(game, this, i, j);        

        // Only set the middle ones as visible
        if(!(i >= this.size && i < this.size * 2 && j >= this.size && j < this.size * 2)) {
          cell.div.style.display = 'none';
        }

        cell.div.id = i + ' ' + j;

        // Only set the width if it is visible on the screen
        if(i >= this.size && i < this.size * 2 && j >= this.size && j < this.size * 2) {
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

          this.div.appendChild(cell.div);
        }

        cells[i][j] = cell;
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
