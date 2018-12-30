let updateTime = 100; 

// Has to be named game
let game = new ConwayGameOfLife(updateTime);

let grid = new Grid(game, 50);

game.start();
