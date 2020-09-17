//Get elements 

const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");




// build functions 

function togglePlay() {

    if (video.paused) {

        video.play()
    } else {

        video.pause()
    }

}



//add listeners 

function updateButton() {

    console.log("update button")

    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

function skip() {

    console.log(this.dataset.skip)

    video.currentTime += parseFloat(this.dataset.skip)

}

function handleRangeUpdate() {

    video[this.name] = this.value
    console.log(this.value)

}

function handleProgress() {

    const percent=(video.currentTime/video.duration)*100
    progressBar.style.flexBasis=`${percent}%`

}

function scrub(event){


    console.log(event)

    scrubTime=(event.offsetX/progress.offsetWidth)*video.duration

    video.currentTime=scrubTime

}





video.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate",handleProgress)

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((button) => button.addEventListener("click", skip))

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate))


let mouseDown=false;
progress.addEventListener("click",scrub)

progress.addEventListener("mousemove",()=>{

    if(mouseDown){
        scrub(event);
    }
})

progress.addEventListener("mousedown",()=>mouseDown=true)
progress.addEventListener("mouseup",()=>mouseDown=false)