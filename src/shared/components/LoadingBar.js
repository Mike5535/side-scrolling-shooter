import { gameConfig } from '../config'

export class LoadingBar {
  constructor(scene) {
    this.scene = scene
    this.style = {
      boxColor: 0xd3d3d3,
      barColor: 0xfff8dc,
      x: gameConfig.width / 2 - 450,
      y: gameConfig.height / 2 + 250,
      width: 900,
      height: 25,
    }

    this.progressBox = this.scene.add.graphics()
    this.progressBar = this.scene.add.graphics()

    this.showProgressBox()
    this.setEvents()
  }

  setEvents() {
    this.scene.load.on('progress', this.showProgressBar, this)
    this.scene.load.on('fileprogress', this.onFileProgress, this)
    this.scene.load.on('complete', this.onLoadComplete, this)
  }

  showProgressBox() {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(this.style.x, this.style.y, this.style.width, this.style.height)
  }
  onFileProgress(file) {}
  onLoadComplete() {
    this.progressBar.destroy()
    this.progressBox.destroy()
  }

  showProgressBar(value) {
    this.progressBar
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width * value,
        this.style.height
      )
  }
}
