/**
 * @author Felix Gellner
 * This is the parent class of all entities in the game, that can be highlighted
 * @param game the global game variable
 * @param x Width Spawn point
 * @param y Height spawn point
 * @param imageRef a sprite
 * @constructor
 */

BasicGame.Entity = function(game, x, y, imageRef) {
    this.game = game;

    Phaser.Sprite.call(this, game, x, y, imageRef);
    this.anchor.setTo(0.5, 0.5);
    this.screenName = "Entity";
    this.timer = null;


};

BasicGame.Entity.prototype = Object.create(Phaser.Sprite.prototype);
BasicGame.Entity.prototype.constructor = BasicGame.Entity;

BasicGame.Entity.prototype.parentPreload = function() {};
/**
 * The inheriting class should call this in its own create method
 */
BasicGame.Entity.prototype.parentCreate = function() {

    this.gear = this.game.add.image('gear');
    this.timer = this.game.time.create(false);
    this.timer.start();


};

/**
 * The inheriting class should call this in its own update method
 */
BasicGame.Entity.prototype.parentUpdate = function() {

};