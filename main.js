let songCards=document.querySelector('.song-cards');
const addMusic=document.querySelector('.add_music');
const videoCards=document.querySelector('.video-cards');
const addVideo=document.querySelector('.add_videos');
const audioInput=document.querySelector('.audioInput');
const videoInput=document.querySelector('.videoInput');
const play_btn=document.querySelector('.playBtn');
const pause_btn=document.querySelector('.pauseBtn');
let volume_range=document.getElementById('sound-slider');
let slider=document.querySelector('.slider');
const mainHeader=document.querySelector('.main-header'),
videoControl=document.querySelector('.music-time'),
textHeader=document.querySelector('h1');



const add_name=()=>{
  let n=document.getElementById('n');
   n.showModal()
} 
const create_name=(spans)=>{
  let addName=document.querySelector('.add-name');
  let media_name=document.querySelector('.media-name');
  for(let span=0;span<spans.length;span++){
    addName.onclick=()=>spans[span].textContent=media_name.value;
  }
}
const search_name=(cards,spans)=>{
  let searchInput=document.querySelector('.search-input');
  searchInput.addEventListener('input',()=>{
      let searchName=searchInput.value.toLowerCase();
      cards.forEach((card, index)=>{
          let cardName=spans[index].textContent.toLowerCase();
          if (cardName.includes(searchName)) {
              card.style.display = 'block';
          } else {
              card.style.display = 'none';
          }
      });
  });
};

const addImgToAudioCard=(cards,audio_cards)=>{
  cards.forEach(card=>{
   card.onclick=()=>{
      let img=card.querySelector('img');
      let input=prompt('add the name of the audio card to set this image as a background!');
    if(input){
      audio_cards.forEach(audioCard=>{
       let audio_name=audioCard.querySelector('.audioName');
        if(audio_name.textContent.trim().toLowerCase()===input.trim().toLowerCase()){audioCard.style.backgroundImage=`url(${img.src})`};
      })
    }
    }
  })
}

  const playingAudio=(cards,cardBg)=>{
   let musciCycle=document.querySelector('.music-cycle');
   let songName=document.querySelector('.song-name b');
     cardBg.forEach(card=>{
      let image=getComputedStyle(card).getPropertyValue('background-image');
      musciCycle.style.backgroundImage=`${image}`;
     })
      let name=cards.querySelector('.audioName');
      songName.textContent=name.textContent;
}

const  play_media=(media,durationTime,currentTime,range)=>{
  media.addEventListener('timeupdate',()=>{
  let dMinute=Math.floor(media.duration/60);
  let dSecond=Math.floor(media.duration%60);
  let cMinute=Math.floor(media.currentTime/60);
  let cSecond=Math.floor(media.currentTime%60);
  let progress=(media.currentTime/media.duration) * 100;
  if(dSecond<10){
    dSecond=`0${dSecond}`;
  }
  else if(cSecond<10){
    cSecond=`0${cSecond}`;
  }
 else if(dMinute>59){
    dMinute=`${Math.floor(dMinute/60)}:${Math.floor(dMinute%60)}`;
   
  }
  else if(cMinute>59){
     cMinute=`${Math.floor(cMinute/60)}:${Math.floor(cMinute%60)}`;
  }
  else if(dMinute&&dSecond != NaN){
    durationTime.textContent=`${dMinute}:${dSecond}`;
  }
   
   currentTime.textContent=`${cMinute}:${cSecond}`;
   range.style.setProperty('--progress',`${progress}%`);
   range.style.setProperty('--clr','rgb(197, 8, 97)');
   range.addEventListener('click',e=>{
     const width=range.clientWidth;
     const direction=e.offsetX;
    media.currentTime=(direction/width)*media.duration;
   })
})
 media.play();
 media.addEventListener('ended',()=>media.play());
}

let allAudios=[];
const songs_control=(currentAudio,audios)=>{
  const randomSong=document.querySelector('.random_song');
  const playBackward=document.querySelector('.playBackward');
  const playForward=document.querySelector('.playForward');
    let isPlaying=false;
    randomSong.onclick=()=>{
      if(isPlaying){
        currentAudio.setAttribute('autoplay',''); 
        currentAudio.setAttribute('loop','');
        randomSong.style.color='white';
        isPlaying=false;
    }
    else{
      currentAudio.removeAttribute('autoplay',''); 
      currentAudio.removeAttribute('loop','');
      randomSong.style.color='rgb(197, 8, 97)';
      isPlaying=true;
       currentAudio.addEventListener('ended',()=>{
           currentAudio.src=allAudios[Math.floor(Math.random() * allAudios.length)];
           currentAudio.load();
           currentAudio.play(); 
      })
    }
  }
  
 volume_range.addEventListener('input',(e)=>{
    currentAudio.volume=volume_range.value/100;
    let width=volume_range.value;
    slider.style.setProperty('--slider-width',`${width}%`);
  })
  playForward.onclick=()=>currentAudio.currentTime+=2;
  playBackward.onclick=()=>currentAudio.currentTime-=2;
}


const add_music=()=>{
  let fileUrl=URL.createObjectURL(audioInput.files[0]);
 songCards.innerHTML+=`
  <div class="card audio-card" draggable="true">
        <div class="sub-card">
        <audio src="${fileUrl}" style="display:none"></audio>
        <span class="audioName">unknown</span>
        </div>
   </div>
  `
  let card_container=document.querySelectorAll('.audio-card');
  //let removeAudio=card_container.querySelector('.sub-card audio');
  const cards=document.querySelectorAll('.card .sub-card');
  let durationTime=document.querySelector('.audioDuration_time');
  let currentTime=document.querySelector('.audioCurrent_time');
  let audioRange=document.querySelector('.audioRange');
   let songTitle=document.querySelector('.song-name');
  let audios=document.querySelectorAll('audio');
  let currentAudio=null;
 for(let card=0;card<cards.length;card++){
  cards[card].onclick=()=>{
    if(currentAudio){
    currentAudio.pause()
  }
     currentAudio=audios[card];
     currentAudio.play();
     currentAudio.currentTime=0;
     play_media(currentAudio,durationTime,currentTime,audioRange);
  if(currentAudio.played){
    play_btn.style.display="none";
    pause_btn.style.display="block";
  }
 else if(currentAudio.paused){
    play_btn.style.display="block";
    pause_btn.style.display="none";
  }
  play_btn.onclick=()=>{
    currentAudio.play();
    play_btn.style.display="none";
    pause_btn.style.display="block";
  }
  pause_btn.onclick=()=>{
    currentAudio.pause();
    play_btn.style.display="block";
    pause_btn.style.display="none";
  }
  songs_control(currentAudio,audios);
  playingAudio(cards[card],card_container);
  }
  allAudios.push(fileUrl);
  let spans=document.querySelectorAll('.audioName');
  search_name(card_container,spans);
  create_name(spans);
}
}

audioInput.addEventListener('change',()=>{
  let file=audioInput.files[0];
  add_music();
  add_name();
})

const videoStyles=(videoControl,video_multimedia)=>{
   videoControl.classList.toggle('removeVideoPlay');
  video_multimedia.classList.toggle('removeVideoPlay');
}
 
const videoPausePlay=(currentVideo)=>{
  let playBackwardVideo=document.querySelector('.playBackwardVideo');
  let playForwardVideo=document.querySelector('.playForwardVideo');
  let playBtnVideo=document.querySelector('.playBtnVideo');
  let pauseBtnVideo=document.querySelector('.pauseBtnVideo');
  const large_screen=document.querySelector('.large-screen');
  playForwardVideo.onclick=()=>currentVideo.currentTime+=2;
  playBackwardVideo.onclick=()=>currentVideo.currentTime-=2;
  playBtnVideo.style.display='none';
  pauseBtnVideo.style.display='block';
 pauseBtnVideo.onclick=()=>{
  playBtnVideo.style.display='block';
  pauseBtnVideo.style.display='none';
  currentVideo.pause()
 }
playBtnVideo.onclick=()=>{
  playBtnVideo.style.display='none';
  pauseBtnVideo.style.display='block';
  currentVideo.play()
 }
 large_screen.onclick=()=>{
  mainHeader.classList.toggle('large_screen');
  large_screen.classList.toggle('color-change');
 }
 currentVideo.currentTime=0;
}

  let currentVideo = null;
  function add_video(fileUrl) {
      videoCards.innerHTML+=`
      <div class="card video-card" draggable='true'>
          <div class="sub-card video-sub-card">
              <span class='videoName'>name</span>
          </div>
          <video autoplay muted src="${fileUrl}" type="video/mp4"></video>
      </div>
      `;   
      let videos=document.querySelectorAll('.video-card video');
      let cards=document.querySelectorAll('.video-card');
      videos.forEach((video,index)=>{
         video.volume=0;
          video.onclick=()=>{
            mainHeader.classList.add('lazyloading')
              handleVideoClick(video);
          };
      });
      let spans=document.querySelectorAll('.videoName');
      create_name(spans);
      search_name(cards,spans);
  }
  
  function handleVideoClick(video) {
    let durationTime=document.querySelector('.videoDuration_time');
    let currentTime=document.querySelector('.videoCurrent_time');
    const videoRange=document.querySelector('.videoRange');
    const videoControl=document.querySelector('.music-time');
    let video_multimedia=document.querySelector('.video-control');
      video.removeAttribute('muted');
      let clonedVideo=video.cloneNode(true);
      if (currentVideo) {
          mainHeader.removeChild(currentVideo);
      }
      textHeader.style.display = 'none';
      videoControl.style.opacity = '1';
      video_multimedia.style.opacity = '1';
      currentVideo = clonedVideo;
      mainHeader.appendChild(currentVideo);
      play_media(currentVideo, durationTime, currentTime, videoRange);
      currentVideo.onclick = () => videoStyles(videoControl,video_multimedia);
      videoPausePlay(currentVideo);
       mainHeader.classList.add('lazyloading')
  }
  
  videoInput.onchange = function() {
      let fileUrl = URL.createObjectURL(videoInput.files[0]);
      add_video(fileUrl);
      add_name()
  };
  document.addEventListener('DOMContentLoaded',()=>{
    mainHeader.classList.add('lazyloading');
    setInterval(()=>mainHeader.classList.remove('lazyloading'),13000)
  })
 
  
const image_input=document.querySelector('.imageInput');
const image_container=document.querySelector('.images-container');
  const add_images=()=>{
    let fileUrl=URL.createObjectURL(image_input.files[0]);
    image_container.innerHTML+=`
    <div class="image-card" draggable="true">
          <img src="${fileUrl}" alt='image' />
          <span class='imageName'></span>
      </div>`;
    //let img=document.querySelectorAll('.image-card img');
    let cards=document.querySelectorAll('.image-card');
    let audio_cards=document.querySelectorAll('.audio-card');
    //audio_name=document.querySelector('.audioName');
    let spans=document.querySelectorAll('.imageName');
    if(cards.length>3){
      image_container.style.overflowY='auto';
      image_container.style.height='400px';
    }
   create_name(spans);
   search_name(cards,spans);
   addImgToAudioCard(cards,audio_cards);
  }
  image_input.onchange=()=>{
    add_images();
    add_name();
  }

 
 
