/**
 * statusbar amount of collected bottles class
 */
class StatusBarBottle extends DrawableObject {
    bottles = 0;

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]

    /**
     * Constructor for a progress bar object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the progress bar based on the number of bottles collected.
     *
     * @param {number} bottles - The number of bottles collected.
     */
    setPercentage(bottles) {
        this.bottles += bottles;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage of collected bottles.
     *
     * @returns {number} - The index of the image to display.
     */
    resolveImageIndex() {
        if (this.bottles == 100) {
            return 5;
        } else if (this.bottles > 80) {
            return 4;
        } else if (this.bottles > 60) {
            return 3;
        } else if (this.bottles > 40) {
            return 2;
        } else if (this.bottles > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}