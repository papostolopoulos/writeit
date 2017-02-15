//RENDER ALL THE ARTICLES BY LOOPING
window.onload = ()=>{
  let iFrameArticles = document.getElementsByClassName("iFrameArticles");
  let hiddenSpan = document.getElementsByClassName("hiddenSpan");

  //MAKE THE IFRAME HEIGHT EQUAL TO CONTENT AFTER THE VALUE IS SET FROM THE HIDDEN SPAN
  for (let i = 0; i < iFrameArticles.length; i++) {
    iFrameArticles[i].contentDocument.body.innerHTML = hiddenSpan[i].getAttribute("value");
    setTimeout(function(){ //Can you fix this hack?
      iFrameArticles[i].height = iFrameArticles[i].contentDocument.body.scrollHeight + "px";
    }, 200)



    //IF THE WIDTH OF THE SCREEN IS 768 OR LESS
    if (document.getElementsByTagName("body")[0].offsetWidth <= 768) {
      //MODIFY THE IMAGES WIDTH TO RENDER IN MOBILE
      let iFrameImages = iFrameArticles[i].contentDocument.body.getElementsByTagName("img");
      for (let j = 0; j < iFrameImages.length; j++) {
        var imageDesktopSource = iFrameImages[j].getAttribute("src");
        if (imageDesktopSource.includes("w_640")) {
          console.log("inside if");
          console.log(imageDesktopSource);
          let imageNewSource = imageDesktopSource.replace(/w_640/, "w_280");
          console.log(imageNewSource);
          iFrameImages[j].setAttribute("src", imageNewSource);
        }
      }


      //MODIFY THE VIDEOS WIDTH TO RENDER IN MOBILE
      let iFrameVideos = iFrameArticles[i].contentDocument.body.getElementsByTagName("source");
      console.log(iFrameVideos);
      for (let k = 0; k < iFrameVideos.length; k++) {
        var videoDesktopSource = iFrameVideos[k].getAttribute("src");
        console.log(videoDesktopSource);
        if (videoDesktopSource.includes("w_640")) {
          console.log("inside if");
          console.log(videoDesktopSource);
          let videoNewSource = videoDesktopSource.replace(/w_640/, "w_280");
          console.log(videoNewSource);
          iFrameVideos[k].setAttribute("src", videoNewSource);
        }
      }
    }
  } //End of for loop
}


//attach an event listener when the iframes are ready
