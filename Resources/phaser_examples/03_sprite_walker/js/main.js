var game = new Phaser.Game(800, 768, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var runner;
var gamer;
var background;
var parray = [];
var winner = 0;

function preload() {

    //game.load.spritesheet('runner', 'assets/runner.png', 108, 140);
    game.load.spritesheet('game_player', 'assets/players2.png', 64, 110);

    //non players
    game.load.spritesheet('cloud', 'assets/clouds.png', 240,240);
    game.load.image("background", "assets/road.png");
    
}

function create() {

    winner = prompt("Pick the winner:", "winner");
    //then you can save it via local storage


    background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, "background");

    //runner = game.add.sprite(100, 300, 'runner');
    for(var i=0;i<5;i++){
        parray.push(game.add.sprite(100, i*110+110, 'game_player'));
        let frames = [];
        parray[i].animations.add('game_run',[0+14*i,1+14*i,2+14*i,3+14*i,4+14*i,5+14*i,6+14*i]);
        parray[i].animations.play('game_run', 20, true);
    }

    // cloud = game.add.sprite(0, 0, 'cloud');
    // cloud.visible = false;

    //  Here we add a new animation called 'walk'
    //  Because we didn't give any other parameters it's going to make an animation from all available frames in the 'hero' sprite sheet
    //runner.animations.add('running',[0,1,2,3,4,5,6,7]);


    //  Play the animation: play('name of animation',FPS,loop=true/false)
    //runner.animations.play('running', 20, true);


    game.input.onDown.add(changePlayer, this);

}

function frameNumber(i,j){
    return i + 14 * j;
}


function changePlayer() {
    cloud.visible = true;
    cloud.animations.add('lightning',[0,1,2,3,4,5,6,7,8,9,10,0])
    game_player.animations.add('game_run',[14,15,16,17,18,19,20]);
    game_player.animations.play('game_run', 20, true);
    cloud.x = game.input.x-120;
    cloud.y = game.input.y;
    cloud.animations.play('lightning', 20, false,false);
    

}

function update(){
    background.tilePosition.x -= 17;
    for(var i=0;i<parray.length;i++){
        let r = Math.floor(Math.random() * 100);     // returns a random integer from 0 to 99
        if(r % 2 == 0){
            parray[i].x += 3;
        }else{
            parray[i].x -= 1;
        }
    }
    
}

