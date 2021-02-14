import Phaser from 'phaser';

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} image 
 * @param {number} scrollFactor 
 */

// Create Parallax layers in a loop
const createLoop = (scene, totalWidth, image, scrollFactor) => {
  
  const sceneWidth = scene.textures.get(image).getSourceImage().width

  const count = Math.ceil(totalWidth / sceneWidth) * scrollFactor

  // Container to help iterate the scene
  let adder = 0

  for (let i = 0; i < count; ++i) {

    const creator = scene.add.image(adder, scene.scale.height, image)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor)

    adder += creator.width
  }
}


export default class World extends Phaser.Scene {

  constructor() {
    super('world');
  }

  preload() {

    // Landscape
    this.load.image('sky', 'src/assets/landscapes/test/sky.png')
    this.load.image('mountains', 'src/assets/landscapes/test/mountains.png')
    this.load.image('plateau', 'src/assets/landscapes/test/plateau.png')
    this.load.image('ground', 'src/assets/landscapes/test/ground.png')
    this.load.image('plants', 'src/assets/landscapes/test/plant.png')

    this.cursors = this.input.keyboard.createCursorKeys()

    // Katamari
    this.load.image('kball', 'src/assets/sprites/kball.png');
    this.load.image('nft1', 'src/assets/sprites/img_nft1.png');
    this.load.image('nft2', 'src/assets/sprites/img_nft2.png');
    this.load.image('nft3', 'src/assets/sprites/img_nft3.jpg');
    this.load.image('ntf4', 'src/assets/sprites/img_nft4.png');
    this.load.image('ntf5', 'src/assets/sprites/gif_nft.gif');

    
  }

  create() {

    // Landscape
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10 

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0)

    // Create layers
    createLoop(this, totalWidth, 'mountains', 0.25)
    createLoop(this, totalWidth, 'plateau', 0.5)
    createLoop(this, totalWidth, 'ground', 1)
    createLoop(this, totalWidth, 'plants', 1.25)

    // Controls how far you can go 
    this.cameras.main.setBounds(0, 0, width * width, height)




    // Katamari
    // Initialize the katamari Object
    this.katamari
    
    // Create the katamari container && size it
    this.katamari = this.add.container(width * 0.4 , height * 0.8)
    this.katamari.setSize(600, 600)

    // Load the "kball"
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
    
    //Add them to the Katamari container
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

      // this.katamari.fixedToCamera(cam)
      
    }
    
    update() {
      
      // Global 
      const speed = 2
      // Landscape
      
      const cam = this.cameras.main
      cam.scrollX += speed
      
      // Manually scroll through the world 

      // if (this.cursors.left.isDown) {
        //   cam.scrollX -= speed
        // }
        // else if (this.cursors.right.isDown) {
          //   cam.scrollX += speed
          // }
          // cam.scrollX = speed


          // Katamari
          
          // this.cameras.main.startFollow(this.katamari)
      this.katamari.rotation += 0.02
      this.katamari.x += speed
    
      
      // this.katamari.scrollX += speed

    
  }
}