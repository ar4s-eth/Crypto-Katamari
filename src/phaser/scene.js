import Phaser from "phaser";

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
    // this.load.crossOrigin = 'anonymous';
    
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
    
    // Async loading
      this.load.image('nft6', 'https://lh3.googleusercontent.com/6qf3TeSJkLRiA8yW0-7IT3BqIE4uwwYmW4G1vVEMGCKIDw-V2X9Ch0d45M--jGiZW51fgn_FbiKq2yM2OS3ZElvW=s128')
      this.load.once('complete', (x) => { 
        this.nft6 = this.add.sprite(200, -200, 'nft6')
        this.nft6.setScale(0.5)
        this.katamari.add(this.nft6)   
        // console.log(`from load once`, x)
      })
      this.load.start()

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
  -The katamari moves forward more quickly when a deposit is made
  -When NFT's outside of the container touch the radius, include them at the coordinates they touch at.

  */
      
    // console.log(this.nft6)
    // console.log(this.kball)
  }
  
  update() {
    // Rotate the Katamari container
    this.katamari.rotation += 0.01
    // this.sprite.setScale(ratio, .3)

  }
  
  render() {
  
  this.debug.text('The robot is a group and every component is a sprite.', 240, 580);
  }
}

export default PlayGame;

