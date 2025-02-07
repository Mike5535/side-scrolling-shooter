import { Enemy } from './Enemy' 
import { Fires } from '../effects/Fires'
import { gameConfig } from '../../shared/config'

export class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.scene = scene
    this.fires = new Fires(this.scene)
    this.countMax = 10
    this.countCreated = 0
    this.countKilled = 0
    this.wave = 0
    this.isWaveCreating = false
    this.waveIdInterval = null

    this.createWave()
  }

  onEnemyKilled() {
    ++this.countKilled

    if (this.countKilled >= this.countMax) {
      this.countKilled = 0

      if (this.wave === gameConfig.maxWaves) {
        this.scene.events.emit('waves-passed')
        return;
      } else {
        this.createWave()
      }
    }
  }

  createWave() {
    this.isWaveCreating = true
    ++this.wave

    if(this.wave !== 1) {
      this.scene.events.emit('new-wave')
    }

    // this.countMax = 5 + this.wave * 5
    this.countMax = 1

    const createEnemy = this.createEnemy.bind(this)
    clearInterval(this.waveIdInterval)
    this.waveIdInterval = setInterval(() => {
      createEnemy()
    }, 2000);
  }

  createEnemy() {
    const enemy = Enemy.generate(this.scene, this.fires)
    enemy.on('killed', this.onEnemyKilled, this)
    this.add(enemy)

    enemy.move()
    ++this.countCreated

    if (this.countCreated >= this.countMax) {
      clearInterval(this.waveIdInterval)
      this.waveIdInterval = null
      this.countCreated = 0
    }
  }

  dispose() {
    if (this.waveIdInterval) {
      clearInterval(this.waveIdInterval)
    }
  }
}
