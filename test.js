let grid = new Grid(3);
let updateTime = 1000; 

let game = new ConwayGameOfLife(grid, updateTime);

game.start(game.interval, game);
