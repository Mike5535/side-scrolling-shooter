import { Enemies, Player } from '../gameObjects'
import { Boom } from '../gameObjects/effects/Boom'
import { gameConfig } from '../shared/config'

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }
  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.score = 0
  }
  create() {
    this.createBackground()

    if (!this.sounds) {
      this.createSounds()
    }

    this.player = new Player(this)
    this.enemies = new Enemies(this)
    this.createCompleteEvents()
    this.addOverlap()
    this.createText()
    this.events.on('new-wave', this.updateWaveText, this)
  }
  createSounds() {
    this.sounds = {
      boom: this.sound.add('boom', { volume: 0.1 }),
      theme: this.sound.add('theme', { volume: 0.2, loop: true }),
    }

    this.sounds.theme.play()
  }
  createText() {
    this.healthText = this.add.text(50, 50, 'Health: ❤️❤️❤️', {
      font: '40px sans-serif',
      fill: '#FFFFFF',
    })

    this.scoreText = this.add.text(50, 100, 'Score: 0', {
      font: '40px sans-serif',
      fill: '#FFFFFF',
    })

    this.waveText = this.add.text(50, 150, 'Wave: 1', {
      font: '40px sans-serif',
      fill: '#FFFFFF',
    })
  }
  addOverlap() {
    this.physics.add.overlap(
      this.player.fires,
      this.enemies,
      this.onOverlap,
      undefined,
      this
    )
    this.physics.add.overlap(
      this.enemies.fires,
      this.player,
      this.onOverlap,
      undefined,
      this
    )
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.onOverlap,
      undefined,
      this
    )
  }
  onOverlap(source, target) {
    const enemy = [source, target].find((item) => item.texture.key === 'enemy')
    if (enemy) {
      enemy.hits--

      if (!enemy.hits) {
        ++this.score
        this.scoreText.setText(`Score: ${this.score}`)
        Boom.generate(this, enemy.x, enemy.y)
        this.sounds.boom.play()
        source.destroy()
        target.setAlive(false)
      }

      source.destroy()
      return
    }

    source.hits--
    this.healthText.setText(`Health: ${'❤️'.repeat(source.hits)}`)
    if (!source.hits) {
      source.setAlive(false)
      target.setAlive(false)
    }

    target.setAlive(false)
    target.destroy()
  }
  createCompleteEvents() {
    this.player.once('killed', this.onComplete, this)
    this.events.once('waves-passed', this.onComplete, this)
  }
  onComplete() {
    this.enemies.dispose()

    this.scene.start('Start', {
      score: this.score,
      completed: this.player.active,
    })
  }
  update() {
    this.player.move()
    this.bg.tilePositionX += 0.5
  }
  updateWaveText() {
    this.waveText.setText(`Wave: ${this.enemies.wave}`)
  }
  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, gameConfig.width, gameConfig.height, 'bg')
      .setOrigin(0)
  }
}
