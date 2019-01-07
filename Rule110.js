const grid = document.querySelector('.grid');
const container = document.querySelector('.container');
const startButton = document.querySelector('.start');
const speedButton = document.querySelector('.submit_speed');
const sizeButton = document.querySelector('.submit_size');
const toggleGridButton = document.querySelector('.toggle_grid');
const presetButton = document.querySelector('.submit_preset');
const convertToTextButton = document.querySelector('.convert_to_text');

let size = 50;
const initHeight = container.clientHeight;
const initWidth = container.clientWidth;

let updateTime = 500; // In milliseconds
let myInterval = 0;
let isPaused = true;
let isGrid = true;

let cells = createGrid(size, grid);

var currentRow = 0;

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
  //console.log(currentRow);
  if(!isPaused) {

    for (let i = 0; i < size; i++) {
      // fc = first cell
      let fc = null;
     
      if(i - 1 < 0) {
        fc = cells[currentRow][size - 1];
      } else {
        fc = cells[currentRow][i - 1];
      }
     
      // sc = second cell
      let sc = cells[currentRow][i];

      // tc = third cell
      let tc = null;

      if(i + 1 > size - 1) {
        tc = cells[currentRow][0];
      } else {
        tc = cells[currentRow][i + 1];
      }

      if(fc.classList.contains('alive')) {
        if(sc.classList.contains('alive')) {
          if(tc.classList.contains('alive')) {
            // Keep it dead
          } else {
            cells[currentRow + 1][i].classList.remove('dead');
            cells[currentRow + 1][i].classList.add('alive');
          }
        } else {
          if(tc.classList.contains('alive')) {
            cells[currentRow + 1][i].classList.remove('dead');
            cells[currentRow + 1][i].classList.add('alive');
          } else {
            // Keep it dead
          }
        }
      } else {
        if(sc.classList.contains('alive')) {
          if(tc.classList.contains('alive')) {
            cells[currentRow + 1][i].classList.remove('dead');
            cells[currentRow + 1][i].classList.add('alive');
          } else {
            cells[currentRow + 1][i].classList.remove('dead');
            cells[currentRow + 1][i].classList.add('alive');
          }
        } else {
          if(tc.classList.contains('alive')) {
            cells[currentRow + 1][i].classList.remove('dead');
            cells[currentRow + 1][i].classList.add('alive');
          } else {
            // Keep it dead
          }
        }
      }
    }

    currentRow++;
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

  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  cells = createGrid(size, grid);
  
  currentRow = 0;

  startGame();
}

function toggleGrid() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
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

      if(preset[i][j]) {
        if(cells[r][c].classList.contains('dead')) {
          cells[r][c].classList.remove('dead');
          cells[r][c].classList.add('alive');

          if(cellsToCheck.indexOf(cells[r][c]) === -1) {
            cellsToCheck.push(cells[r][c]); 
          }

          let neighbors = getAllNeighbors(cells[r][c]);

          for (let i = 0; i < neighbors.length; i++) {
            if(cellsToCheck.indexOf(neighbors[i]) === -1) {
              cellsToCheck.push(neighbors[i]);
            }
          }
        }
      } else {
        if(cells[r][c].classList.contains('alive')) {
          cells[r][c].classList.remove('alive');
          cells[r][c].classList.add('dead');
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
      } else {
        returnString += '0, ';
      }
    } 

    if(cells[i][2 * size - 1].classList.contains('alive')) {
      returnString += '1';
    } else {
      returnString += '0';
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

  for (let i = 0; i < size; i++) {
    cells[i] = [];
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = document.createElement('DIV'); 
      cell.classList.add('cell');
      cell.classList.add('dead');
      cell.id = i + " " + j;

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
    this.classList.add('dead');
  } else {
    this.classList.remove('dead');
    this.classList.add('alive');
  }
}
