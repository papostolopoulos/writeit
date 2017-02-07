//RENDER ALL THE ARTICLES BY LOOPING

let iFrameArticles = document.getElementsByClassName("iFrameArticles");
let hiddenSpan = document.getElementsByClassName("hiddenSpan");

for (let i = 0; i < iFrameArticles.length; i++) {
  iFrameArticles[i].contentDocument.body.innerHTML = hiddenSpan[i].getAttribute("value");
  iFrameArticles[i].height = iFrameArticles[i].contentWindow.document.body.scrollHeight + 50;
}
