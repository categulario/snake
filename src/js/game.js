/**
 * the snake logic
 *
 * @Categulario
 */
$(document).ready(function() {
	//Canvas stuff
	var canvas = $("#canvas")[0]
	var ctx = canvas.getContext("2d")
	var w = Math.floor($("#canvas").width()/10)*10
	var h = Math.floor($("#canvas").height()/10)*10
	var game_loop //el intervalo
	var event_queue = [] // una cola para los eventos de movimiento
	var running = true

	//Lets save the cell width in a variable for easy control
	var cw = 10
	var d
	var food
	var score

	var interval = 75

	//Lets create the snake now
	var snake_array //an array of cells to make up the snake

	function init() {
		d = "right" //default direction
		create_snake()
		create_food() //Now we can see the food particle
		//finally lets display the score
		score = 0

		//Lets move the snake now using a timer which will trigger the paint function
		//every 60ms
		if(typeof game_loop != "undefined") clearInterval(game_loop)
		game_loop = setInterval(paint, interval)
	}

	init()

	/* display a message on the screen */
	function message() {

	}

	function create_snake() {
		var length = 5 //Length of the snake
		snake_array = [] //Empty array to start with
		for(var i = length-1; i>=0; i--) {
			//This will create a horizontal snake starting from the top left
			snake_array.push({x: i, y:0})
		}
	}

	//Lets create the food now
	function create_food() {
		// evita poner comida sobre la serpiente
		do {
			food = {
				x: Math.round(Math.random()*(w-cw)/cw),
				y: Math.round(Math.random()*(h-cw)/cw),
			}
		} while(snake_array.filter(function(o){
			return o.x == food.x && o.y == food.y
		}).length != 0)
	}

	//Lets paint the snake now
	function paint() {
		// retirar los eventos ahora, si existen
		var next_event = event_queue.shift()
		if (next_event != undefined) {
			d = next_event
		}

		ctx.font = '20px monospace'
		//To avoid the snake trail we need to paint the BG on every frame
		//Lets paint the canvas now
		ctx.fillStyle = "#CCF3F8"
		ctx.fillRect(0, 0, w, h)

		//The movement code for the snake to come here.
		//The logic is simple
		//Pop out the tail cell and place it infront of the head cell
		var nx = snake_array[0].x
		var ny = snake_array[0].y
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		if(d == "right") nx++
		else if(d == "left") nx--
		else if(d == "up") ny--
		else if(d == "down") ny++

		//Lets add the game over clauses now
		//This will restart the game if the snake hits the wall
		//Lets add the code for body collision
		//Now if the head of the snake bumps into its body, the game will restart
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array)) {
			clearInterval(game_loop)
			$.magnificPopup.open({
				items: {
					src: '<div class="popup">Has perdido! <a href="">reiniciar</a></div>', // can be a HTML string, jQuery object, or CSS selector
					type: 'inline'
				},
				modal: true
			});
		}

		//Lets write the code to make the snake eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
		if(nx == food.x && ny == food.y) {
			var tail = {x: nx, y: ny}
			score++
			$('#score').text(score)

			// incrementar la velocidad
			// interval -= 25
			// if(interval > 0){
			// 	clearInterval(game_loop)
			// 	setInterval(paint, interval)
			// }

			//Create new food
			create_food()
		} else {
			var tail = snake_array.pop() //pops out the last cell
			tail.x = nx
			tail.y = ny
		}
		//The snake can now eat the food.

		snake_array.unshift(tail) //puts back the tail as the first cell

		for(var i = 0; i < snake_array.length; i++) {
			var c = snake_array[i]
			//Lets paint 10px wide cells
			paint_cell(c.x, c.y, i, snake_array.length)
		}

		//Lets paint the food
		paint_cell(food.x, food.y, 0)
	}

	//Lets first create a generic function to paint cells
	function paint_cell(x, y, i, len) {
		if(i===0) {
			ctx.fillStyle = "#DA4A0E";
		} else {
			var color = Color("#266E35");
			ctx.fillStyle = color.lighten(.025*i).hexString()
		}
		ctx.fillRect(x*cw, y*cw, cw, cw)
	}

	function check_collision(x, y, array) {
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++) {
			if(array[i].x == x && array[i].y == y) {
				return true
			}
		}
		return false
	}

	//Lets add the keyboard controls now
	$(document).keydown(function(e) {
		var key = e.which
		//We will add another clause to prevent reverse gear

		var last = event_queue[event_queue.length-1] || d

		if(key == "37" && last != "right"){
			event_queue.push('left')
		} else if(key == "38" && last != "down") {
			event_queue.push("up")
		} else if(key == "39" && last != "left") {
			event_queue.push("right")
		} else if(key == "40" && last != "up") {
			event_queue.push("down")
		} else if(key == '32') {
			if(running) {
				clearInterval(game_loop)
				$('#stop-btn').removeClass('pause').addClass('play')
				running = false
			} else {
				game_loop = setInterval(paint, interval)
				$('#stop-btn').removeClass('play').addClass('pause')
				running = true
			}
		}
		//The snake is now keyboard controllable
	})

	/**
	 * touch controls
	 */
	$(canvas).hammer().on("dragdown", function(event) {
		var last = event_queue[event_queue.length-1] || d
		if(last != 'up' && last != 'down') {
			event_queue.push('down')
		}
	})
	$(canvas).hammer().on("dragup", function(event) {
		var last = event_queue[event_queue.length-1] || d
		if(last != 'down' && last != 'up') {
			event_queue.push('up')
		}
	})
	$(canvas).hammer().on("dragright", function(event) {
		var last = event_queue[event_queue.length-1] || d
		if(last != 'left' && last != 'right') {
			event_queue.push('right')
		}
	})
	$(canvas).hammer().on("dragleft", function(event) {
		var last = event_queue[event_queue.length-1] || d
		if(last != 'right' && last != 'left') {
			event_queue.push('left')
		}
	})

	$('#stop-btn').on('click', function(event) {
		if(running) {
			clearInterval(game_loop)
			$(this).removeClass('pause').addClass('play')
			running = false
		} else {
			game_loop = setInterval(paint, interval)
			$(this).removeClass('play').addClass('pause')
			running = true
		}
	})

});