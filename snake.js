(function () {
  if (typeof window.SnakeGame === "undefined")
  {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function () {
    this.dir = "S";
    this.segments = [new Coord(1,3), new Coord(1,2), new Coord(1,1)];
  }

  Snake.prototype.move = function(){
    var delta = getDelta(this.dir);
    this.segments.pop()

    var head = this.segments[0];
    var newHead = new Coord(head.pos[0], head.pos[1]);
    newHead.plus(delta);
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
    this.snake = new Snake();
    this.apples = [];
  }

  Board.prototype.render = function () {
    var state = "";
    for (y = 0; y < 10; y++)
    {
      for (x = 0; x < 10; x++)
      {
        if (this.snake.contains([x, y]))
        {
          state += " S ";
        }
        else
        {
          state += " . ";
        }
      }
      state += "<br>";
    }
    return state;
  }

})();
