import Phaser from 'phaser';
import EventDispatcher from '../helpers/eventDispatcher.js'
import testNFT from '../helpers/makeNFT'

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

    let emitter = EventDispatcher.getInstance();
    console.log(emitter)
    
   
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


    //// Game Containers

    // Initialize the katamari (invisible)
    this.katamari
    
    // Create the katamari container && size it
    this.katamari = this.add.container(0, 0)
    // this.katamari.setSize(0.01, 0.01)
    
    // Initialize the cloud
    this.cloud
    this.cloud = this.add.container(900, 0)

    // Initialize the infoHUD
    // this.infoHUD
    // this.infoHUD = this.add.container(800, 800)
    // this.infoHUD.add.image(0, 0, 'nft3')
    
    // Ground initialization and settings
    this.groundX = this.sys.game.config.width / 2;
    this.groundY = this.sys.game.config.height * 0.90;

    this.ground = this.physics.add.image(this.groundX, this.groundY)
    this.ground.setGravity(0)
    
    this.ground.displayWidth=this.sys.game.config.width * width;
  
    this.physics.add.collider(this.kball, this.ground)
    this.ground.setImmovable();
    
    
    // Add sprites to the katamari with collision
    this.physics.world.on('collide', (sprite, obj) => {
      if (sprite.body.immovable === false && obj.body.immovable === false) {
        sprite.body.enable = 0
        this.katamari.add(sprite)
        sprite.x = Math.round(Math.random() * 2 - 1) * Math.floor(150)
        sprite.y = Math.round(Math.random() * 2 - 1) * Math.floor(150)
        emitter.emit("AND_1", 1)
        console.log(`world emitter`, emitter.emit)
        // console.log(`this is sprite`, sprite)
        // console.log(`this is image`, obj)
      }
    })

 
    const spawnNFT = (obj, url) => {
      let nft = this.physics.add.sprite(0, 0, obj);

      // Set NFT Data
      let openLink = function() {
        let action = window.open(url, '_blank');
        if (action && action.focus) {
          action.focus();
        } else if (!action) {
          window.location.href = url;
        }
      }

      let hoverData = function() {

      }


      // Set Physics
      nft.setGravityY(100)
      nft.setBounce(0.3)
      nft.setScale(0.5)
      // Register a handle for when the user clicks
      nft.on('pointerup', openLink, this)
      // Register a handler for mouse hover
      nft.on('pointerover', function() {
        console.log('hover');
      }, this
      )
      nft.setInteractive()
      this.cloud.add(nft)
      this.physics.add.collider(nft, this.ground)
      this.physics.add.collider(nft, this.kball)
    }
  
    // spawnNFT('nft1');
    // spawnNFT('nft2');
    // spawnNFT('nft3');
    // spawnNFT('nft4');


      //   this.load.image('nft6', 'https://lh3.googleusercontent.com/6qf3TeSJkLRiA8yW0-7IT3BqIE4uwwYmW4G1vVEMGCKIDw-V2X9Ch0d45M--jGiZW51fgn_FbiKq2yM2OS3ZElvW=s128')

      //   this.load.once('complete', (x) => { 
      //     this.nft6 = this.add.sprite(-50, 80, 'nft6')
      //     this.nft6.setScale(0.5)
      //     this.katamari.add(this.nft6)   
      //   })
      // this.load.start()
    
    // Async loading
    const loadNFT = (obj) => {
      const thing = obj.name
      this.load.image(`'${obj.name}'`, `${obj.thumbnail}`)
      
      this.load.once('complete', () => { 
        this.thing = this.add.sprite(0, 0, `'${obj.name}'`)
        // this.katamari.add(obj.name)
        spawnNFT(`'${obj.name}'`, obj.perma)
      })
      this.load.start()
    }

    loadNFT(testNFT)
      // this.katamari.fixedToCamera(cam)
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

module.exports = { loadNFT }