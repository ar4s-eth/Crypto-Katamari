import Phaser from 'phaser';

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth 
 * @param {string} image 
 * @param {number} scrollFactor 
 */

// Create background loop
const createLoop = (scene, totalWidth, image, scrollFactor) => {
  
  const sceneWidth = scene.textures.get(image).getSourceImage().width

  const count = Math.ceil(totalWidth / sceneWidth) * scrollFactor
  // 
  let adder = 0

  for (let i = 0; i < count; ++i) {

    const creator = scene.add.image(adder, scene.scale.height, image)
      .setOrigin(0, 1)
      .setScrollFactor(scrollFactor)

    adder += creator.width
  }

  // const mount = this.add.image(0, height, 'mountains')
  // .setOrigin(0, 1) 
  // .setScrollFactor(0.25)
}

export default class World extends Phaser.Scene {

  constructor() {
    super('world-scene');
  }

  preload() {

    this.load.image('sky', 'src/assets/landscapes/test/sky.png')
    this.load.image('mountains', 'src/assets/landscapes/test/mountains.png')
    this.load.image('plateau', 'src/assets/landscapes/test/plateau.png')
    this.load.image('ground', 'src/assets/landscapes/test/ground.png')
    this.load.image('plants', 'src/assets/landscapes/test/plant.png')

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  create() {

    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 10 

    this.add.image(width * 0.5, height * 0.5, 'sky')
      .setScrollFactor(0)


    createLoop(this, totalWidth, 'mountains', 0.25)
    createLoop(this, totalWidth, 'plateau', 0.5)
    createLoop(this, totalWidth, 'ground', 1)
    createLoop(this, totalWidth, 'plants', 1.25)

    // controlls how far you can go 
    this.cameras.main.setBounds(0, 0, width * 10, height)
  }

  update() {

    const cam = this.cameras.main
    const speed = 3

    if (this.cursors.left.isDown) {
      cam.scrollX -= speed
    }
    else if (this.cursors.right.isDown) {
      cam.scrollX += speed
    }
  }
}