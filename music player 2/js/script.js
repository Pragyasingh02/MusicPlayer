 const content = document.querySelector(".content"),
 Playimage = content.querySelector(".music-image img"),
 musicName = content.querySelector(".music-title .name"),
 musicArtist = content.querySelector(".music-title .artist"),
 Audio = document.querySelector(".main-song"),
 playBtn = content.querySelector(".play-pause"),
 playBtnIcon = content.querySelector(".play-pause span");
 prevBtn = content.querySelector("#prev");
 nextBtn = content.querySelector("#next");
 progressBar = content.querySelector(".progress-bar");
 progressDetails = content.querySelector(".progress-details");
 repeatBtn = content.querySelector("#repeat");
 Shuffle = content.querySelector("#shuffle");

 let index = 1;

 window.addEventListener("load", ()=>{
    loadData(index);
 });

 function loadData(indexValue){
    musicName.innerHTML = song[indexValue - 1].name;
    musicArtist.innerHTML = song[indexValue - 1].artist;
    Playimage.src = "images/"+song[indexValue - 1].img+".jpg";
    Audio.src = "music/"+song[indexValue - 1].audio+".mp3";

 }

 playBtn.addEventListener("click", ()=>{
   const isMusicPaused = content.classList.contains("paused");
   if(isMusicPaused){
      pauseSong();
   }
   else{
      playSong();
   }
 });
 function playSong(){
   content.classList.add("paused");
   playBtnIcon.innerHTML = "pause";
   Audio.play();
 }

 function pauseSong(){
   content.classList.remove("paused");
   playBtnIcon.innerHTML = "play_arrow";
   Audio.pause();
 }
 nextBtn.addEventListener("click", ()=>{
   nextSong();
 });
 prevBtn.addEventListener("click", ()=>{
   prevSong();
 });

 function nextSong(){
   index++;
   if(index > song.length){
      index = 1;
   }
   else{
      index = index;
   }
   loadData(index);
   playSong();
 }
 function prevSong(){
   index--;
   if(index <= 0){
      index = song.length;
   }
   else{

      index = index;

   }
   loadData(index);
   playSong();
 }

 Audio.addEventListener("timeupdate", (e)=>{
   const initialTime = e.target.currentTime;
   const finalTime = e.target.duration;
   let BarWidth = (initialTime / finalTime) * 100;
   progressBar.style.width = BarWidth+"%";

   progressDetails.addEventListener("click", (e)=>{
    let progressValue = progressDetails.clientWidth;
    let clickedOffsetX = e.offsetX;
    let MusicDuration = Audio.duration;

    Audio.currentTime = (clickedOffsetX / progressValue)* MusicDuration;
   });

   Audio.addEventListener("loadeddata", ()=>{
    let finalTimeData = content.querySelector(".final");

    let AudioDuration = Audio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSecond = Math.floor(AudioDuration % 60);
    if(finalSecond < 10){
      finalSecond.innerText = "0"+finalSecond;
    }
    finalTimeData.innerText = finalMinutes +":"+finalSecond;
   });
let currentTimeData = content.querySelector(".current");
let CurrentTime = Audio.currentTime;
let currentMinutes = Math.floor(CurrentTime / 60);
let currentSeconds = Math.floor(CurrentTime % 60);
if(currentSeconds < 10){
  currentSeconds = "0"+currentSeconds;
}
currentTimeData.innerText = currentMinutes+":"+currentSeconds;
 repeatBtn.addEventListener("click",()=>{
  Audio.currentTime = 0;
 });
});
Shuffle.addEventListener("click",()=>{
  var readIndex = Math.floor(Math.random() * song.length)+ 1;
  loadData(readIndex);
  playSong();
});
Audio.addEventListener("ended", ()=>{
  index++;
  if(index > song.length){
    index = 1;
  }
  loadData(index);
  playSong();
});


