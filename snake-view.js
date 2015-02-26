(function () {

  if(typeof window.SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el){
    this.$el = $el;
    this.board = new SnakeGame.Board();
    this.bindEvents();
    setInterval(this.step.bind(this), 500);
  }

  View.prototype.bindEvents = function (){
    this.$el.on('keydown', function (event) {
      handleKeyEvent.call(this, event);
    }.bind(this))
  }

  View.prototype.step = function () {
    this.$el.empty();
    this.board.snake.move();
    this.$el.append(this.board.render());
  }

  var handleKeyEvent = function(event) {
    switch (event.keyCode) {
      case 37:
        this.board.snake.turn("W");
        break;
      case 38:
        this.board.snake.turn("N");
        break;
      case 39:
        this.board.snake.turn("E");
        break;
      case 40:
        this.board.snake.turn("S");
        break;
      default:
        break;
    }
  }

  View.prototype.render(){
    
  }



})();
