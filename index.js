const grid = document.querySelector('.grid');
const container = document.querySelector('.container');
const startButton = document.querySelector('.start');
const speedButton = document.querySelector('.submit_speed');
const sizeButton = document.querySelector('.submit_size');
const toggleGridButton = document.querySelector('.toggle_grid');

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
    let newCellsToCheck = [];

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
  
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  cells = createGrid(size, grid);

  startGame();
}

function toggleGrid() {
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[0].length; j++) {
      if(isGrid) {
        cells[i][j].style.border = 'none'; 

        cells[i][j].style.width = ((initWidth/size)).toString() + 'px';
        cells[i][j].style.height = ((initHeight/size)).toString() + 'px';
      } else { 
        cells[i][j].style.border = '1px solid black'; 

        cells[i][j].style.width = ((initWidth/size) - 2).toString() + 'px';
        cells[i][j].style.height = ((initHeight/size) - 2).toString() + 'px';
      }
    }
  } 

  isGrid = !isGrid;
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
}

function toggleCellState() {
  if(this.classList.contains('alive')) {
    this.classList.remove('alive');
    this.classList.add('dead');
  } else {
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
  }
}

function getAllNeighbors(cell) {
  let neighbors = [];

  let rowAndCol = cell.id.split(' ');
  let i = parseInt(rowAndCol[0]);
  let j = parseInt(rowAndCol[1]);

  if(i - 1 >= 0 && j - 1 > 0) {
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

