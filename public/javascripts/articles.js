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
    
  } //End of for loop
}


//attach an event listener when the iframes are ready
