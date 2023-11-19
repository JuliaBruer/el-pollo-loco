/**
 * statusbar for endboss health (energy) class
 */
class StatusBarEndboss extends DrawableObject {

    /**
     * Creates a heart icon for health status display.
     * 
     * @param {number} x - The x-coordinate at which the icon will be displayed.
     */
    constructor(x) {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.x = x;
        this.y = 15;
        this.width = 60;
        this.height = 60;
    }
}