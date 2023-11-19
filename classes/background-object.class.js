/**
 * background class
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Constructor for an instance of a class that loads an image and sets its position.
     * @param {string} imagePath - The path to the image to be loaded.
     * @param {number} x - The initial x-coordinate of the image.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}