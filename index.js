const grid = document.querySelector('.grid');
const container = document.querySelector('.container');
const startButton = document.querySelector('.start');
const speedInput = document.querySelector('.speed');

let size = 80;
const initHeight = container.clientHeight;
const initWidth = container.clientWidth;

let updateTime = 500; // In milliseconds
let myInterval = 0;
let isPaused = true;

createGrid(size, grid);

let cells = document.getElementsByClassName('cell');

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

    for (let i = 0; i < cells.length; i++) {
      let neighbors = countNeighbors(i, cells);

      if(cells[i].classList.contains('alive')) {
        if(neighbors < 2 || neighbors > 3) {
          kill.push(i);
        }
      }

      if(cells[i].classList.contains('dead')) {
        if(neighbors == 3) {
          revive.push(i);
        }
      }
    }

    for(let i = 0; i < kill.length; i++) {
      let cellIndex = kill[i];

      cells[cellIndex].classList.remove('alive');
      cells[cellIndex].classList.add('dead');
    }

    for(let i = 0; i < revive.length; i++) {
      let cellIndex = revive[i];
      
      cells[cellIndex].classList.remove('dead');
      cells[cellIndex].classList.add('alive');
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
  for (let i = 0; i < size * size; i++) {
    let cell = document.createElement('DIV'); 
    cell.classList.add('cell');
    cell.classList.add('dead');
    cell.id = i;

    // The '- 2' comes from the fact that the borders for each cell are 1px on each side
    cell.style.width = ((initWidth/size) - 2).toString() + 'px';
    cell.style.height = ((initHeight/size) - 2).toString() + 'px';

    grid.appendChild(cell);


    cell.addEventListener('click', toggleCellState);
  }
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

function countNeighbors(index, cells) {
  let count = 0;

  if(index - size - 1 > 0) {
    if(index >= size && index % size != 0) {
      let cell = document.getElementById((index - size - 1).toString());
   
      if(cell.classList.contains('alive')) { count++; }
    }
  }

  if(index - size > 0) {
    if(index >= size) {
      let cell = document.getElementById((index - size).toString());

      if(cell.classList.contains('alive')) { count++; }
    }
  }

  if(index - size + 1 > 0) {
    if(index >= size && index % size != (size - 1)) {
      let cell = document.getElementById((index - size + 1).toString());

      if(cell.classList.contains('alive')) { count++; }
    }
  }

  if(index - 1 > 0) {
    if(index % size != 0) {
      let cell = document.getElementById((index - 1).toString());

      if(cell.classList.contains('alive')) { count++; }
    }
  }

  if(index + 1 < cells.length) {
    if(index % size != (size - 1)) {
      let cell = document.getElementById((index + 1).toString());

      if(cell.classList.contains('alive')) { count++; }
    }
  }

  if(index + size - 1 < cells.length) {
    if(index < size * size - size && index % size != 0) {
      let cell = document.getElementById((index + size - 1).toString());

      if(cell.classList.contains('alive')) { count++; }
    }
  }

  if(index + size < cells.length) {
    if(index < size * size - size) {
      let cell = document.getElementById((index + size).toString());

      if(cell.classList.contains('alive')) { count++; }
    }
  }

  if(index + size + 1 < cells.length) {
    if(index < size * size - size && index % size != (size - 1)) {
      let cell = document.getElementById((index + size + 1).toString());

      if(cell.classList.contains('alive')) { count++; }
    }
  }

  return count;
}
