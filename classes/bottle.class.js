/**
 * bottle class
 */
class Bottle extends MovableObject {
    width = 80;
    height = 80;
    y = 360;

    /**
     * Loads the image of a salsa bottle and sets its initial position.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.x = Math.floor(Math.random() * 2201);
    }
}