import Phaser from "phaser";
import logoImg from "../assets/logo.png";


// OG Code
// class playGame extends Phaser.Scene {
//   constructor() {
//     super("PlayGame");
//   }
//   preload() {
//     this.load.image("logo", logoImg);
//   }
//   create() {
//     const logo = this.add.image(400, 150, "logo");

//     this.tweens.add({
//       targets: logo,
//       y: 450,
//       duration: 2000,
//       ease: "Power2",
//       yoyo: true,
//       loop: -1
//     });
//   }
// }

// export default playGame;

// let robot;


class PlayGame extends Phaser.Scene {
  
  constructor() {
    super('PlayGame');
    this.robot = {};
  }
  

  preload() {
    
    this.game.load.image('eye', '../assets/sprites/eye.png');
    this.game.load.image('body', '../assets/sprites/body.png');
    this.game.load.image('arm-l', '../assets/sprites/arm-l.png');
    this.game.load.image('arm-r', '../assets/sprites/arm-r.png');
    this.game.load.image('leg-l', '../assets/sprites/leg-l.png');
    this.game.load.image('leg-r', '../assets/sprites/leg-r.png');
  } 
  
  create() {
    
    // Use groups of sprites to create a big this.robot.
    // Robot itself, you can subclass group class in a real this.game.

    this.robot = this.game.add.group();
    
    this.robot.x = 300;
    this.robot.y = 200;
    
    this.robot.pivot.x = 300;
    this.robot.pivot.y = 300;

  // Robot components.
  this.robot.create(90, 175, 'arm-l');
  this.robot.create(549, 175, 'arm-r');
  this.robot.create(270, 325, 'leg-l');
  this.robot.create(410, 325, 'leg-r');
  this.robot.create(219, 32, 'body');
  this.robot.create(335, 173,'eye');
  }
  
  update() {

  this.robot.rotation += 0.02;
  }
  
  render() {
  
  this.game.debug.text('The robot is a group and every component is a sprite.', 240, 580);
  }
}

export default PlayGame;


// module.exports = robot;