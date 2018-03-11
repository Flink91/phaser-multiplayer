BasicGame.Player = function(game, x, y, name, money) {

    this.game = game;

    var img_num = Math.floor(Math.random() * (12 - 1)) + 1;
    var player_img = "player" + img_num;

    BasicGame.Entity.call(this, game, x, y, player_img);

    this.x = x;
    this.y = y;
    this.screenName = name;
    this.money = money;


    this.fontStyle = {
        font: "18px Arial",
        fill: "#000",
        align: "left", // the alignment of the text is independent of the bounds, try changing to 'center' or 'right'
        boundsAlignH: "left",
        boundsAlignV: "top",
        wordWrap: true,
        wordWrapWidth: 300
    };

};

BasicGame.Player.prototype = Object.create(BasicGame.Entity.prototype);
BasicGame.Player.prototype.constructor = BasicGame.Player;

BasicGame.Player.prototype.create = function() {

    this.parentCreate();

    this.anchor.set(0.5, 0.5);
    console.log("player create");
    //this.centerX = canvas_width / 2;
    //this.centerY = canvas_height / 2;

    // this.drawRect(this.centerX, this.centerY, 80, 80);
    // this.pivot.x = 40;
    // this.pivot.y = 40;
    //player.anchor.setTo(0.5);

    // this.drawRect(this.centerX - 200, this.centerY - 200, 80, 80);

    this.name_text = this.game.add.text(2, -25, this.screenName, this.fontStyle);
    this.name_text.anchor.set(0, 1);
    this.addChild(this.name_text);

    this.money_text = this.game.add.text(0, 28, this.money + "$", this.fontStyle);
    this.money_text.anchor.set(0.5, 0);
    this.addChild(this.money_text);
    console.log("money");
    console.log(this.money);

    //Player sprite
    this.game.add.existing(this);
}

BasicGame.Player.prototype.update = function() {
    this.parentUpdate();
    //nothing yet 
}

BasicGame.Player.prototype.moveWithWASD = function(displayObject, speed) {
    if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        displayObject.body.velocity.y = -speed;
    } else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        displayObject.body.velocity.y = speed;
    } else {
        displayObject.body.velocity.y = 0;
    }

    if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        displayObject.body.velocity.x = -speed;
    } else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        displayObject.body.velocity.x = speed;
    } else {
        displayObject.body.velocity.x = 0;
    }
}

BasicGame.Player.prototype.movetoPointer = function(displayObject, speed, pointer, maxTime) {

    var angle = angleToPointer(displayObject, pointer);

    if (maxTime > 0) {
        //  We know how many pixels we need to move, but how fast?
        speed = distanceToPointer(displayObject, pointer) / (maxTime / 1000);
    }

    displayObject.body.velocity.x = Math.cos(angle) * speed;
    displayObject.body.velocity.y = Math.sin(angle) * speed;

    return angle;

}

BasicGame.Player.prototype.distanceToPointer = function(displayObject, pointer, world) {


    if (world === undefined) { world = false; }

    var dx = (world) ? displayObject.world.x - pointer.worldX : displayObject.x - pointer.worldX;
    var dy = (world) ? displayObject.world.y - pointer.worldY : displayObject.y - pointer.worldY;

    return Math.sqrt(dx * dx + dy * dy);

}

BasicGame.Player.prototype.angleToPointer = function(displayObject, pointer, world) {


    if (world === undefined) { world = false; }

    if (world) {
        return Math.atan2(pointer.worldY - displayObject.world.y, pointer.worldX - displayObject.world.x);
    } else {
        return Math.atan2(pointer.worldY - displayObject.y, pointer.worldX - displayObject.x);
    }

}