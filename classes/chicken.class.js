/**
 * chicken class
 */
class Chicken extends MovableObject {
    width = 80;
    height = 80;
    y = 360;
    dead = false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    /**
     * Initializes the chicken enemy, loads images, sets position, speed and starts the animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = Math.floor(Math.random() * 2201) + 250;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Main animation loop for the chicken enemy.
     * Moves the enemy and plays walking animation.
     */
    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
    
    /**
     * Marks the chicken enemy as killed and plays the dead animation.
     */
    killedEnemies() {
        this.dead = true;
        this.playAnimation(this.IMAGES_DEAD);
    }
}