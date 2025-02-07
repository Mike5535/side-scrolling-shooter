import { gameConfig } from '../../shared/config'
import { MovableObject } from '../../shared/objects/MovableObject'

export class Fire extends MovableObject {
  static generate(scene, source) {
    const data = {
      scene,
      x: source.x,
      y: source.y,
      texture: source.bullet.texture,
      velocity: source.bullet.velocity,
    }
    return new Fire(data)
  }
  isDead() {
    return this.x < -this.width || this.x > gameConfig.width + this.width
  }
}
