import Phaser from 'phaser';
import EventDispatcher from '../helpers/eventDispatcher.js'
import makeNFT from '../helpers/makeNFT'
import { ordersArray } from '../orders/ordersArray';

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

    // Zoom
    // this.cameras.main.setZoom(2);

    // Controls how far you can go 
    this.cameras.main.setBounds(0, 0, width * width, height)

    // Sizing and centering of the kball

    this.kball = this.physics.add.image(0, 0, 'kball');
    this.kballSize = 300
    this.kball.displayWidth = this.kballSize 
    this.kball.displayHeight = this.kballSize 
    this.kball.height = this.kballSize
    this.kball.width = this.kballSize
    this.kballRadius = this.kball.width / 2;
    this.kball.body.setCircle(
      this.kballRadius,
      (-this.kballRadius + 0.5 * this.kball.width / this.kball.scaleX),
      (-this.kballRadius + 0.5 * this.kball.height / this.kball.scaleY)
    );

    // kball physics
    this.kball.setGravityY(100)
    this.kball.setBounce(0.4)

    // Set collide for kball
    this.kball.body.onCollide = true


    //// Game Containers

    // Initialize the katamari (invisible)
    this.katamari
    
    // Create the katamari container && size it
    this.katamari = this.add.container(this.kball.x, this.kball.y)
  
    console.log(`katamari`,this.katamari)


    // this.katamariSize = this.kballSize 
    // this.katamariRadius = this.katamariSize / 2;
    // this.katamari.x = this.katamariSize
    // this.katamari.y = this.katamariSize
    
    
    // Initialize the cloud
    this.cloud
    this.cloud = this.add.container(width, 0)

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
        this.katamariDimension = this.kballRadius / 2
        sprite.x = Math.floor(Math.random() * (this.katamariDimension - (-this.katamariDimension) + 1) + (-this.katamariDimension))
        console.log(`sprite.x`, sprite.x)
        sprite.y = Math.floor(Math.random() * (this.katamariDimension - (-this.katamariDimension) + 1) + (-this.katamariDimension))
        console.log(`sprite.y`, sprite.y)
      
        sprite.angle = Math.round(Math.random() * (180 - (-180) + 1) + (-180))
        emitter.emit("AND_1", 1)

        this.kballSize += 100

        console.log(`scoped size`, this.kballSize)
        // this.katamariChildren = this.katamari.count()
        // console.log(`collision emitter`, emitter.emit);
        
        // Increase Katamari Size
        // Phaser.Geom.Rectangle.Inflate(this.katamari, 128, 128)
        // console.log(`katamariChildren`, this.katamari.count())
        // console.log(`katamariSize`, this.katamariSize)
        // console.log(`katamari position`, this.katamari)

      }
    })

    console.log(`create level size`, this.kballSize)

 
    const spawnNFT = (obj) => {
      
      // Object Data
      const nftName = obj.name
      const nftThumb = obj.thumbnail
      const nftAnimation = obj.animation
      const nftImage = obj.image
      const nftPerma = obj.perma
      const nftPriceETH = obj.eth_price
      const nftPriceUSD = obj.usd_price
      
      let nft = this.physics.add.sprite(0, 0, `'${nftName}'`);

      // Set Physics
      nft.setGravityY(100)
      nft.setBounce(0.3)
      nft.setScale(0.5)


      // Register a handle for when the user clicks
      nft.on('pointerup', (() => {
        emitter.emit("LOAD_INFO", obj)
        // console.log(obj)
      }), this)

      // Register a handler for mouse hover
      nft.on('pointerover', function() {
        // console.log('hover');
      }, this)
      nft.setInteractive()
      

      // Cloud container drops NFT's
      this.cloud.add(nft)
      this.physics.add.collider(nft, this.ground)
      this.physics.add.collider(nft, this.kball)
    }
  
    // Async loading
    const loadNFT = (obj) => {
      
      const nftName = obj.name
      const nftThumb = obj.thumbnail
      const nftPerma = obj.perma
      const nftAnimation = obj.animation
      const nftImage = obj.image
      const nftPriceETH = obj.eth_price
      const nftPriceUSD = obj.usd_price

      this.load.image(`'${nftName}'`, `${nftThumb}`)
      
      this.load.once('complete', () => { 
        this.nftName = this.add.sprite(0, 0, `'${nftName}'`)
        // this.katamari.add(obj.name)
        spawnNFT(obj)
      })
      this.load.start()
    }

    let foo = 0
    setInterval(function(){
      // console.log(ordersArray[0]);
      // console.log(foo)
      loadNFT(ordersArray[foo]);
      foo++
    }, 5000);
    
      // this.katamari.fixedToCamera(cam)
      // this.cursors = this.input.keyboard.createCursorKeys();
      // this.katamariBounds = this.katamari.getBounds()
      // this.katamari.setPosition(this.katamariBounds.x, this.katamariBounds.y);
      // // this.katamariBounds.type = 1
      // console.log(`katamari size`, this.katamariBounds.height)
    }
    
    update() {
           
      // Global 
      this.kballSpeed += 0.2

      // console.log(`update level size`, this.kballSize)
      
      // this.katamari.x = this.kball.x
      // this.katamari.y = this.kball.y
    
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

      this.kballSize +
      // Katamari
      // this.katamari.fixedToCamera(cam)
      this.cameras.main.startFollow(this.katamari)
      this.katamari.rotation += 0.02
      this.katamari.x = this.kball.x;
      this.katamari.y = this.kball.y;
      // this.katamari.height = 1;
      // this.katamari.width = 1;

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

// module.exports = { loadNFT }