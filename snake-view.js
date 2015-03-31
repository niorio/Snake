(function () {

  if(typeof window.SnakeGame === "undefined"){
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function($el){
    this.$el = $el;
    this.bindEvents();
    this.createBoard();
    this.board = new SnakeGame.Board();
    this.$squares = this.$el.find('.board li');
    this.selectDifficulty();
  }

  View.prototype.bindEvents = function (){
    this.$el.on('keydown', function (event) {
      handleKeyEvent.call(this, event);
    }.bind(this))
  }

  View.prototype.selectDifficulty = function (){
    var $easy = $('<div class="easy" data-speed="250">easy</div>');
    var $med = $('<div class="med" data-speed="150">medium</div>');
    var $hard = $('<div class="hard" data-speed="100">hard</div>');
    var $insane = $('<div class="insane" data-speed="50">insane</div>');

    var $buttons = $('<div class="buttons">').append($easy, $med, $hard, $insane);


    this.$el.find('.board').prepend($buttons);
    this.$el.find('.buttons > *').on('click', this.start.bind(this));

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
    var $title = $('<h1>Snake</h1>').addClass('gametitle');
    this.$el.append($title);

    var squareCount = 400;

    if (window.innerHeight < 660){
      squareCount = Math.floor((window.innerHeight - 56)/ 30) * 20;
    }
    SnakeGame.height = squareCount / 20;

    var $board = $('<ul>').addClass('board group');
    for (var i = 0; i < squareCount; i++){
      $board.append($('<li>'));
    }

    var $score = $('<h2>').addClass('score');
    $board.append($score);

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
    this.renderScore();
  }

  View.prototype.renderScore = function () {
    if (this.score !== this.board.score){
      this.score = this.board.score;
      this.$el.find('.score').text("Score: " + this.score);
    }
  }

  View.prototype.gameOverScreen = function (){
    clearInterval(this.gameplay);
    var $gameover = $('<div class="gameover">Game Over</div>');
    this.$el.find('.board').prepend($gameover);

    this.selectDifficulty();
  }

  View.prototype.start = function (event) {
    var speed = $(event.currentTarget).data('speed');

    this.$el.find('.gameover').remove();
    this.$el.find('.buttons').remove();

    this.board = new SnakeGame.Board();
    this.gameplay = setInterval(this.step.bind(this), speed);
  }



})();
