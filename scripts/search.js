class Search{
    constructor(el){
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup',this.onKeyUp.bind(this))
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.songs = []

        this.perpage = 20
    }
    onKeyUp(event){
        // console.log(this)
        let keyword = event.target.value.trim()
        if(event.key !=='Enter') return
        this.search(keyword)
    }

    search(keyword){
        this.keyword = keyword
        console.log(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page}`)
        fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${this.page}`)
            .then(res => res.json() )
            .then(json => json.data.song.list)
            .then(songs => this.append(songs))
    }

    append(songs){
        let html = songs.map(song =>
            `<li class = 'song-item'>
                <i class='icon icon-music'></i>
                <div class='song-name ellipsis'>${song.songname}</div>
                <div class='song-artist ellipsis'>${song.singer.map(s => s.name).join(' ')}</div>
            </li>`).join('')
            this.$songs.insertAdjacentHTML('beforeend',html)
        
    }
}