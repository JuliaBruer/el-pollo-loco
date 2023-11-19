/**
 * endboss class
 */
class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    dead = false;
    firstHit = false;

    IMAGES = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Initializes the endboss character, loads images, sets position and starts the animation.
     */
    constructor() {
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2300;
        this.animate();
    }

    /**
     * Main animation loop for the endboss character.
     * Handles animation based on character's state.
     */
    animate() {
        setInterval(() => {
            if (!this.firstHit) {
                this.playAnimation(this.IMAGES);
            } else {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 1000);
    }

    /**
     * Checks if the current object is colliding with another object.
     *
     * @param {Object} mo - The other object to check for collision.
     * @returns {boolean} - True if a collision is detected, otherwise false.
     */
    isColliding(mo) {
        let collides = super.isColliding(mo);
        if (collides) {
            if (!this.firstHit) {
                this.firstHit = true;
            }
            this.playAnimation(this.IMAGES_HURT);
        }
        return collides;
    }
    
    /**
     * Marks the endboss character as killed and plays the dead animation.
     * Triggers an endboss death event after a delay.
     */
    killedEnemies() {
        this.dead = true;
        this.playAnimation(this.IMAGES_DEAD);

        setTimeout(() => {
            endbossIsDeath();
        }, 1000);
    }
}