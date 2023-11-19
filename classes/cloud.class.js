/**
 * cloud class
 */
class Cloud extends MovableObject {
    y = 50;
    width = 400;
    height = 250;

    /**
     * Constructor for an instance that represents a clouds background element.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * animates movement to the left
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 40);
    }
}