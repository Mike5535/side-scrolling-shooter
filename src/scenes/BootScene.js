export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot')
  }
  preload() {
    this.load.image('bg', 'assets/sprites/background.png')
  }
  create() {
    this.scene.start('Preload')
  }
}
