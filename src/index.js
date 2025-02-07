import './index.css'
import Phaser from 'phaser'
import { gameConfig } from './shared/config'
import { PreloadScene, BootScene, GameScene, StartScene } from './scenes'

const config = {
  ...gameConfig,
  type: Phaser.AUTO,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
}

new Phaser.Game(config)
