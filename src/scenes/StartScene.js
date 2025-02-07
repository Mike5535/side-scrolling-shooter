import { gameConfig } from '../shared/config'

export class StartScene extends Phaser.Scene {
  constructor() {
    super('Start')
  }

  create(data) {
    this.createBackground()
    if (data.score !== undefined) {
      this.createStats(data)
    }
    this.createText()
    this.setEvents()
  }

  createStats(data) {
    this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(
        gameConfig.width / 2 - 200,
        gameConfig.height / 2 - 200,
        400,
        400
      )

    const textTitle = data.completed ? 'Level completed!' : 'Game Over'
    const textScore = `Score: ${data.score}`
    const textStyle = {
      font: '40px sans-serif',
      fill: '#FFFFFF',
    }

    this.add
      .text(gameConfig.width / 2, 250, textTitle, textStyle)
      .setOrigin(0.5)
    this.add
      .text(gameConfig.width / 2, 350, textScore, textStyle)
      .setOrigin(0.5)
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0)
  }

  createText() {
    this.add
      .text(gameConfig.width / 2, 500, 'Tap to start', {
        font: '40px sans-serif',
        fill: '#FFFFFF',
      })
      .setOrigin(0.5)
  }

  setEvents() {
    this.input.on('pointerdown', () => {
      this.scene.start('Game')
    })
  }
}
