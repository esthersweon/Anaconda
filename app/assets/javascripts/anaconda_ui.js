(function (root) {
	var AG = root.AG = (root.AG || {});

	var View = AG.View = function ($el) {
		this.$el = $el;
		this.board = null; 
		this.intervalID = null;
	};

	View.KEYS = {
		37: "L",
		38: "U", 
		39: "R",
		40: "D"
	};

	View.STEP_INTERVAL = 100;

	View.prototype.handleKeyEvent = function (event) {
		if (_(View.KEYS).has(event.keyCode)) {
			this.board.anaconda.turn(View.KEYS[event.keyCode]);
		} else {
			//do nothing
		}
	};

	View.prototype.render = function() {
		var view = this; 
		var board = view.board;

		function buildCells () {
			return _.times(board.dimension, function () {
				return _.times(board.dimension, function () {
					return $('<div class="cell"></div>');
				});
			});
		}

		var cellsMatrix = buildCells();

		_(board.anaconda.segments).each(function (segment) {
			cellsMatrix[segment.x][segment.y].addClass("anaconda");
		});

		cellsMatrix[board.mouse.position.x][board.mouse.position.y].addClass("mouse");

		this.$el.empty();
		_(cellsMatrix).each(function (row) {
			var $rowEl = $('<div class="row"></div>');
			_(row).each(function ($cell) {
				$rowEl.append($cell)
			});
			view.$el.append($rowEl);
		});
	};

	View.prototype.step = function () {
		if (_(this.board.anaconda.segments).last()) {
			this.board.anaconda.move();
			this.render();
		} else {
			alert("You lose!");
			window.clearInterval(this.intervalID);
		}
	};

	View.prototype.start = function () {
		this.board = new AG.Board(20);

		$(window).keydown(this.handleKeyEvent.bind(this));

		this.intervalID = window.setInterval(
			this.step.bind(this),
			View.STEP_INTERVAL
		);
	};
})(this);