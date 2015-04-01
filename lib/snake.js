(function () {
  if (typeof window.SnakeGame === "undefined")
  {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (board) {
    this.dir = "S";
    this.segments = [new Coord(1,3), new Coord(1,2), new Coord(1,1)];
    this.board = board;
  }

  Snake.prototype.move = function(){
    var delta = getDelta(this.dir);

    var head = this.segments[0];
    var newHead = new Coord(head.pos[0], head.pos[1]);
    newHead.plus(delta);

    if (newHead.equals(this.board.apple)) {      //eat apple, grow
      this.board.resetApple();
      this.board.score += 1;
    } else if (this.contains(newHead)) {         //eat self, die
      throw gameOver;
    } else if (newHead.outOfBounds()) {          //hit edge
      throw gameOver;
    } else {                                     //snake moves, doesn't grow
      this.segments.pop()
    }

    this.segments.unshift(newHead);

  }

  Snake.prototype.turn = function(newdir){
    this.dir = newdir;
  }

  Snake.prototype.contains = function(coord) {
    for (var i = 0; i < this.segments.length; i++) {
      if (this.segments[i].equals(coord)) {
        return true;
      }
    }
    return false;
  }

  var getDelta = function(dir){
    switch (dir) {
      case "N":
        return [0,-1];
        break;
      case "S":
        return [0,1];
        break;
      case "E":
        return [1,0];
        break;
      default:
        return [-1,0];
        break;
    }
  }

  var Coord = SnakeGame.Coord = function(x, y){
    this.pos = [x, y];
  }

  Coord.prototype.plus = function(delta) {
    this.pos[0] += delta[0];
    this.pos[1] += delta[1];
  }

  Coord.prototype.equals = function(coord) {
    return (this.pos[0] === coord.pos[0]) && (this.pos[1] === coord.pos[1]);
  }

  Coord.prototype.flatCoord = function(coord) {
    return (this.pos[0] + (this.pos[1] * 20) )
  }

  Coord.prototype.outOfBounds = function(){
    if (this.pos[0] < 0 || this.pos[0] >= 20  ||
        this.pos[1] < 0 || this.pos[1] >= SnakeGame.height){
      return true;
    }
    return false;
  }

  var Board = SnakeGame.Board = function(height){
    var board = this;
    this.snake = new Snake(board);
    this.resetApple();
    this.score = 0;
  }

  Board.prototype.resetApple = function(){
    var apple;
    do {
      var x = Math.floor(Math.random() * 20);
      var y = Math.floor(Math.random() * SnakeGame.height);
      apple = new Coord(x, y);
    } while (this.snake.contains(apple));

    this.apple = apple;

  }

})();
