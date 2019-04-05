// Computer makes a move with algorithm choice and skill/depth level
var makeMove = function(algo, skill=3) {
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm

  if (algo === 1) {
    var move = eval3(skill, game, game.turn())[1];
  } else if (algo === 2) {
    var move = calcBestMove(skill, game, game.turn())[1];
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

var loopGame = function()
{
  var max = 4;
  var min = 1;
  var max2 = 4;
  var random;
  var random2;
  var random3;
  for(i = 0; i < 1; i++)
  {
    random = Math.floor(Math.random() * (+max - +min)) + +min;
    random2 = Math.floor(Math.random() * (+max2 - +min)) + +min;
    random3 = Math.floor(Math.random() * (+max2 - +min)) + +min;
    //console.log("Using", random, ", ", random2, ", ", random3);
    playGame(random, random2, random3);
    console.log("YES");
  }
}
// Computer vs Computer
var playGame = function(algo=4, skillW=2, skillB=2) {
  if(game.in_stalemate()){
    console.log("Stalemate!");
    console.log("Using", algo, ", ", skillW, ", ", skillB);
    game.reset();
    return;
  }
  if(game.in_draw()){
    console.log("Draw!")
    console.log("Using", algo, ", ", skillW, ", ", skillB);
    game.reset();
    return;
  }
  if(game.in_checkmate()){
    if(game.turn() == 'w'){
      console.log("Black wins!");
      console.log("Using", algo, ", ", skillW, ", ", skillB);
    }
    else{
      console.log("White wins!");
      console.log("Using", algo, ", ", skillW, ", ", skillB);
    }
    game.reset();
    return;
  }
  var skill = game.turn() === 'w' ? skillW : skillB;
  makeMove(algo, skill);
  window.setTimeout(function() {
    playGame(algo, skillW, skillB);
  }, 1000);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // If illegal move, snapback
  if (move === null) return 'snapback';

  // Log the move
  console.log(move)

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
};
