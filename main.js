const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,

    songs: [
        {
            name: 'phien la cuoi cung',
            singer: 'thuy tri',
            path: './music/Phien La Tinh Lang - Thuy Chi.mp3',
            image: './img/phien la cuoi cung.jpg'
        },
        {
            name: 'niu duyen',
            singer: 'le bao binh',
            path: './music/NiuDuyen-LeBaoBinh.mp3',
            image: './img/niu duyen.jpg'
        },
        {
            name: 'cau hen cau the',
            singer: 'dinh phong',
            path: './music/Câu Hẹn Câu Thề.mp3',
            image: './img/cau hen cau the.jpg'
        },
        {
            name: 'niu duyen',
            singer: 'le bao binh',
            path: './music/NiuDuyen-LeBaoBinh.mp3',
            image: './img/niu duyen.jpg'
        },
        {
            name: 'phien la cuoi cung',
            singer: 'thuy tri',
            path: './music/Phien La Tinh Lang - Thuy Chi.mp3',
            image: './img/phien la cuoi cung.jpg'
        }
    ],

    render: function () {
        const htmls = this.songs.map(song => {
            return `
                    <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },

    headleEvents: function () {
        const _this = this

        const cdWidth = cd.offsetWidth

        // tạo hiệu ứng quay

        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth
        }

        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        audio.onpause = function () {
            player.classList.remove('playing')
            _this.isPlaying = false
            cdThumbAnimate.pause()
        }

        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        prevBtn.onclick = function () {
            _this.prevSong()
            audio.play()
        }

        nextBtn.onclick = function () {
            _this.nextSong()
            console.log(audio.play())
        }

        


    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length -1
        }
        this.loadCurrentSong()
    },

    start: function () {
        this.defineProperties();

        this.headleEvents();

        this.loadCurrentSong();

        this.render();
    },
}

app.start()












