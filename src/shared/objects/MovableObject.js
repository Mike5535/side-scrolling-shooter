export class MovableObject extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture, data.frame)
    this.init(data)
  }
  init(data) {
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.enable = true
    this.velocity = data.velocity
    this.scene.events.on('update', this.update, this)
    this.hits = data.hits
  }
  reset(x, y) {
    this.x = x
    this.y = y
    this.setAlive(true)
  }
  isDead() {
    return !this.hits
  }
  update() {
    if (this.active && this.isDead()) {
      this.setAlive(false)
    }
  }
  setAlive(status) {
    // активировать/деактивировать физическое тело
    this.body.enable = status
    // скрыть/показать текстуру
    this.setVisible(status)
    // деактивировать/активироть объект
    this.setActive(status)

    if (this.timer) {
      this.timer.paused = !status
    }

    if (!status) {
      this.emit('killed')
    }
  }
  move() {
    this.body.setVelocityX(this.velocity)
  }
}
