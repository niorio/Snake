(function () {

  if(typeof window.SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el){
    this.$el = $el;
    this.board = new SnakeGame.Board();
    this.bindEvents();
    this.createBoard();
    this.$squares = this.$el.find('.board li');
    this.gameplay = setInterval(this.step.bind(this), 250);
  }

  View.prototype.bindEvents = function (){
    this.$el.on('keydown', function (event) {
      handleKeyEvent.call(this, event);
    }.bind(this))
  }

  View.prototype.step = function () {
    try {
      this.board.snake.move();
      this.render();
    }
    catch (gameOver){
      this.gameOverScreen();
    }
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

  View.prototype.createBoard = function(){
    var $board = $('<ul>').addClass('board group');
    for (var i = 0; i < 400; i++){
      $board.append($('<li>'));
    }
    this.$el.append($board);
  }

  View.prototype.render = function(){
    this.$squares.removeClass();
    var segmentIdx;

    for (var i = 0; i < this.board.snake.segments.length; i++){
      segmentIdx = this.board.snake.segments[i].flatCoord();
      this.$squares.eq(segmentIdx).addClass('snake');
    }

    var appleIdx = this.board.apple.flatCoord();

    this.$squares.eq(appleIdx).addClass('apple');
  }

  View.prototype.gameOverScreen = function (){
    clearInterval(this.gameplay);
    var gameover = $('<div>').text('Game Over').addClass('gameover');
    var retry = $('<div>').text('retry').addClass('retry');
    this.$el.find('.board').prepend(gameover, retry);

    this.$el.find('.retry').on('click', this.restart.bind(this));
  }

  View.prototype.restart = function () {
    this.$el.find('.gameover').remove();
    this.$el.find('.retry').remove();

    this.board = new SnakeGame.Board();
    this.gameplay = setInterval(this.step.bind(this), 250);
  }



})();
