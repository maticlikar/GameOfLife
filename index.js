const grid = document.querySelector('.grid');
const container = document.querySelector('.container');
const startButton = document.querySelector('.start');
const speedInput = document.querySelector('.speed');

let size = 50;
let totalSize = size * 3;
const initHeight = container.clientHeight;
const initWidth = container.clientWidth;

let updateTime = 500; // In milliseconds
let myInterval = 0;
let isPaused = true;

let cells = createGrid(size, grid);

startButton.addEventListener('click', togglePause);
speedInput.addEventListener('change', updateSpeed);

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

    for (let i = 0; i < totalSize; i++) {
      for (let j = 0; j < totalSize; j++) {
        let neighbors = countNeighbors(i, j, cells);

        if(cells[i][j].classList.contains('alive')) {
          if(neighbors < 2 || neighbors > 3) {
            kill.push([i, j]);
          }
        }

        if(cells[i][j].classList.contains('dead')) {
          if(neighbors == 3) {
            revive.push([i, j]);
          }
        }
      }
    }

    for(let i = 0; i < kill.length; i++) {
      let cellIndicies = kill[i];

      let row = cellIndicies[0];
      let col = cellIndicies[1];

      cells[row][col].classList.remove('alive');
      cells[row][col].classList.add('dead');
    }

    for(let i = 0; i < revive.length; i++) {
      let cellIndicies = revive[i];

      let row = cellIndicies[0];
      let col = cellIndicies[1];

      cells[row][col].classList.remove('dead');
      cells[row][col].classList.add('alive');
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

function updateSpeed() {
  updateTime = speedInput.value;
  
  startGame();
}

function createGrid(size, grid) {
  let cells = [];

  for (let i = 0; i < totalSize; i++) {
    cells[i] = [];
  }

  for (let i = 0; i < totalSize; i++) {
    for (let j = 0; j < totalSize; j++) {
      let cell = document.createElement('DIV'); 
      cell.classList.add('cell');
      cell.classList.add('dead');
      cell.id = i + " " + j;

      let min = size;
      let max = size + (size - 1);

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
  }
}

function countNeighbors(i, j, cells) {
  let count = 0;

  if(i - 1 >= 0 && j - 1 > 0) {
    let cell = cells[i - 1][j - 1];

    if(cell.classList.contains('alive')) { count++; }
  }

  if(i - 1 >= 0) {
    let cell = cells[i - 1][j];

    if(cell.classList.contains('alive')) { count++; }
  }

  if(i - 1 >= 0 && j + 1 < totalSize) {
    let cell = cells[i - 1][j + 1];

    if(cell.classList.contains('alive')) { count++; }
  }

  if(j - 1 >= 0) {
    let cell = cells[i][j - 1];

    if(cell.classList.contains('alive')) { count++; }
  }

  if(j + 1 < totalSize) {
    let cell = cells[i][j + 1];

    if(cell.classList.contains('alive')) { count++; }
  }

  if(i + 1 < totalSize && j - 1 >= 0) {
    let cell = cells[i + 1][j - 1];

    if(cell.classList.contains('alive')) { count++; }
  }

  if(i + 1 < totalSize) {
    let cell = cells[i + 1][j];

    if(cell.classList.contains('alive')) { count++; }
  }

  if(i + 1 < totalSize && j + 1 < totalSize) {
    let cell = cells[i + 1][j + 1];

    if(cell.classList.contains('alive')) { count++; }
  }

  return count;
}
