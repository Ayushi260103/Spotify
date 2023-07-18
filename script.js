let songIndex = 0;
let flag = true;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songItem = Array.from(document.getElementsByClassName('songItem'));
let input = document.getElementById("input");
let search = document.getElementById("search");
let songs = [
    { songName: "Night Changes - One Direction", filePath: "songs/1.mp3", coverpath: "covers/cover1.jpeg" },
    { songName: "Let Me Love You - Justin Bieber", filePath: "songs/2.mp3", coverpath: "covers/cover2.jpg" },
    { songName: "Love Story - Taylor Swift", filePath: "songs/3.mp3", coverpath: "covers/cover3.jpeg" },
    { songName: "At My Worst - Pink Sweats", filePath: "songs/4.mp3", coverpath: "covers/cover4.jpeg" },
    { songName: "Perfect - Ed Sheeran", filePath: "songs/5.mp3", coverpath: "covers/cover5.jpeg" },
    { songName: "Play Date - Melanie Martinez", filePath: "songs/6.mp3", coverpath: "covers/cover6.jpeg" },
    { songName: "Until I Found You - Stephen Sanchez", filePath: "songs/7.mp3", coverpath: "covers/cover7.jpeg" },
]
/*let songItems=Array.from(document.getElementsByClassName('songItem'));
songItems.forEach((Element,i)=>{
    console.log(Element,i);
    Element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    Element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
})*/
search.addEventListener("click", () => {
    let searchSong = input.value;
    let index = -1;
    for (i = 0; i < 7; i++) {
        if (songs[i].songName == searchSong) {
            index = i;
            break;
        }
    }
    if (index == -1) {
        alert("Song not found!");
    }
    else {
        songItem[index].classList.add("search-transition");
        songItem[index].addEventListener('click', () => {
            songItem[index].classList.remove("search-transition");
            input.value = "";
        })
    }
})
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        songItemPlay[songIndex].classList.add('fa-pause-circle');
        songItemPlay[songIndex].classList.remove('fa-play-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        songItemPlay[songIndex].classList.add('fa-play-circle');
        songItemPlay[songIndex].classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})
const stopAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (flag) {
            let idx = songIndex;
            if (idx != e.target.id) {
                songIndex = parseInt(e.target.id);
                audioElement.src = `songs/${songIndex + 1}.mp3`
                audioElement.currentTime = 0;
                idx.classList.add('fa-play-circle');
                idx.classList.remove('fa-pause-circle');
            }
            stopAllPlays();
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            flag = false;
        }
        else {
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            audioElement.pause();
            flag = true;
            gif.style.opacity = 0;
        }
    })
})
document.getElementById('previous').addEventListener('click', () => {
    songItemPlay[songIndex].classList.add('fa-play-circle');
    songItemPlay[songIndex].classList.remove('fa-pause-circle');
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    audioElement.play();
    flag = false;
})
document.getElementById('next').addEventListener('click', () => {
    songItemPlay[songIndex].classList.add('fa-play-circle');
    songItemPlay[songIndex].classList.remove('fa-pause-circle');
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    songItemPlay[songIndex].classList.add('fa-pause-circle');
    songItemPlay[songIndex].classList.remove('fa-play-circle');
    audioElement.play();
    flag = true;
})
// document.onkeydown=function(e){
//     if(e.keycode===32){
//         if (audioElement.paused || audioElement.currentTime <= 0) {
//             audioElement.play();
//             masterPlay.classList.remove('fa-play-circle');
//             masterPlay.classList.add('fa-pause-circle');
//             songItemPlay[songIndex].classList.add('fa-pause-circle');
//             songItemPlay[songIndex].classList.remove('fa-play-circle');
//             gif.style.opacity = 1;
//         }
//         else {
//             audioElement.pause();
//             masterPlay.classList.remove('fa-pause-circle');
//             masterPlay.classList.add('fa-play-circle');
//             songItemPlay[songIndex].classList.add('fa-play-circle');
//             songItemPlay[songIndex].classList.remove('fa-pause-circle');
//             gif.style.opacity = 0;
//         }
//     }
// }