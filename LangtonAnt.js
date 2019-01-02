const grid = document.querySelector('.grid');
const container = document.querySelector('.container');
const startButton = document.querySelector('.start');
const speedButton = document.querySelector('.submit_speed');
const sizeButton = document.querySelector('.submit_size');
const toggleGridButton = document.querySelector('.toggle_grid');
const presetButton = document.querySelector('.submit_preset');
const convertToTextButton = document.querySelector('.convert_to_text');

let size = 50;
let totalSize = size * 3;
const initHeight = container.clientHeight;
const initWidth = container.clientWidth;

let updateTime = 500; // In milliseconds
let myInterval = 0;
let isPaused = true;
let isGrid = true;

let ant = null;

let cells = createGrid(size, grid);

// 0 = N, 1 = E, 2 = S, 3 = W
var direction = 0;

startButton.addEventListener('click', togglePause);
speedButton.addEventListener('click', changeUpdateTime);
sizeButton.addEventListener('click', changeSize);
toggleGridButton.addEventListener('click', toggleGrid);
presetButton.addEventListener('click', convertTextToGrid);
convertToTextButton.addEventListener('click', convertGridToText);

startGame();

/* Start of Functions */

function startGame() {
  if(myInterval > 0) {
    clearInterval(myInterval);
  }

  myInterval = setInterval('rules()', updateTime);
}

function rules() {
  if(!isPaused) {
    if(ant.parentNode.classList.contains('alive')) {
      ant.click();

      if(direction === 3) {
        direction = 0;
      } else {
        direction++;
      }
    } else if(ant.parentNode.classList.contains('dead')) {
      ant.click();

      if(direction === 0) {
        direction = 3;
      } else {
        direction--;
      }
    }

    let cell = getNextCell(direction);   

    ant.remove();
    ant = document.createElement('DIV'); 
    ant.classList.add('ant');

    ant.style.width = cell.style.width;
    ant.style.height = cell.style.width;

    cell.appendChild(ant);
  }
}

function getNextCell(direction) {
  let rowCol = ant.parentNode.id.split(' ').map(x => parseInt(x));
  let row = rowCol[0];
  let col = rowCol[1];

  if(direction === 0) {
    if(col - 1 >= 0) {
      return cells[row][col - 1];
    }
  } else if(direction === 1) {
    if(row + 1 < cells.length) {
      return cells[row + 1][col];
    }
  } else if(direction === 2) {
    if(col + 1 < cells.length) {
      return cells[row][col + 1];
    }
  } else if(direction === 3) {
    if(row - 1 >= 0) {
      return cells[row - 1][col];
    }
  }

  return cells[row][col];
}

function togglePause() {
  isPaused = !isPaused;

  if(isPaused) {
    startButton.innerText = 'Start';
  } else {
    startButton.innerText = 'Pause';
  }
}

function changeUpdateTime() {
  updateTime = parseInt(document.querySelector('.speed_text').value);
  
  clearInterval(myInterval);
  
  startGame();
}

function changeSize() {
  size = parseInt(document.querySelector('.size_text').value);
  totalSize = size * 3;

  cellsToCheck = [];
  
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  cells = createGrid(size, grid);

  startGame();
}

function toggleGrid() {
  for (let i = size; i < 2 * size; i++) {
    for (let j = size; j < 2 * size; j++) {
      if(isGrid) {
        cells[i][j].style.border = 'none'; 

        cells[i][j].style.width = ((initWidth/size)).toString() + 'px';
        cells[i][j].style.height = ((initHeight/size)).toString() + 'px';
      } else { 
        cells[i][j].style.border = '1px solid lightgray'; 

        cells[i][j].style.width = ((initWidth/size) - 2).toString() + 'px';
        cells[i][j].style.height = ((initHeight/size) - 2).toString() + 'px';
      }
    }
  } 

  isGrid = !isGrid;
}

function convertTextToGrid() {
  let preset = document.querySelector('.preset_text').value.replace(/\s/g, "");
  let isAnt = false;

  if (preset.charAt(0) >= '0' && preset.charAt(0) <= '9') {
    let size = preset.split('[');
    size = parseInt(size[0]);

    document.querySelector('.size_text').value = size;

    sizeButton.click(); 
  }

  // Converting from string to 2D array
  preset = preset.split('[');
  preset.splice(0, 2);
  preset = preset.map(x => x.replace(/,/g, ''));
  preset = preset.map(x => x.replace(/]/g, ''));
  preset = preset.map(x => Array.from(x));
  preset = preset.map(x => x.map(y => parseInt(y)));

  if(preset.length > size) {
    window.alert("The size of array given is larger than size of current game." +
                 " Change the sizes to match each other.");
    return;
  }

  // Filling the cell array
  for (let i = 0; i < preset.length; i++) {
    if(preset[i].length > size) {
      window.alert("The size of array given is larger than size of current game." +
                   " Change the sizes to match each other.");
      return;
    }

    for (let j = 0; j < preset[i].length; j++) {

      let r = i + size;
      let c = j + size;

      if(preset[i][j] === 0) {
        if(cells[r][c].classList.contains('alive')) {
          cells[r][c].classList.remove('alive');
          cells[r][c].classList.add('dead');
        } else if(cells[r][c].classList.contains('ant')) {
          cells[r][c].classList.remove('ant');
          cells[r][c].classList.add('dead');
        }
      } else if(preset[i][j] === 1) {
        if(cells[r][c].classList.contains('dead')) {
          cells[r][c].classList.remove('dead');
          cells[r][c].classList.add('alive');
        } else if(cells[r][c].classList.contains('ant')) {
          cells[r][c].classList.remove('ant');
          cells[r][c].classList.add('alive');
        }
      } else {
        isAnt = true;

        if(cells[r][c].classList.contains('dead')) {
          cells[r][c].classList.remove('dead');
          cells[r][c].classList.add('ant');
        } else if(cells[r][c].classList.contains('alive')) {
          cells[r][c].classList.remove('alive');
          cells[r][c].classList.add('ant');
        }

        ant.classList.remove('ant');
        ant.classList.add('dead');

        ant = cells[r][c];
      }
    } 
  }
}

function convertGridToText() {
  let returnString = '';

  returnString += size + '\n';

  returnString += '[\n';
  for (let i = size; i < 2 * size; i++) {
    returnString += '['
    for (let j = size; j < 2 * size - 1; j++) {
      if(cells[i][j].classList.contains('alive')) {
        if(cells[i][j].firstChild !== null) {
          if(cells[i][j].firstChild.classList.contains('ant')) {
            returnString += '2, ';
          } else {
            returnString += '1, ';
          }
        } else {
          returnString += '1, ';
        }
      } else if(cells[i][j].classList.contains('dead')) {
        if(cells[i][j].firstChild !== null) {
          if(cells[i][j].firstChild.classList.contains('ant')) {
            returnString += '2, ';
          } else {
            returnString += '0, ';
          }
        } else {
          returnString += '0, ';
        }
      }
    } 

    if(cells[i][2 * size - 1].classList.contains('alive')) {
      if(cells[i][2 * size - 1].firstChild !== null) {
        if(cells[i][2 * size - 1].firstChild.classList.contains('ant')) {
          returnString += '2';
        } else {
          returnString += '1';
        }
      } else {
        returnString += '1';
      }
    } else if(cells[i][2 * size - 1].classList.contains('dead')) {
      if(cells[i][2 * size - 1].firstChild !== null) {
        if(cells[i][2 * size - 1].firstChild.classList.contains('ant')) {
          returnString += '2';
        } else {
          returnString += '0';
        }
      } else {
        returnString += '0';
      }
     
    }

    if(i < 2 * size - 1) {
      returnString += '],\n';
    } else {
      returnString += ']\n';
    }
  }

  returnString += ']';

  document.querySelector('.preset_text').value = returnString;
}

function createGrid(size, grid) {
  let cells = [];

  for (let i = 0; i < totalSize; i++) {
    cells[i] = [];
  }

  let min = size;
  let max = size + (size - 1);

  for (let i = 0; i < totalSize; i++) {
    for (let j = 0; j < totalSize; j++) {
      let cell = document.createElement('DIV'); 
      cell.classList.add('cell');
      cell.classList.add('dead');
      cell.id = i + " " + j;

      // Only set the middle ones as visible
      if(!(i >= min && i <= max && j >= min && j <= max)) {
        cell.style.display = 'none';
      }

      if(i >= min && i <= max && j >= min && j <= max) {
        if(isGrid) {
          // The '-2' comes from the fact that the borders for each cell are 1px on each side
          cell.style.width = ((initWidth/size) - 2).toString() + 'px';
          cell.style.height = ((initHeight/size) - 2).toString() + 'px';
        } else {
          cell.style.width = ((initWidth/size)).toString() + 'px';
          cell.style.height = ((initHeight/size)).toString() + 'px';
        }

        grid.appendChild(cell);
      }

      cells[i][j] = cell;

      cell.addEventListener('click', toggleCellState);
      cell.addEventListener('dblclick', positionAnt);

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

  let mid = Math.floor(totalSize / 2);

  ant = document.createElement('DIV');
  ant.classList.add('ant');
  ant.style.width = cells[mid][mid].style.width;
  ant.style.height = cells[mid][mid].style.width;
  cells[mid][mid].appendChild(ant);

  direction = 0;

  return cells;
}

function positionAnt() {
  ant.remove();
  ant = document.createElement('DIV'); 
  ant.classList.add('ant');

  ant.style.width = this.style.width;
  ant.style.height = this.style.width;

  this.appendChild(ant);
}

function toggleCellState() {
  if(this.classList.contains('alive')) {
    this.classList.remove('alive');
    this.classList.add('dead');
  } else if(this.classList.contains('dead')) {
    this.classList.remove('dead');
    this.classList.add('alive');
  }
}
