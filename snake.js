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

    if (newHead.equals(this.board.apple)){
      this.board.resetApple();
    } else{
      this.segments.pop()
    }

    this.segments.unshift(newHead);

  }

  Snake.prototype.turn = function(newdir){
    this.dir = newdir;
  }

  Snake.prototype.contains = function(coord) {
    for (var i = 0; i < this.segments.length; i++)
    {
      if (this.segments[i].equals(coord))
      {
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

  Coord.prototype.plus = function(coord) {
    this.pos[0] += coord[0];
    this.pos[1] += coord[1];
  }

  Coord.prototype.equals = function(coord) {
    return (this.pos[0] === coord[0]) && (this.pos[1] === coord[1]);
  }

  Coord.prototype.isOpposite = function(coord) {

  }

  var Board = SnakeGame.Board = function(){
    var board = this;
    this.snake = new Snake(board);
    this.resetApple();
  }

  Board.prototype.resetApple = function(){
    do {
      var x = Math.floor(Math.random() * 20);
      var y = Math.floor(Math.random() * 20);
      var pos = [x,y];
    } while (this.snake.contains(pos));

    this.apple = pos;

  }

  Board.prototype.render = function () {
    var state = "";
    for (y = 0; y < 20; y++)
    {
      for (x = 0; x < 20; x++)
      {
        if (this.snake.contains([x, y]))
        {
          state += "S";
        }
        else if (this.apple[0] === x && this.apple[1] === y)
        {
          state += "A";
        }
        else{
          state += "."
        }
      }
      state += "<br>";
    }
    return state;
  }

})();
