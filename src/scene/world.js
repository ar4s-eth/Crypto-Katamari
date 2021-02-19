import Phaser from 'phaser';

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} image 
 * @param {number} scrollFactor 
 */

//// World creation constants and multipliers

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
    this.load.image('nft1', 'src/assets/sprites/img_nft1.png')
    this.load.image('nft2', 'src/assets/sprites/img_nft2.png');
    this.load.image('nft3', 'src/assets/sprites/img_nft3.jpg');
    this.load.image('ntf4', 'src/assets/sprites/img_nft4.png');
    this.load.image('ntf5', 'src/assets/sprites/gif_nft.gif');
    this.load.image('star', 'src/assets/sprites/img_nft6.png');
    
  }
  
  
  create() {
    
    // console.log(`sprite1`, this.game.textures)
    //// World Logic

    // Setup Landscape & world dimensions
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10 

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0)

    // Create parallax layers
    createLoop(this, totalWidth, 'mountains', 0.25)
    createLoop(this, totalWidth, 'plateau', 0.5)
    createLoop(this, totalWidth, 'ground', 1)
    createLoop(this, totalWidth, 'plants', 1.25)

    // Controls how far you can go 
    this.cameras.main.setBounds(0, 0, width * width, height)

    // Load the "kball" (no gravity)
    // this.kball = this.add.image(0, 0, 'kball');


    // Reference for the object body/physics
    let kballCenter = 62
    
    // Load the "kball" & add physics
    this.kball = this.physics.add.image(100, 100, 'kball');
    
    // Set kball's body as a circle to it's circumference 
    this.kball.body.setCircle(255, kballCenter, kballCenter)

    // kball physics
    this.kball.setGravityY(100)
    this.kball.setBounce(0.4)

    // Scale the kball
    this.kball.setScale(0.5)

    // Set collide for kball
    this.kball.body.onCollide = true
    // this.ground.body.onCollide = false

    //// Game Containers

    // Initialize the katamari 
    this.katamari
    
    // Create the katamari container && size it
    this.katamari = this.add.container(0, 0)
    // this.katamari.setSize(0.01, 0.01)
    
    // Initialize the cloud
    this.cloud
    this.cloud = this.add.container(900, 0)
    
    
    // Ground initialization and settings

    this.groundX = this.sys.game.config.width / 2;
    this.groundY = this.sys.game.config.height * 0.90;

    this.ground = this.physics.add.image(this.groundX, this.groundY)
    this.ground.setGravity(0)
    
    this.ground.displayWidth=this.sys.game.config.width * width;
  
    this.physics.add.collider(this.kball, this.ground)
    this.ground.setImmovable();


    // Add kball to Katamari container
    // this.katamari.add(this.kball)
    
    
    // Add sprites to the katamari with collision
    this.physics.world.on('collide', (sprite, obj) => {
      if (sprite.body.immovable === false && obj.body.immovable === false) {
        sprite.body.enable = 0
        this.katamari.add(sprite)
        sprite.x = Math.round(Math.random() * 2 - 1) * Math.floor(150)
        sprite.y = Math.round(Math.random() * 2 - 1) * Math.floor(150)
        console.log(`this is sprite`, sprite)
        console.log(`this is image`, obj)
      }
    })

 
    const spawnNFT = (obj) => {
      let nft = this.physics.add.sprite(0, 0, obj);
      nft.setGravityY(100)
      nft.setBounce(0.3)
      nft.setScale(0.5)
      this.cloud.add(nft)
      this.physics.add.collider(nft, this.ground)
      this.physics.add.collider(nft, this.kball)
    }
  
    spawnNFT('nft1');
    spawnNFT('nft2');
    // spawnNFT('nft3');
    spawnNFT('nft4');


    // Create orbiting nft's
    // this.nft1 = this.add.sprite(0, 50, 'nft1')
    // this.nft1.setScale(0.5)
    // this.nft1 = this.physics.add.sprite(100, 0, 'nft1')
    // this.cloud.add(this.nft1)
    // this.nft1.setGravityY(100)
    // this.nft1.setBounce(1)
    // this.physics.add.collider(this.nft1, this.ground)
    // this.physics.add.collider(this.nft1, this.kball)
    // this.nft1.setScale(0.5)
    // this.nft1.body.setCircle(50, 70, 70)

    // this.physics.add.collider(this.kball, this.nft1)
    
    // this.nft2 = this.add.sprite(-50, 50, 'nft2')
    // this.nft2.setScale(0.1)
    
    // this.nft3 = this.add.sprite(-80, -50, 'nft3')
    // this.nft3.setScale(0.1)
    
    // this.nft5 = this.add.sprite(200, 200, 'nft5')
    // this.nft5.setScale(1)
    
    // // Add them to the Katamari container
    // this.katamari.add(this.nft1)
    // this.katamari.add(this.nft2)
    // this.katamari.add(this.nft3)
    // this.katamari.add(this.nft5)


    
    // Async loading
      // this.load.image('nft6', 'https://lh3.googleusercontent.com/6qf3TeSJkLRiA8yW0-7IT3BqIE4uwwYmW4G1vVEMGCKIDw-V2X9Ch0d45M--jGiZW51fgn_FbiKq2yM2OS3ZElvW=s128')

      // this.load.once('complete', (x) => { 
      //   this.nft6 = this.add.sprite(-50, 80, 'nft6')
      //   this.nft6.setScale(0.5)
      //   this.katamari.add(this.nft6)   
      // })
      // this.load.start()

      // // this.katamari.fixedToCamera(cam)
      // this.cursors = this.input.keyboard.createCursorKeys();

    }
    
    update() {
      
      // Global 
      this.kballSpeed = 0
      
    
      // console.log(`inside update kball`, this.kballSpeed)
      // console.log(`inside update`, this.katamariRotation)
      // Landscape
      
      // const cam = this.cameras.main
      // cam.scrollX += speed
      
      // Manually scroll through the world 

      // if (this.cursors.left.isDown) {
      //     cam.scrollX -= speed
      //   }
      //   else if (this.cursors.right.isDown) {
      //       cam.scrollX += speed
      //     }
      //     cam.scrollX = speed


      // Katamari
      // this.katamari.fixedToCamera(cam)
      this.cameras.main.startFollow(this.katamari)
      this.katamari.rotation += 0.02
      this.katamari.x = this.kball.body.position.x + 126
      this.katamari.y = this.kball.body.position.y + 126
      // this.katamari.child.body.enable = false
      
      
      // Kball movement
      
      // this.kball.setAngularVelocity(0.5)
      // this.kball.angularVelocity += 1
      // this.kball.setVelocityX(0.2)
      // this.kball.body.setAngularVelocity(0.5)
      // this.kball.body.setVelocityX(0.5)
      
      this.kball.setDrag(1);
      
      if (this.cursors.right.isDown) {
        this.kballSpeed = this.kball.setVelocity(200)
        this.kball.rotation += 0.02
        // console.log(`inside if`, this.kballSpeed)
      } else if (this.cursors.left.isDown) {
        this.kballSpeed = this.kball.setVelocity(-200)
        this.kball.rotation -= 0.02
      }


  }
}