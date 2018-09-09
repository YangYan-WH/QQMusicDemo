class LyricsPlayer {
  constructor(el) {
    this.$el = el;
    this.$el.innerHTML = '<div class="player-lyrics-lines"></div>';
    this.$lines = this.$el.querySelector(".player-lyrics-lines");
    this.text = "";
    this.lyrics = [];
    this.elapsed = 0;
    this.index = 0;
  }

  start() {
    this.intervalId = setInterval(this.update.bind(this), 50);
  }
  pause() {
    clearInterval(this.intervalId);
  }
  render() {
    let html = this.lyrics
      .map(
        line => `
            <div class="player-lyrics-line">${line.slice(10)}</div>
        `
      )
      .join("");
    this.$lines.innerHTML = html;
  }
  update() {
    this.elapsed = Math.round(
      this.$audio ? this.$audio.currentTime : this.elapsed + 1
    );
    if (this.index === this.lyrics.length - 1) return;
    for (let i = this.index + 1; i < this.lyrics.length; i++) {
      let seconds = this.getSeconds(this.lyrics[i]);
      if (
        this.elapsed === seconds &&
        (!this.lyrics[i + 1] ||
          this.elapsed < this.getSeconds(this.lyrics[i + 1]))
      ) {
        this.$lines.children[this.index].classList.remove("active");
        this.$lines.children[i].classList.add("active");
        this.index = i;
        break;
      }
    }
    if (this.index > 2) {
      let y = -(this.index - 2) * this.LINE_HEIGHT;
      this.$lines.style.transform = `translateY(${y}px)`;
    }
  }

  reset(text) {
    this.pause();
    this.elapsed = 0;
    this.index = 0;
    if (text) {
      this.text = this.formatText(text) || "";
      this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || [];
      // ^表示行首  $表示行尾  g表示全局  m表示多行
      if (this.lyrics.length) {
        this.render();
        this.$lines.children[this.index].classList.add("active ");
      }
    }
  }

  restart() {
    this.reset();
    this.start();
  }

  getSeconds(line) {
    return +line.replace(
      /^\[(\d{2}):(\d{2}).*/,
      (match, p1, p2) => 60 * +p1 + +p2
    );
  }

  formatText(text) {
    let div = document.createElement("div");
    div.innerHTML = text;
    return div.innerText;
  }
}

LyricsPlayer.prototype.LINE_HEIGHT = 42
