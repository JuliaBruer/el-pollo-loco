/**
 * world class
 */
class World {
    character = new Character();
    level = initLevel();

    canvas;
    ctx;
    keyboard;

    camera_x = 0;

    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarHealth = new StatusBarHealth();

    statusBarEndboss = [];
    throwableObjects = [];

    endbossHealth = false;

    coins_sound = new Audio('audio/coins.mp3');
    endboss_sound = new Audio('audio/endboss-hurt.mp3');
    character_sound = new Audio('audio/character-hurt.mp3');

    /**
     * Constructor initializes the game world with a canvas, keyboard input and sets up the game loop.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input handler for controlling the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Renders the game world, including objects and updates and manages the game loop.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
    
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarHealth);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.statusBarEndboss);

        this.ctx.translate(-this.camera_x, 0);
        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Sets the world for the character to facilitate interactions.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Initiates a game loop to check collisions and update the game state.
     */
    run() {
        setInterval(() => {
            this.checkCollisionEnemies();
            this.checkCollisionCoins();
            this.checkCollisionBottles();
            this.checkCollisionEndboss();
            this.checkEndbossHealth();
            this.checkObjects();
        }, 200);
    }

    /**
     * Checks for collisions between the character and enemies, handles character actions and enemy removal.
     */
    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.character.jump();
                this.hitEnemies(enemy);
            }
            else if (this.character.isColliding(enemy)) {
                this.character_sound.play();
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Handles character interactions with enemies, marking enemies as killed and removing them.
     *
     * @param {Enemy} enemy - The enemy to be marked as killed and removed.
     */
    hitEnemies(enemy) {
        enemy.killedEnemies();
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 500);
    }

    /**
     * Checks for collisions between the character and coins, updating the character's coin count and removing coins.
     */
    checkCollisionCoins() {
        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.coins_sound.play();
                this.character.coins += 20;
                this.statusBarCoin.setPercentage(20);
                this.level.coins.splice(this.level.coins.indexOf(coins), 1);
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles, updating the character's bottle count and removing bottles.
     */
    checkCollisionBottles() {
        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                this.character.bottles += 20;
                this.statusBarBottle.setPercentage(20);
                this.level.bottles.splice(this.level.bottles.indexOf(bottles), 1);
            }
        });
    }

    /**
     * Checks for collisions between the endboss and thrown bottles, reducing endboss hits and 
     * handling endboss elimination.
     */
    checkCollisionEndboss() {
        this.level.enemies.forEach((endboss) => {
            this.throwableObjects.forEach(bottle => {
                if (endboss.isColliding(bottle)) {
                    this.endboss_sound.play();
                    this.throwableObjects.pop();
                    this.statusBarEndboss.pop();
                }
                if (this.statusBarEndboss.length === 0) {
                    this.killedEndboss(endboss);
                }
            });
        });
    }

    /**
     * Creates the boss health icons (hearts), checks the endboss's health status and updates the icons if necessary.
     */
    checkEndbossHealth() {
        if (this.endbossHealth == false) {
            let firstLife = new StatusBarEndboss(2350);
            let secondLife = new StatusBarEndboss(2400);
            let thirdLife = new StatusBarEndboss(2450);
            this.statusBarEndboss.push(firstLife);
            this.statusBarEndboss.push(secondLife);
            this.statusBarEndboss.push(thirdLife);
            this.endbossHealth = true;
        }
    }

    /**
     * Handles the elimination of an endboss, marking it as killed and removing it from the game.
     *
     * @param {Endboss} enemy - The endboss enemy to be eliminated.
     */
    killedEndboss(enemy) {
        enemy.killedEnemies();
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 500);
    }
    
    /**
     * Checks if the character throws a bottle and adds it to the list of throwable objects if conditions are met.
     */
    checkObjects() {
        if (this.keyboard.D && this.statusBarBottle.bottles > 20) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.setPercentage(-20);
        }
    }

    /**
     * Adds a list of objects to the game world map, rendering them on the canvas.
     *
     * @param {Array} objects - An array of game objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an individual game object to the game world map, rendering it on the canvas.
     *
     * @param {MovableObject} mo - The game object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for a game object.
     *
     * @param {MovableObject} mo - The game object for which to flip the image.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image orientation for a game object after flipping.
     *
     * @param {MovableObject} mo - The game object for which to restore the image orientation.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Mute sounds.
     */
    muteSounds() {
        this.coins_sound.muted = true;
        this.endboss_sound.muted = true;
        this.character_sound.muted = true;
    }

    /**
     * Unmute sounds.
     */
    unmuteSounds() {
        this.coins_sound.muted = false;
        this.endboss_sound.muted = false;
        this.character_sound.muted = false;
    }
}