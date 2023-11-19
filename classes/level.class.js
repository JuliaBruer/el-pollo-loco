/**
 * level class
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2200;

    /**
     * Constructor for a GameWorld instance.
     *
     * @param {Array} enemies - An array of enemy objects in the game world.
     * @param {Array} clouds - An array of cloud background elements.
     * @param {Array} backgroundObjects - An array of background objects.
     * @param {Array} coins - An array of coin objects in the game world.
     * @param {Array} bottles - An array of bottle objects in the game world.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}