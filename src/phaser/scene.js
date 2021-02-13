import Phaser from "phaser";
// import logoImg from "assets/logo.png";


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
  }
  

  preload() {
    
    this.load.image('kball', 'src/assets/sprites/kball.png');
    this.load.image('nft1', 'src/assets/sprites/img_nft1.png');
    this.load.image('nft2', 'src/assets/sprites/img_nft2.png');
    this.load.image('nft3', 'src/assets/sprites/img_nft3.jpg');
    this.load.image('ntf4', 'src/assets/sprites/img_nft4.png');
    this.load.image('ntf5', 'src/assets/sprites/gif_nft.gif');
  } 
  
  create() {

    // Initialize the katamari Object
    this.katamari
  

    // Create the katamari container && size it
    this.katamari = this.add.container(500, 400)
    this.katamari.setSize(600, 600)

    // Load the kball
    this.kball = this.add.image(0, 0, 'kball');

    // Add kball to Katamari container
    this.katamari.add(this.kball)

    // Scale the kball to fit the container
    this.kball.setScale(0.2)

    // Create orbiting nft's
    this.nft1 = this.add.sprite(0, 50, 'nft1')
    this.nft1.setScale(0.5)

    this.nft2 = this.add.sprite(50, 0, 'nft2')
    this.nft2.setScale(0.1)

    this.nft3 = this.add.sprite(-80, -50, 'nft3')
    this.nft3.setScale(0.1)

    this.nft5 = this.add.sprite(200, 200, 'nft5')
    this.nft5.setScale(1)

    //Add them to the Katamari
    this.katamari.add(this.nft1)
    this.katamari.add(this.nft2)
    this.katamari.add(this.nft3)
    this.katamari.add(this.nft5)

    /* Features to Add
    
    *SIZING*

    -Dynamically size Katamari based on the radius of the container
    --Dynamically size NFT's based on the size of the catamari

    *DATA*
    -Take in NFT's as an array of objects
    --Have their positions assigned randomly but accordingly
    --Choose metadata to include, find a way to include it for hover
    ---Include Hyperlinks to click on

    *BEHAVIOR*
    -Speed up & slow down
    -When NFT's outside of the container touch the radius, include them at the coordinates they touch at.

*/
    

    console.log(this.kball)
    

  }
  
  update() {
    // Phaser.Actions.RotateAroundDistance(this.kball.getChildren(), { x: 500, y: 400 }, 0.02, 200)

    this.katamari.rotation += 0.01
    // this.sprite.setScale(ratio, .3)
    
    // this.kball.setAnchor(10.5, 0.5)
  // this.kball.rotation += 0.02;
  }
  
  render() {
  
  this.debug.text('The robot is a group and every component is a sprite.', 240, 580);
  }
}

export default PlayGame;


// module.exports = robot;