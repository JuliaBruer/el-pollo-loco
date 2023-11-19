/**
 * statusbar amount of collected coins class
 */
class StatusBarCoin extends DrawableObject {
    coins = 0;

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    /**
     * Constructor for a progress bar object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 40;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of coins collected, updating the progress bar image.
     *
     * @param {number} coins - The number of coins collected to update the percentage.
     */
    setPercentage(coins) {
        this.coins += coins;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current percentage of collected coins.
     *
     * @returns {number} - The index of the image to display on the progress bar.
     */
    resolveImageIndex() {
        if (this.coins == 100) {
            return 5;
        } else if (this.coins > 80) {
            return 4;
        } else if (this.coins > 60) {
            return 3;
        } else if (this.coins > 40) {
            return 2;
        } else if (this.coins > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}