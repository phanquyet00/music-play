const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const playlist = $('.playlist')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')

const app = {
    currentIndex: 0,

    songs: [
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
            const cdWidth = cd.offsetWidth
            document.onscroll = function () {
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop
                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
                cd.style.opacity = newCdWidth/cdWidth
            }
        },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },


    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    start: function () {


        // Định nghĩa các thuộc tính cho object
        // Defines properties for the object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        // Listening / handling events (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        // Load the first song information into the UI when running the app
        this.loadCurrentSong();

        // Render playlist
        this.render();


    },
}

app.start()










