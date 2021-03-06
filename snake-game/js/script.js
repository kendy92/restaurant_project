const game = function () {
	const canvas = document.getElementById('gameboard')
	const initialSnakeLength = 4
	let ctx
	let partLength = 12
	let frameRate
	let fruitMax
	let barriersMax
	let score
	let speed = 1
	let direction
	let previousDirection
	let snake
	let gameLoop
	let fruits
	let loaded_images = 0
	let currentShark
	let barriers
	const images = {
		head: {src: './img/head.png', object: null},
		snakeBody: {src: './img/body.png', object: null},
		bubble: {src: './img/Bubble.png', object: null, items: []},
		background: {src: './img/BG.jpg', object: null},
		reef: {src: './img/reef.png', object: null, size: 0.6},
		shark_left: {src: './img/Shark_left.png', object: null, size: 0.4, position: {x: null, y: null}},
		shark_right: {src: './img/Shark_right.png', object: null, size: 0.4, position: {x: null, y: null}},
		fish1: {src: './img/fishes/fish1.png', object: null},
		fish2: {src: './img/fishes/fish2.png', object: null},
		fish3: {src: './img/fishes/fish3.png', object: null},
		fish4: {src: './img/fishes/fish4.png', object: null},
		fish5: {src: './img/fishes/fish5.png', object: null},
		whirpool1: {src: './img/whirlpool/whirlpoo_01.png', object: null},
		whirpool2: {src: './img/whirlpool/whirlpoo_02.png', object: null},
		whirpool3: {src: './img/whirlpool/whirlpoo_03.png', object: null},
		whirpool4: {src: './img/whirlpool/whirlpoo_04.png', object: null},
		whirpool5: {src: './img/whirlpool/whirlpoo_05.png', object: null},
		whirpool6: {src: './img/whirlpool/whirlpoo_06.png', object: null},

		hedgehog: {src: './img/Hedgehog.png', object: null},
	}

	function loadImages(callback) {
		for (let name in images) {
			images[name].object = new Image();
			images[name].object.src = images[name].src;
			images[name].object.onload = () => itemLoaded(callback);
		}
	}

	function itemLoaded(callback) {
		loaded_images++
		if (loaded_images >= Object.keys(images).length) {
			callback();
		}
	}

	//12px

	function drawSnake() {
		for (let i = snake.length - 1; i >= 0; i--) {
			let part = snake[i]
			if (part.x === snake[0].x && part.y === snake[0].y) {
				drawRotated(images.head.object, part.x - partLength / 4, part.y - partLength / 4, part.direction, partLength * 1.5)
			} else {
				drawRotated(images.snakeBody.object, part.x, part.y, part.direction, partLength, 16)
			}
		}
	}

	function drawRotated(imgObj, x, y, degree, partL, partH) {
		let bodyX = 0
		let bodyY = 0
		switch (degree) {
			case 'right':
				degree = 90
				bodyX = 0
				bodyY = -partL
				break
			case 'left':
				degree = 270
				bodyX = -partL
				bodyY = 0
				break
			case 'up':
				degree = 0
				break
			case 'down':
				degree = 180
				bodyX = -partL
				bodyY = -partL
				break
		}
		if (!partH) {
			partH = partL
		}
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(degree * Math.PI / 180);
		ctx.drawImage(imgObj, bodyX, bodyY, partL, partH);
		ctx.restore();
	}

	function drawElem(x, y, name) {
		switch (name) {
			case "snake":
				ctx.fillStyle = "#4666ff";
				ctx.strokeStyle = "#1fff57";
				break;
			case "fruit":
				ctx.fillStyle = "#fff530";
				ctx.strokeStyle = "#4666ff";
				break;
		}
		ctx.beginPath();
		ctx.rect(x, y, partLength, partLength);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}

	function drawFruits() {
		if (!fruits.length) generateFruits();
		for (let fruit of fruits) {

			if (fruit.x > canvas.width || fruit.x < 0) fruit.path.leftRight = generateRandomBetween(0, 2);
			if (fruit.y > canvas.height || fruit.y < 0) fruit.path.upDown = generateRandomBetween(0, 2);
			fruit.path.distance--
			if (fruit.path.distance === 0) {
				fruit.path.upDown = generateRandomBetween(0, 2)
				fruit.path.leftRight = generateRandomBetween(0, 2)
				fruit.path.distance = generateRandomBetween(50, canvas.width / 2)
				fruit.path.speed = generateRandomBetween(1, 6) / 10
			}
			let xShift = fruit.path.leftRight === 2 ? fruit.path.speed : fruit.path.leftRight === 1 ? 0 : -fruit.path.speed;
			let yShift = fruit.path.upDown === 2 ? fruit.path.speed : fruit.path.upDown === 1 ? 0 : -fruit.path.speed;
			fruit.x += xShift
			fruit.y += yShift
			ctx.drawImage(images['fish' + fruit.type].object, fruit.x - partLength / 4, fruit.y - partLength / 4,
				partLength * 1.5, partLength * 1.5);
		}
	}

	function getImgDimensions(img) {
		let img_ratio = img.object.width / img.object.height
		let width = img.size * canvas.width;
		let height = width / img_ratio;
		return {width, height}
	}

	function drawReef() {
		const {width, height} = getImgDimensions(images.reef)
		ctx.drawImage(images.reef.object, canvas.width - width, canvas.height - height, width, height);
	}

	function drawShark() {
		currentShark = currentShark ? currentShark : images.shark_left
		const {width, height} = getImgDimensions(currentShark)
		let x = currentShark.position.x
		if (x === null || x < (0 - width - 1) || x > canvas.width) {
			let type = generateRandomBetween(0, 1)
			currentShark = type ? images.shark_left : images.shark_right
			currentShark.position.y = generateRandomBetween(0, canvas.height - height);
			currentShark.position.x = currentShark.src === images.shark_left.src ? canvas.width : 0 - width
		} else {
			currentShark.position.x = currentShark.src === images.shark_left.src ?
				currentShark.position.x - 0.7 * speed : currentShark.position.x + 0.7 * speed
		}
		ctx.drawImage(currentShark.object, currentShark.position.x, currentShark.position.y, width, height);
	}

	function drawBubbles() {

		let chance = generateRandomBetween(0, 39) > 38;
		if (chance) {
			let x = generateRandomBetween(0, canvas.width)
			let size = generateRandomBetween(3, 14)
			let speed = generateRandomBetween(0.1, 1.5)
			let direction = generateRandomBetween(0, 2)
			images.bubble.items.push({x, y: canvas.height, height: size, width: size, speed, direction})
		}
		for (let i = images.bubble.items.length - 1; i >= 0; i--) {
			let item = images.bubble.items[i]
			if (item.y < 0) {
				images.bubble.items[i] = null
				images.bubble.items.splice(i, 1)
				continue
			}
			item.y -= item.speed
			let move = generateRandomBetween(0, 1)

			switch (item.direction) {
				default:
					break
				case 1:
					item.x += move
					break
				case 2:
					item.x -= move
					break
			}
			ctx.drawImage(images.bubble.object, item.x, item.y, item.height, item.width);
		}
	}

	function drawBackground() {
		drawShark()
		drawReef()
		drawBubbles()
	}

	function drawBarriers() {
		if (barriers.length < barriersMax) generateBarriers();
		for (let barrier of barriers) {
			if (barrier.type === 'hedgehog') {
				barrier.object = images.hedgehog.object
			} else if (!barrier.object) {
				barrier.object = images.whirpool1.object;
			} else {
				if (barrier.countdown === 15) {
					let frame = barrier.object.src[barrier.object.src.length - 5]
					barrier.object = frame == 6 ? images.whirpool1.object : images['whirpool' + (parseInt(frame) + 1)].object
				}
				barrier.countdown--
				barrier.countdown = barrier.countdown === 0 ? 15 : barrier.countdown
			}
			ctx.drawImage(barrier.object, barrier.x, barrier.y, barrier.width, barrier.width);
		}

	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (isCollision()) {
			return endGame();
		}
		changeComplexity()
		drawBackground();
		drawBarriers();
		drawFruits();
		drawSnake();
	}

	function restartLoop() {
		clearInterval(gameLoop);
		gameLoop = null;
		gameLoop = setInterval(draw, frameRate)
	}

	function changeComplexity() {
		if (score % 10 !== 0) return
		switch (true) {
			case score === 10:
				frameRate = 5
				barriersMax = 4
				fruitMax = 5
				break
			case score === 20:
				frameRate = 3
				barriersMax = 5
				fruitMax = 4
				break
			case score === 30:
				frameRate = 1
				barriersMax = 6
				fruitMax = 3
				break
			case score === 40:
				barriersMax = 7
				fruitMax = 2
				break
			case score === 50:
				barriersMax = 8
				fruitMax = 1
				break
			case score === 60:
				barriersMax = 9
				break
			case score === 70:
				barriersMax = 10
				break
			case score === 80:
				barriersMax = 12
				break
			case score === 90:
				barriersMax = 13
				fruitMax = 0
				break

		}
		restartLoop()
	}

	function isFruitEaten(x, y) {
		let eatenIndex
		let isEaten = fruits.some((fruit, index) => {
			eatenIndex = index
			return isInsideElement({x, y}, fruit) || isInsideElement(fruit, {x, y})
		})
		if (isEaten) {
			fruits.splice(eatenIndex, 1)
			generateFruits()
		}
		return isEaten
	}

	function generateRandomBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	function generateFruits() {
		for (let i = fruits.length; i < fruitMax; i++) {//create new fruits if there is less than fruitsmax of them
			let fruitX
			let fruitY
			let type
			let path
			do {//define if created fruit is inside of snake
				fruitX = Math.round(generateRandomBetween(0, canvas.width) / partLength) * partLength
				fruitY = Math.round(generateRandomBetween(0, canvas.height) / partLength) * partLength
				type = generateRandomBetween(1, 5)
				path = {
					upDown: generateRandomBetween(0, 2),
					leftRight: generateRandomBetween(0, 2),
					distance: generateRandomBetween(partLength * 3, partLength * 6),
					speed: generateRandomBetween(1, 6) / 10
				}
			} while (snake.some(part => isInsideElement({x: fruitX, y: fruitY}, part)))
			fruits.push({x: fruitX, y: fruitY, type, path})
		}
	}

	function isInsideElement(newObj, existingObj) {
		let existing_obj_width = existingObj.width || partLength
		let new_obj_width = newObj.width || partLength
		return newObj.x + new_obj_width > existingObj.x &&
			newObj.x < (existingObj.x + existing_obj_width) &&
			newObj.y + new_obj_width > existingObj.y &&
			newObj.y < (existingObj.y + existing_obj_width)
	}

	function generateBarriers() {
		for (let i = barriers.length; i < barriersMax; i++) {
			let barrierX
			let barrierY
			let type
			let width
			do {
				type = i === 0 ? 'whirpool' : 'hedgehog'
				width = type === "whirpool" ? partLength * 7 : partLength * 4
				barrierX = Math.round(generateRandomBetween(0, (canvas.width - width)) / partLength) * partLength
				barrierY = Math.round(generateRandomBetween(0,
					(canvas.height - (type === "whirpool" ? (canvas.height / 3 + width) : width))) / partLength) * partLength
			} while (function () {
				"use strict"
				let isInsideBarrier = barriers.some((barrier) => isInsideElement(barrier, {
					x: barrierX,
					y: barrierY,
					width
				}))
				let isInsideSnake = snake.some(function (part) {
					return barriers.some((barrier) => isInsideElement(barrier, part))
				})
				return isInsideBarrier || isInsideSnake
			}())
			barriers.push({x: barrierX, y: barrierY, type, width, countdown: 15})
		}
	}

	function init() {
		snake = []
		score = 0
		frameRate = 10
		fruitMax = 6
		barriersMax = 3
		fruits = []
		barriers = []
		direction = 'right'
		previousDirection = 'right'
		canvas.width = canvas.height = partLength * 40;
		changeScore(score);
		if (canvas.height > window.innerHeight) {
			canvas.width = canvas.height = Math.ceil(window.innerHeight / partLength) * (partLength - 2);
		}
		if (canvas.width > window.innerWidth * 0.9) {
			canvas.width = canvas.height = Math.ceil(window.innerWidth / partLength) * (partLength - 2);
		}
		if (!canvas.getContext) return alert("your browser is not supported,sorry");
		ctx = canvas.getContext('2d');
		for (let i = 0; i < initialSnakeLength; i++) {
			snake.unshift({x: i * partLength, y: 0, direction});
		}
		gameLoop = setInterval(draw, frameRate);
	}

	function initControls() {
		let disabled = false;
		window.addEventListener('keydown', function (ev) {
			let key = ev.keyCode;
			manageKeys(key, ev)
		})
		window.addEventListener('click', function (ev) {
			let id = ev.target.id;
			manageKeys(id, ev)
		})

		function manageKeys(key, ev) {
			if (disabled) return;
			switch (key) {
				case 37:
				case 65:
				case 'left':
					ev.preventDefault()
					if (direction !== 'right') direction = 'left'
					break;
				case 38:
				case 87:
				case 'up':
					ev.preventDefault()
					if (direction !== 'down') direction = 'up'
					break;
				case 39:
				case 68:
				case 'right':
					ev.preventDefault()
					if (direction !== 'left') direction = 'right'
					break;
				case 40:
				case 83:
				case 'down':
					ev.preventDefault()
					if (direction !== 'up') direction = 'down'
					break;
				case 32:
				case 'play':
					ev.preventDefault()
					if (!gameLoop) {
						ev.target.src = './img/pause.png'
						return gameLoop = setInterval(draw, frameRate);
					}
					ev.target.src = './img/play.png'
					clearInterval(gameLoop);
					gameLoop = null;
					break;
				default:
					return;
					break;
			}
			disabled = true;
			setTimeout(() => disabled = false, frameRate * 9)
		}
	}


	function endGame() {
		clearInterval(gameLoop)
		gameLoop = null;
		alert("Your score is "+score+". No free lunch :(. Try again!")
		init();
	}

	function recalculateDirectionsForPart(index) {
		let part = snake[index]
		let isTimeToRecalculate = (part.x % partLength === 0) && (part.y % partLength === 0)
		if (isTimeToRecalculate) {
			if (part === snake[0]) {
				part.direction = direction;
			} else {
				part.direction = snake[index - 1].direction
			}
		}
	}

	function moveSnake() {

		if (isFruitEaten(snake[0].x, snake[0].y)) {
			let newElem = Object.assign({}, snake[snake.length - 1])
			switch (newElem.direction) {
				case 'right':
					newElem.x -= partLength
					break;
				case 'left':
					newElem.x += partLength
					break;
				case 'up':
					newElem.y += partLength
					break;
				case 'down':
					newElem.y -= partLength
					break;
			}
			snake.push(newElem)
			changeScore(++score)
		}
		for (let i = snake.length - 1; i >= 0; i--) {
			let part = snake[i]
			recalculateDirectionsForPart(i)
			switch (part.direction) {
				case 'right':
					part.x += speed
					break;
				case 'left':
					part.x -= speed
					break;
				case 'up':
					part.y -= speed
					break;
				case 'down':
					part.y += speed
					break;
			}
			if (part.x + partLength / 2 > canvas.width) {
				part.x = 0 - partLength / 2 + 1
			} else if (part.x < 0 - partLength / 2) {
				part.x = canvas.width - partLength / 2 - 1
			}
			if (part.y + partLength / 2 > canvas.height) {
				part.y = 0 - partLength / 2 + 1
			} else if (part.y < 0 - partLength / 2) {
				part.y = canvas.height - partLength / 2 - 1
			}
		}

	}

	function changeScore(score) {
		document.getElementById('score').innerText = score;
	}

	function isCollision() {
		moveSnake();
		let snakeX = snake[0].x;
		let snakeY = snake[0].y;
		let isSnakeEatingItself = snake.some((part) => {
				"use strict"
				if (part === snake[0] || part === snake[1] || part === snake[2]) {
					return false
				}
				return isInsideElement({x: snakeX, y: snakeY}, part)
			}
		);
		let isBarrierTouched = barriers.some(barrier => isInsideElement({x: snakeX, y: snakeY}, barrier))
		return isSnakeEatingItself || isBarrierTouched;
	}

	function run() {
		loadImages(init);
		initControls();
	}

	return {
		run
	}
}();
game.run();
