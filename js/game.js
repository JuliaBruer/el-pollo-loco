let canvas;
let world;
let intervalIds = [];
let keyboard = new Keyboard();
let game_sound = new Audio('audio/game-music.mp3');
let chicken_sound = new Audio('audio/chicken.mp3');
let win_sound = new Audio('audio/win-game.mp3');
let lose_sound = new Audio('audio/lose-game.mp3');
let fullscreen = false;
let soundUnmuted = false;

/**
 * Main function to start the game.
 * Hides certain HTML elements, plays game and chicken sounds, initializes the game, and sets up event listeners.
 */
function startGame() {
    document.getElementById('start-img').classList.add('d-none');
    document.getElementById('start-btn').classList.add('d-none');
    document.getElementById('delete-img').classList.add('d-none');
    document.getElementById('fullscreen-img').classList.remove('d-none');
    game_sound.play();
    chicken_sound.play();
    init();
    endOfGame();
    checkMobileGame();
}

/**
 * Initializes the game by getting the canvas element and creating a new game world with a keyboard input handler.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Checks if the character is dead.
 */
function endOfGame() {
    setInterval(() => {
        if (world.character.isDead()) {
            document.getElementById('you-lost-img').classList.remove('d-none');
            document.getElementById('you-lost-btn').classList.remove('d-none');
            soundOff();
            exitFullscreen();
            stopIntervals();
        }
    }, 100);
}

/**
 * Handles actions when the end boss is defeated in the game.
 */
function endbossIsDeath() {
    document.getElementById('game-over-img').classList.remove('d-none');
    document.getElementById('game-over-btn').classList.remove('d-none');
    soundOff();
    exitFullscreen();
    stopIntervals();
}

/**
 * Sets a stoppable interval that can be cleared later using 'stopIntervals'.
 *
 * @param {function} fn - The function to be executed in intervals.
 * @param {number} time - The time interval in milliseconds.
 */
function setStoppableInterval(fn, time) {
   let id = setInterval(fn, time);
   intervalIds.push(id);
}

/**
 * Stops all previously set intervals using 'setStoppableInterval'.
 */
function stopIntervals() {
    intervalIds.forEach(clearInterval);
}

/**
 * Restarts the game after it has ended, hiding the game over elements and starting the game.
 */
function playAgain() {
    document.getElementById('game-over-img').classList.add('d-none');
    document.getElementById('game-over-btn').classList.add('d-none');
    startGame();
}

/**
 * Restarts the game after the character has lost, hiding the 'you lost' elements and starting the game.
 */
function startAgain() {
    document.getElementById('you-lost-img').classList.add('d-none');
    document.getElementById('you-lost-btn').classList.add('d-none');
    startGame();
}

/**
 * Toggles between fullscreen mode and regular mode for the game screen and updates the corresponding UI elements.
 */
function changeScreen() {
    if (fullscreen) {
        exitFullscreen();
        fullscreen = false;
        document.getElementById('delete-img').classList.add('d-none');
        document.getElementById('fullscreen-img').classList.remove('d-none');
    } else {
        enterFullscreen(document.getElementById('game-container'));
        fullscreen = true;
        document.getElementById('delete-img').classList.remove('d-none');
        document.getElementById('fullscreen-img').classList.add('d-none');
    }
}

/**
 * Requests to enter fullscreen mode for a given HTML element.
 * @param {Element} element - The HTML element for which to enter fullscreen mode.
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode, if currently in fullscreen.
 */
function exitFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/**
 * Pauses the sounds.
 */
function soundOff() {
    game_sound.pause();
    chicken_sound.pause();
    world.character.muteSounds();
    world.muteSounds();
}

/**
 * Toggles the sound from mute to unmute.
 */
function toggleSound() {
    if (soundUnmuted) {
        game_sound.play();
        chicken_sound.play();
        world.character.unmuteSounds();
        world.unmuteSounds();
        soundUnmuted = false;
    } else {
        game_sound.pause();
        chicken_sound.pause();
        world.character.muteSounds();
        world.muteSounds();
        soundUnmuted = true;
    }
    toggleIcon();
}

/**
 * Toggles the icon from mute to unmute.
 */
function toggleIcon() {
    let soundImg = document.getElementById('sound-img');
    if (soundUnmuted) {
        soundImg.src = "img/unmute.png";
    } else {
        soundImg.src = "img/mute.png";
    }
}

/**
 * Continuously checks the screen width and updates the UI elements based on the screen size.
 * It hides or shows specific elements depending on the screen width.
 */
function checkMobileGame() {
    setInterval(() => {
        let screenWidth = window.innerWidth;
        let rotateContainer = document.getElementById('rotate-container');
        let mobileGaming = document.getElementById('mobile-gaming');
        let legend = document.getElementById('legend');

        if (screenWidth < 550) {
            rotateContainer.classList.remove('d-none');
            mobileGaming.classList.add('d-none');
            legend.classList.add('d-none');
        } else if (screenWidth >= 550 && screenWidth <= 1000) {
            rotateContainer.classList.add('d-none');
            mobileGaming.classList.remove('d-none');
            legend.classList.add('d-none');
        } else if (screenWidth > 1000) {
            rotateContainer.classList.add('d-none');
            mobileGaming.classList.add('d-none');
            legend.classList.remove('d-none');
        }
    }, 100);
}

/**
 * Sets up touch event listeners for mobile game controls (left, jump, right, throw).
 */
function mobileGame() {
    let left = document.getElementById('left');
    let jump = document.getElementById('jump');
    let right = document.getElementById('right');
    let throwBottle = document.getElementById('throw');

    left.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    left.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    jump.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    jump.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    right.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    right.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    throwBottle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    throwBottle.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * Listens for keydown events and updates the keyboard object based on key codes.
 * @param {Event} e - The keydown event.
 */
window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Listens for keyup events and updates the keyboard object based on key codes.
 * @param {Event} e - The keyup event.
 */
window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});
