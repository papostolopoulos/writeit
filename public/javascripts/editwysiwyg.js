let spanSingleArticle = document.getElementById("spanSingleArticle");
let richTextFieldEditable = document.getElementById("richTextField");

richTextFieldEditable.contentDocument.body.innerHTML = spanSingleArticle.getAttribute("value");
