/**
 * coin class
 */
class Coin extends MovableObject {
    width = 100;
    height = 100;

    /**
     * 
     * This constructor loads the image of a coin, sets its initial position on the horizontal plane randomly within 
     * a specified range and sets its initial position on the vertical plane randomly within a specific vertical range.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png')
        this.x = Math.floor(Math.random() * 2201);
        this.y =  Math.floor(Math.random() * (320 - 150 + 1)) + 150;
    }
}