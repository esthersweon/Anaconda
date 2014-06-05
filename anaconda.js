(function(root) {
	var AG = root.AG = (root.AG || {});

	var Coord = AG.Coord = function(x, y) {
		this.x = x;
		this.y = y;
	};

	Coord.prototype.plus = function(new_coord) {
		return new Coord(this.x + new_coord.x, this.y + new_coord.y)
	};

	var Anaconda = AG.Anaconda = function(board) {
		this.dir = "U";
		this.board = board;

		var center = new Coord(board.dimension/2, board.dimension/2);
		this.segments = [center];
	};

	Anaconda.DIFFS = {
	    "U": new Coord(-1, 0),
	    "R": new Coord(0, 1),
	    "D": new Coord(1, 0),
	    "L": new Coord(0, -1)
  	};

  	Anaconda.SYMBOL = "A"

	Anaconda.prototype.move = function() {
		var anaconda = this;
		var head = _(this.segments).last();
		var new_head = head.plus(Anacaonda.DIFFS[this.dir]);

		if (anaconda.eatsMouse(new_head)) {
			anaconda.segments.push(head.plus(Anaconda.DIFFS[this.dir]));
			this.board.mouse.replace();
		} else if (this.board.validMove(new_head)) {
			anaconda.segments.push(head.plus(Anaconda.DIFFS[thisdir]));
			anaconda.segments.shift();
		} else {
			anaconda.segments = [];
		}
	};

	Anaconda.prototype.eatsMouse = function(new_head_coord) {
		var mouse_coord = this.board.mouse.position;
		return (new_head_coord.x === mouse_coord.x) && (new_head_coord.y === mouse_coord.y)
	};

	Anaconda.prototype.turn = function(dir) {
		this.dir = dir;
	};

	var Board = AG.Board = function(dimension) {
		this.dimension = dimension;
		this.anaconda = new Anaconda(this);

		this.mouse = new Mouse(this);
		this.mouse.replace();
	};

	Board.BLANK = ".";

	Board.blankBoard = function(dimension) {
		return _.times(dimension, function () {
			return _.times(dimension, function () {
				return Board.BLANK
			});
		});
	};

	Board.prototype.validMove = function(coordinate) {
		var onBoard = (
			(coordinate.x >= 0) && (coordinate.x <= (dimension-1)) && 
			(coordinate.y >= 0) && (coordinate.y <= (dimension-1))
			);

		var clearCell = _(this.anaconda.segments).every(function(segment) {
			return (coordinate.x !== segment.x) || (coordinate.y !== seg.y);
		});

		return onBoard && clearCell;

	};

	Board.prototype.render = function() {
		var board = Board.blankBoard(this.dimension);

		_(this.anaconda.segments).each(function (segment) {
			board[segment.x][segment.y] = Anaconda.SYMBOL;
		});

		var mouse_position = this.mouse.position;

		board[mouse_position.x][mouse_position.y] = Mouse.SYMBOL;

		return _(board).map(function (row) {
			return row.join("");
		}).join("\n");
	};

	var Mouse = AG.Mouse = function(board) {
		this.board = board;
	};

	Mouse.SYMBOL = "M";

	Mouse.prototype.replace = function() {
		var x = Math.floor(Math.random() * this.board.dimension);
		var y = Math.floor(Math.random() * this.board.dimension);

		this.position = new Coord(x,y);
	};
})(this);