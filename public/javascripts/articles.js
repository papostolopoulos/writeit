//RENDER ALL THE ARTICLES BY LOOPING

let iFrameArticles = document.getElementsByClassName("iFrameArticles");
let hiddenSpan = document.getElementsByClassName("hiddenSpan");

//MAKE THE IFRAME HEIGHT EQUAL TO CONTENT AFTER THE VALUE IS SET FROM THE HIDDEN SPAN
for (let i = 0; i < iFrameArticles.length; i++) {
  iFrameArticles[i].contentDocument.body.innerHTML = hiddenSpan[i].getAttribute("value");
  iFrameArticles[i].height = iFrameArticles[i].contentDocument.body.scrollHeight;
}
