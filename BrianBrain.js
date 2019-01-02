const grid = document.querySelector('.grid');
const container = document.querySelector('.container');
const startButton = document.querySelector('.start');
const speedButton = document.querySelector('.submit_speed');
const sizeButton = document.querySelector('.submit_size');
const toggleGridButton = document.querySelector('.toggle_grid');
const presetButton = document.querySelector('.submit_preset');
const convertToTextButton = document.querySelector('.convert_to_text');

let size = 100;
let totalSize = size * 3;
const initHeight = container.clientHeight;
const initWidth = container.clientWidth;

let updateTime = 500; // In milliseconds
let myInterval = 0;
let isPaused = true;
let isGrid = true;

let cells = createGrid(size, grid);
let cellsToCheck = [];

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
    let kill = [];
    let revive = [];
    let dying = [];
    let newCellsToCheck = [];

    for (let i = 0; i < cellsToCheck.length; i++) {
      let neighbors = getAllNeighbors(cellsToCheck[i]);
      let aliveNeighbors = 0;

      for (let k = 0; k < neighbors.length; k++) {
        if(neighbors[k].classList.contains('alive')) {
          aliveNeighbors++;
        }
      }

      if(cellsToCheck[i].classList.contains('dead')) {
        if(aliveNeighbors === 2) {
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
      } else if(cellsToCheck[i].classList.contains('alive')) {
        dying.push(cellsToCheck[i]);
      } else {
        kill.push(cellsToCheck[i]);
      }

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
      kill[i].classList.remove('dying');
      kill[i].classList.add('dead');
    }

    for(let i = 0; i < revive.length; i++) {
      revive[i].classList.remove('dead');
      revive[i].classList.add('alive');
    }

    for(let i = 0; i < dying.length; i++) {
      dying[i].classList.remove('alive');
      dying[i].classList.add('dying');
    }
  }
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
        } else if(cells[r][c].classList.contains('dying')) {
          cells[r][c].classList.remove('dying');
          cells[r][c].classList.add('dead');
        }
      } else if(preset[i][j] === 1) {
        if(cells[r][c].classList.contains('dead')) {
          cells[r][c].classList.remove('dead');
          cells[r][c].classList.add('alive');
        } else if(cells[r][c].classList.contains('dying')) {
          cells[r][c].classList.remove('dying');
          cells[r][c].classList.add('alive');
        }

        if(cellsToCheck.indexOf(cells[r][c]) === -1) {
          cellsToCheck.push(cells[r][c]); 
        }

        let neighbors = getAllNeighbors(cells[r][c]);

        for (let i = 0; i < neighbors.length; i++) {
          if(cellsToCheck.indexOf(neighbors[i]) === -1) {
            cellsToCheck.push(neighbors[i]);
          }
        }
      } else {
        if(cells[r][c].classList.contains('alive')) {
          cells[r][c].classList.remove('alive');
          cells[r][c].classList.add('dying');
        } else if(cells[r][c].classList.contains('dead')) {
          cells[r][c].classList.remove('dead');
          cells[r][c].classList.add('dying');
        }
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
        returnString += '1, ';
      } else if(cells[i][j].classList.contains('dead')) {
        returnString += '0, ';
      } else {
        returnString += '2, ';
      }
    } 

    if(cells[i][2 * size - 1].classList.contains('alive')) {
      returnString += '1';
    } else if(cells[i][2 * size - 1].classList.contains('dead')) {
      returnString += '0';
    } else {
      returnString += '2';
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
          cell.style.border = '1px solid lightgray';
        } else {
          cell.style.width = ((initWidth/size)).toString() + 'px';
          cell.style.height = ((initHeight/size)).toString() + 'px';
          cell.style.border = 'none';
        }

        grid.appendChild(cell);
      }

      cells[i][j] = cell;

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
}

function toggleCellState() {
  if(this.classList.contains('alive')) {
    this.classList.remove('alive');
    this.classList.add('dying');
  } else if(this.classList.contains('dead')) {
    this.classList.remove('dead');
    this.classList.add('alive');

    if(cellsToCheck.indexOf(this) === -1) {
      cellsToCheck.push(this); 
    }

    let neighbors = getAllNeighbors(this);

    for (let i = 0; i < neighbors.length; i++) {
      if(cellsToCheck.indexOf(neighbors[i]) === -1) {
        cellsToCheck.push(neighbors[i]);
      }
    }
  } else {
    this.classList.remove('dying');
    this.classList.add('dead');
  }
}

function getAllNeighbors(cell) {
  let neighbors = [];

  let rowAndCol = cell.id.split(' ');
  let i = parseInt(rowAndCol[0]);
  let j = parseInt(rowAndCol[1]);

  if(i - 1 >= 0 && j - 1 >= 0) {
    let cell = cells[i - 1][j - 1];

    neighbors.push(cell);
  }

  if(i - 1 >= 0) {
    let cell = cells[i - 1][j];

    neighbors.push(cell);
  }

  if(i - 1 >= 0 && j + 1 < totalSize) {
    let cell = cells[i - 1][j + 1];

    neighbors.push(cell);
  }

  if(j - 1 >= 0) {
    let cell = cells[i][j - 1];

    neighbors.push(cell);
  }

  if(j + 1 < totalSize) {
    let cell = cells[i][j + 1];

    neighbors.push(cell);
  }

  if(i + 1 < totalSize && j - 1 >= 0) {
    let cell = cells[i + 1][j - 1];

    neighbors.push(cell);
  }

  if(i + 1 < totalSize) {
    let cell = cells[i + 1][j];

    neighbors.push(cell);
  }

  if(i + 1 < totalSize && j + 1 < totalSize) {
    let cell = cells[i + 1][j + 1];

    neighbors.push(cell);
  }

  return neighbors;
}

