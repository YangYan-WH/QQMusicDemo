class LyricsPlayer {
    constructor(el) {
        this.$el = el
        this.$el.innerHTML = '<div class="player-lyrics-lines"></div>'
        this.$lines = this.$el.querySelector('.player-lyrics-lines')
        this.text = ''
        this.lyrics=[]
        this.elapsed = 0
        this.index = 0 
    }

    start(){
        this.intervalId = setInterval(this.update.bind(this),50)
    }
    pause(){
        clearInterval(this.intervalId)
    }
    render() {
        let html = this.lyrics.map(line =>`
            <div class="player-lyrics-line">${line.slice(10)}</div>
        `).join('')
        this.$lines.innerHTML = html
    }
    update(){
        this.elapsed +=0.05
        if(this.elapsed >= this.duration) this.reset()
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translate(${this.progress *100 -100}%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
    }

    reset(text){
        this.pause()
        this.elapsed = 0
        this.index = 0 
        if(text){
            this.text = this.formatText(text) || ''
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
                                           // ^表示行首  $表示行尾  g表示全局  m表示多行 
            if(this.lyrics.length){
                this.render()
                this.$lines.children[this.index].classList.add('active ')
            }
        }
    }
    formatText (text){
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }
}