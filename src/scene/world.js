import Phaser from 'phaser';
import EventDispatcher from '../helpers/eventDispatcher.js'
import makeNFT from '../helpers/makeNFT'
import { ordersArray } from '../orders/ordersArray';
let rightPressed = 0 
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
    this.load.image('sky', 'src/assets/landscapes/day_sky.png')
    this.load.image('clouds', 'src/assets/landscapes/day_clouds.png')
    this.load.image('mountains', 'src/assets/landscapes/day_mountains.png')
    this.load.image('forest', 'src/assets/landscapes/day_forest.png')
    this.load.image('ground', 'src/assets/landscapes/day_ground.png')
    this.load.image('plants', 'src/assets/landscapes/day_plants.png')

    this.cursors = this.input.keyboard.createCursorKeys()

    // Katamari
    this.load.image('kball', 'src/assets/sprites/kball.png');

    
  }
  
  
  create() {

    let emitter = EventDispatcher.getInstance();
    // console.log(emitter)
    
   
    //// World Logic

    // Setup Landscape & world dimensions
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * width 

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0)

    // // Create parallax layers
    createLoop(this, totalWidth, 'clouds', 0.1)
    createLoop(this, totalWidth, 'mountains', 0.25)
    createLoop(this, totalWidth, 'forest', 0.5)
    createLoop(this, totalWidth, 'ground', 1)
    // this.kball = this.physics.add.image(120, 0, 'kball').setCollideWorldBounds(true)
    createLoop(this, totalWidth, 'plants', 1.25)

    
    // Controls how far you can go 
    this.cameras.main.setBounds(0, 0, width * width, height)
    
    // Sizing and centering of the kball
    
    this.kballSize = 300

    // Square kball
    // this.kball = this.physics.add.image(0, 0, 'kball').setCollideWorldBounds(true)
    // this.kball.body.setSize(this.kballSize, this.kballSize, true)
    // this.kball.setDisplaySize(300, 300)
    // this.kball.setScale(0.2)
    
    // Setting kball body to be a circle
    this.kball = this.physics.add.image(120, 0, 'kball').setCollideWorldBounds(true)
    // this.events.on('collide', () => {this.kballSize.update += 100}, this.kballSize);
    // console.log(`create kballsize`, this.kballSize)
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
      
      
      // Initialize the cloud
      this.cloud
      this.cloud = this.add.container(width, 0)
      // .setScrollFactor(this.scrollFactor)
      
      
      
      // Ground initialization and settings
      this.groundX = this.sys.game.config.width / 2;
      this.groundY = this.sys.game.config.height * 0.80;
      
      this.ground = this.physics.add.image(this.groundX, this.groundY)
      this.ground.setGravity(0)
      
      this.ground.displayWidth=this.sys.game.config.width * width;
      
      this.physics.add.collider(this.kball, this.ground)
      this.ground.setImmovable();
      
      
      
      // Making a world bounds
      
      this.physics.world.setBounds( 0, 0, 1920, this.groundY, false, false, false, true );
      
      
      console.log(`world bounds`, this.physics.world.bounds)
      
      this.ping = 1
      // Add sprites to the katamari with collision
      this.physics.world.on('collide', (sprite, obj) => {
        if (sprite.body.immovable === false && obj.body.immovable === false) {
          
          sprite.body.enable = 0
          this.katamari.add(sprite)
          this.katamariDimension = this.kballRadius / 2
          this.katamariDimension = this.kballSize / 2
          
          sprite.x = Math.floor(Math.random() * (this.katamariDimension - (-this.katamariDimension) + 1) + (-this.katamariDimension))
          console.log(`sprite.x`, sprite.x)
          
          sprite.y = Math.floor(Math.random() * (this.katamariDimension - (-this.katamariDimension) + 1) + (-this.katamariDimension))
          console.log(`sprite.y`, sprite.y)
          
          sprite.angle = Math.round(Math.random() * (180 - (-180) + 1) + (-180))
          emitter.emit("AND_1", 1)
          this.kScale = 0.9
          this.kball.setScale(1 - this.kScale)
          
          this.kballSize += 5
          
          // this.kball.body.setSize(this.kballSize, this.kballSize, true)
          this.kball.setDisplaySize(this.kballSize, this.kballSize)
          console.log(`ping`, this.kballSize)
          
        }
      })
      
      // Zoom
      
      this.cameras.main.setZoom(1);
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
      
      // let nft = this.physics.add.sprite(0, 0, `'${nftName}'`);
      let nft = this.physics.add.sprite(this.kball.x + 500, 0, `'${nftName}'`);

      // Set Physics
      nft.setGravityY(200)
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
      // this.cloud.add(nft)
      this.physics.add.collider(nft, this.ground)
      this.physics.add.collider(nft, this.kball)
    }
  
    // Async loading
    const loadNFT = (obj) => {
      
      const nftName = obj.name
      const nftThumb = obj.image_thumbnail
      const nftPerma = obj.perma
      const nftAnimation = obj.animation
      const nftImage = obj.image_preview
      const nftPriceETH = obj.eth_price
      const nftPriceUSD = obj.usd_price

      this.load.image(`'${nftName}'`, `${nftImage}`)
      
      this.load.once('complete', () => { 
        this.nftName = this.add.sprite(0, 0, `'${nftName}'`)
        // this.katamari.add(obj.name)
        spawnNFT(obj)
      })
      this.load.start()
    }

    let orderIncrementer = 0
    setInterval(function(){
      orderIncrementer === ordersArray.length ?
      orderIncrementer = 0 :
        // console.log(`Order ${orderIncrementer} of ${ordersArray.length}`)
        loadNFT(ordersArray[orderIncrementer]);
        orderIncrementer++;
        // console.log(ordersArray[orderIncrementer]);
    }, 3000);
    
  }
  
  

    update() {
            
      // Katamari
      this.cam = this.cameras.main.startFollow(this.katamari)
      this.katamari.x = this.kball.x;
      this.katamari.y = this.kball.y;

      

      this.cloud.x = 1920
      this.cloud.y = 0
      
      // Zoom Stuff
      // this.zoom = this.kballSize
      // this.cameras.main.setZoom(this.zoom);
      // this.cameras.main.scrollX = this.kball.x - 400;
      // this.cameras.main.scrollY = this.kball.y - 300;

      // Kball movement
      this.kball.setDrag(1);
      if (this.cursors.right.isDown) {
        rightPressed = 1
      } 
      if(rightPressed === 1) {
        this.kballSpeed = this.kball.setVelocityX(200)
        this.katamari.rotation += 0.02
        this.kball.rotation += 0.02
      }
      console.log(`rpress`, rightPressed)
      
      if (this.cursors.left.isDown) {
        this.scene.pause('world')
      } 
      
      if (this.cursors.down.isDown) {
        his.scene.launch('world')
        this.scene.resume('world')
      }


  }
}

// module.exports = { loadNFT }