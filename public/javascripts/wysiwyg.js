
$.cloudinary.config({ cloud_name: 'writeit', api_key: '957122638812785'});



//VARIABLE DECLARATIONS
let richTextField = document.getElementById("richTextField");
let buttonBold = document.getElementById("buttonBold");
let buttonItalic = document.getElementById("buttonItalic");
let buttonUnderline = document.getElementById("buttonUnderline");
let buttonStrikethrough = document.getElementById("buttonStrikethrough");
let buttonSubscript = document.getElementById("buttonSubscript");
let buttonSuperscript = document.getElementById("buttonSuperscript");
let buttonUndo = document.getElementById("buttonUndo");
let buttonRedo = document.getElementById("buttonRedo");
let buttonCut = document.getElementById("buttonCut");
let buttonCopy = document.getElementById("buttonCopy");
let buttonPaste = document.getElementById("buttonPaste");
let buttonSelectAll = document.getElementById("buttonSelectAll");
let buttonJustifyLeft = document.getElementById("buttonJustifyLeft");
let buttonJustifyCenter = document.getElementById("buttonJustifyCenter");
let buttonJustifyRight = document.getElementById("buttonJustifyRight");
let buttonJustifyFull = document.getElementById("buttonJustifyFull");
let buttonIndent = document.getElementById("buttonIndent");
let buttonOutdent = document.getElementById("buttonOutdent");
let buttonInsertUnorderedList = document.getElementById("buttonInsertUnorderedList");
let buttonInsertOrderedList = document.getElementById("buttonInsertOrderedList");
let buttonInsertParagraph = document.getElementById("buttonInsertParagraph");
let selectParagraphStyle = document.getElementById("selectParagraphStyle")
let buttonHorizontalRule = document.getElementById("buttonHorizontalRule")
let buttonInsertLink = document.getElementById("buttonInsertLink");
let buttonRemoveLink = document.getElementById("buttonRemoveLink");
let buttonInlineSourceCode = document.getElementById("buttonInlineSourceCode");
let buttonSourceCode = document.getElementById("buttonSourceCode");
let buttonToggleEdit = document.getElementById("buttonToggleEdit");
let toggleIcon = document.getElementById('toggleIcon');
let selectFontStyle = document.getElementById("selectFontStyle");
let selectFontSize = document.getElementById("selectFontSize");
let buttonFontColor = document.getElementById("buttonFontColor");
let inputFontColor = document.getElementById("inputFontColor");
// let inputBackgroundColor = document.getElementById("inputBackgroundColor");
let buttonHighlightColor = document.getElementById("buttonHighlightColor");
let inputHighlightColor = document.getElementById("inputHighlightColor");
let buttonClearColorSettings = document.getElementById("buttonClearColorSettings");
let buttonInsertOnlineImage = document.getElementById('buttonInsertOnlineImage');
let buttonInsertVideo = document.getElementById("buttonInsertVideo");
let inputInsertVideo = document.getElementById("inputInsertVideo");
let buttonInsertCloudImage = document.getElementById("buttonInsertCloudImage");
let formImageUploadCloudinary = document.getElementById("formImageUploadCloudinary");
let cloudinary_fileupload = document.getElementsByClassName("cloudinary_fileupload");



let formNewArticle = document.getElementById("formNewArticle");
let buttonSubmitNewArticle = document.getElementById("buttonSubmitNewArticle");
let inputNewArticleTitleVisible = document.getElementById("inputNewArticleTitleVisible");
let inputNewArticle = document.getElementById("inputNewArticle")






//EVENT LISTENERS
buttonBold.addEventListener("click", ()=>{execCmd('bold', false, null)});
buttonItalic.addEventListener("click", ()=>{execCmd('italic', false, null)});
buttonUnderline.addEventListener("click", ()=>{execCmd('underline', false, null)});
buttonStrikethrough.addEventListener("click", ()=>{execCmd('strikethrough', false, null)});
buttonJustifyLeft.addEventListener("click", ()=>{execCmd('justifyLeft', false, null)});
buttonJustifyCenter.addEventListener("click", ()=>{execCmd('justifyCenter', false, null)});
buttonJustifyRight.addEventListener("click", ()=>{execCmd('justifyRight', false, null)});
buttonJustifyFull.addEventListener("click", ()=>{execCmd('justifyFull', false, null)});
buttonCut.addEventListener("click", ()=>{execCmd('cut', false, null)});
buttonCopy.addEventListener("click", ()=>{execCmd('copy', false, null)});
buttonPaste.addEventListener("click", ()=>{execCmd('paste', false, null)}); //This has a problem
buttonIndent.addEventListener("click", ()=>{execCmd('indent', false, null)});
buttonOutdent.addEventListener("click", ()=>{execCmd('outdent', false, null)});
buttonSubscript.addEventListener("click", ()=>{execCmd('subscript', false, null)});
buttonSuperscript.addEventListener("click", ()=>{execCmd('superscript', false, null)});
buttonUndo.addEventListener("click", ()=>{execCmd('undo', false, null)});
buttonRedo.addEventListener("click", ()=>{execCmd('redo', false, null)});
buttonInsertUnorderedList.addEventListener("click", ()=>{execCmd('insertUnorderedList', false, null)});
buttonInsertOrderedList.addEventListener("click", ()=>{execCmd('insertOrderedList', false, null)});
buttonInsertParagraph.addEventListener("click", ()=>{execCmd('insertParagraph', false, null)});
selectParagraphStyle.addEventListener("change", ()=>{execCmd('formatBlock', false, selectParagraphStyle[selectParagraphStyle.selectedIndex].getAttribute('value'))});
buttonHorizontalRule.addEventListener("click", ()=>{execCmd('insertHorizontalRule'), false, null});
buttonInsertLink.addEventListener("click", ()=>{execCmd("createLink", false, prompt('Please enter a URL', 'http://'))});
buttonRemoveLink.addEventListener("click", ()=>{execCmd("unlink", false, null)});
buttonInlineSourceCode.addEventListener("click", ()=>{execCmdPrompt("insertHTML", false, prompt('Please insert the raw html here', 'Example: <h1>writeIt rocks!</h1>'))});
buttonSourceCode.addEventListener("click", ()=>{toggleSource()});
buttonToggleEdit.addEventListener("click", ()=>{toggleEdit()})
selectFontStyle.addEventListener("change", ()=>{execCmd("fontName", false, selectFontStyle[selectFontStyle.selectedIndex].getAttribute('value', 'value'))});
selectFontSize.addEventListener("change", ()=>{execCmd("fontSize", false, selectFontSize[selectFontSize.selectedIndex].getAttribute('value'))});
buttonFontColor.addEventListener("click", ()=>{clickInputInsert(inputFontColor)});
inputFontColor.addEventListener("change", ()=>{execCmd("foreColor", false, inputFontColor.value)}); //Not sure why the getAttribute("value")  does not work
// inputBackgroundColor.addEventListener("change", ()=>{execCmd("backColor", false, inputBackgroundColor.value)}); //Need to work on this. Will this come in the function through a form?
buttonHighlightColor.addEventListener("click", ()=>{clickInputInsert(inputHighlightColor)});
inputHighlightColor.addEventListener("change", ()=>{execCmd("hiliteColor", false, inputHighlightColor.value)});
buttonClearColorSettings.addEventListener("click", clearColorSettings);
buttonInsertOnlineImage.addEventListener("click", ()=>{execCmdPrompt("insertImage", false, prompt('Please enter the image url', 'http://'))});
buttonInsertVideo.addEventListener("click", ()=>{clickInputInsert(inputInsertVideo)});
inputInsertVideo.addEventListener("change", ()=>{findPositionAndUploadVideo(inputInsertVideo)});
buttonSelectAll.addEventListener("click", ()=>{execCmd("selectAll")});
buttonInsertCloudImage.addEventListener("click", ()=>{clickInputInsert(cloudinary_fileupload[1])})


buttonSubmitNewArticle.addEventListener("mouseover", ()=>{registerIframeInfo()});
inputNewArticleTitleVisible.addEventListener("keyup", inputUpdateTitle);







// ----------FUNCTION DECLARATIONS=========================
//ENABLE EDIT MODE FOR THE IFRAME AREA
function enableEditMode() {
  richTextField.contentDocument.designMode = "On";
  richTextField.contentDocument.body.focus();
}


//EXECCOMMAND - ALLOWS US TO RUN COMMANDS TO MANIPULATE THE CONTENTS OF THE EDITABLE REGION
function execCmd(command, bool, value) {
  console.log(command);
  event.preventDefault();
  richTextField.contentDocument.execCommand(command, bool, value)
  richTextField.contentDocument.body.focus();
}


//EXECCOMMAND FOR PROMPT USER INFO
function execCmdPrompt(command, bool, value) {
  if (value !== null) {
    event.preventDefault();
    richTextField.contentDocument.execCommand(command, bool, value)
    richTextField.contentDocument.body.focus();
  }
}



//SWITCH FROM TEXT EDITOR TO RAW HTML
let showingSourceCode = false; //A variable that defines if the view should be turned on or off
function toggleSource() {
  if (showingSourceCode) {
    richTextField.contentDocument.getElementsByTagName('body')[0].innerHTML = richTextField.contentDocument.getElementsByTagName('body')[0].textContent;
    showingSourceCode = false;
  }
  else {
    richTextField.contentDocument.getElementsByTagName('body')[0].textContent = richTextField.contentDocument.getElementsByTagName('body')[0].innerHTML;
    showingSourceCode = true;
  }
}
// The textContent property sets or returns the textual content of the specified node, and all its descendants.
// If you set the textContent property, any child nodes are removed and replaced by a single Text node containing the specified string.



//SWITCH EDITOR ON AND OFF
let isInEditMode = true;
function toggleEdit() {
  if (isInEditMode) {
    //Change the icon
    event.preventDefault();
    toggleIcon.classList.add('fa-toggle-off');
    toggleIcon.classList.remove('fa-toggle-on');
    //switch off the editor
    richTextField.contentDocument.designMode = "Off";
    isInEditMode = false;
  }
  else {
    //Change the icon
    event.preventDefault();
    toggleIcon.classList.add('fa-toggle-on');
    toggleIcon.classList.remove('fa-toggle-off');
    //Switch on the editor
    richTextField.contentDocument.designMode = "On";
    richTextField.contentDocument.body.focus();
    isInEditMode = true;
  }
}


//CONNECT IFRAME TO THE TEXTAREA IN ORDER TO SUBMIT THE DATA TO DATABASE
function registerIframeInfo(){
  document.getElementById('textAreaNewArticle').value = document.getElementById("richTextField").contentDocument.body.innerHTML;
}


//CLEAR THE COLOR SETTINGS FOR FONT, HIGHLIGHT AND BACKGROUND
function clearColorSettings() {
  console.log(inputFontColor);
  execCmd("foreColor", false, "#000000");
  execCmd("hiliteColor", false, "#ffffff");
  richTextField.contentDocument.body.focus();
}


//UPDATE THE TITLE IN THE HIDDEN INPUT FROM ENTRY IN THE VISIBLE INPUT
function inputUpdateTitle() {
  inputNewArticleTitle.value = inputNewArticleTitleVisible.value
}


//ACTIVATE INPUT TYPE=FILE TAGS BY CLICKING AT DIFFERENT BUTTONS
function clickInputInsert(inputTag){
  inputTag.click();
}


//UPLOAD AND RENDER IMAGE FROM HARD DRIVE
function previewImageFile(source) {
  let newImage = document.createElement("img");

  var file = source.files[0];
  var reader = new FileReader(); //reads contents of files in the hard drive
  reader.addEventListener("load", function () {
    newImage.src = reader.result;
  }, false);


  if (file) {
    reader.readAsDataURL(file); //read contents of file and transform into base 64
  }
  console.log(newImage);
  newImage.style.width = "640px";
  // newImage.style.resize = "both";
  // newImage.style.overflow = "auto";
  // newImage.className = "newImage"

  //Find the right position for image to be inserted
  let cursorText = richTextField.contentDocument.getSelection().getRangeAt(0).endContainer.data; //returns a Selection object representing the text currently selected in the document.
  let iframeChildren = richTextField.contentDocument.body.children;
  for (let i = 0; i < iframeChildren.length; i++) {
    console.log("innerHTML for position" + i + ":" + iframeChildren[i].textContent.replace(/&nbsp;/g, "").trim());
    // console.log("CursorText: " + cursorText.trim());
    if (iframeChildren[i].textContent.replace(/&nbsp;/g, "").trim() === cursorText.trim()) {
      console.log("IN THE FIRST IF STATEMENT");
      // richTextField.contentDocument.body.insertBefore(newImage, iframeChildren[i]);
      iframeChildren[i].appendChild(newImage);

      return;
    }
  }
  if (richTextField.contentDocument.body.innerHTML === "") {
    richTextField.contentDocument.body.appendChild(newImage);
  }
  else if (richTextField.contentDocument.body.innerHTML !== "") {
    console.log("Got in the else statement");
    richTextField.contentDocument.body.insertBefore(newImage, iframeChildren[0]);
  }
  //Focus the document
  richTextField.contentDocument.body.focus();
}



//UPLOAD AND RENDER VIDEO FROM HARD DRIVE
//preview the information coming from the source
function previewFile(dataSource, sourceTagSrcAttribute) {
  var file = dataSource.files[0];
  var reader = new FileReader(); //reads contents of files in the hard drive

  reader.addEventListener("load", ()=>{
    sourceTagSrcAttribute.src = reader.result;
    console.log("inside event listener");

    var dataURL = reader.result; //Get the information about the type of the file being imported
    var mimeType = dataURL.split(",")[0].split(":")[1].split(";")[0];
    sourceTagSrcAttribute.setAttribute("type", mimeType);
    console.log(sourceTagSrcAttribute.getAttribute("type"));
  }, false);

  if (file) {
    reader.readAsDataURL(file); //read contents of file and transform into base 64
    console.log(file);
  }
}


// find position in document and upload media file
function findPositionAndUploadVideo(source) {

  let newVideo = document.createElement("video");
  let newVideoSource = document.createElement("source");
  let cursorText = richTextField.contentDocument.getSelection().getRangeAt(0).endContainer.data; //returns a Selection object representing the text currently selected in the document.
  let iframeChildren = richTextField.contentDocument.body.children;

  newVideo.setAttribute("controls", "controls");
  newVideo.setAttribute("allowfullscreen", "allowfullscreen");
  newVideo.style.width = "640px";
  newVideo.className = "newVideo";
  newVideo.appendChild(newVideoSource);

  if (richTextField.contentDocument.body.textContent === "") { //If the iframe is empty
    console.log("first if statement");
    previewFile(source, newVideoSource);
    setTimeout(function(){
      richTextField.contentDocument.body.appendChild(newVideo);
      richTextField.contentDocument.body.append(".");
      richTextField.contentDocument.body.focus();
    }, 1000);
  }
  else if (richTextField.contentDocument.body.textContent !== "" && richTextField.contentDocument.body.children.length === 0) {//If the iframe has text but no html children
    previewFile(source, newVideoSource);
    setTimeout(function(){
      richTextField.contentDocument.body.appendChild(newVideo);
      richTextField.contentDocument.body.append(".");
      richTextField.contentDocument.body.focus();
    }, 1000);
  }
  else if (richTextField.contentDocument.body.textContent !== "" && richTextField.contentDocument.body.children.length !== 0) {//The iframe has both content and html childrean
    for (let i = 0; i < iframeChildren.length; i++) {
      console.log("innerHTML for position" + i + ":" + iframeChildren[i].innerHTML.replace(/&nbsp;/g, "").trim());
      console.log(cursorText);
      console.log(iframeChildren[i].textContent);
      // console.log("CursorText: " + cursorText.trim());
      if (cursorText === undefined && iframeChildren[i].textContent.replace(/&nbsp;/g, "").trim() === "") {
        console.log("IN THE IF OF THE ELSE");
        previewFile(source, newVideoSource);
        setTimeout(function(){
          iframeChildren[i].appendChild(newVideo);
          richTextField.contentDocument.body.append(".");
          richTextField.contentDocument.body.focus();
        }, 1000);
        return;
      }
      else if (iframeChildren[i].textContent.replace(/&nbsp;/g, "").trim() === cursorText.trim()) {
        console.log("IN THE ELSE IF OF THE ELSE");
        // richTextField.contentDocument.body.insertBefore(newVideo, iframeChildren[i]);
        previewFile(source, newVideoSource);
        setTimeout(function(){
          iframeChildren[i].appendChild(newVideo);
          richTextField.contentDocument.body.append(".");
          richTextField.contentDocument.body.focus();
        }, 1000);
        return;
      }
    }
  }
}



//UPLOAD IMAGES FROM HARD DRIVE
$('.cloudinary_fileupload').append($.cloudinary.unsigned_upload_tag("z2mez0vj",
{ cloud_name: 'writeit' })
  .bind('fileuploadprogress', function(e, data) {
    $('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
  })
  .bind('cloudinarydone', function(e, data) {
    console.log(e);
    console.log(data.result);
      console.log(data.result.path);
      console.log(data.result.path.slice(data.result.path.length - 3));

      if (data.result.path.slice(data.result.path.length - 3) === "jpg" || data.result.path.slice(data.result.path.length - 3) === "png" || data.result.path.slice(data.result.path.length - 3) === "bmp") {
        let newImageSource = "https://res.cloudinary.com/writeit/image/upload/w_640,q_80,f_auto/" + data.result.path.slice(0, data.result.path.length - 3) + "jpg";
        let newImage = document.createElement("img");
        newImage.src = newImageSource;
        newImage.className = "newImage";
        execCmdPrompt("insertImage", false, newImageSource);
      }
      else if (data.result.path.slice(data.result.path.length - 3) === "mp4" || data.result.path.slice(data.result.path.length - 3) === "mov") {
        let newVideoSource = "https://res.cloudinary.com/writeit/video/upload/w_640,q_80/" + data.result.path.slice(0, data.result.path.length - 3);
        console.log("https://res.cloudinary.com/writeit/video/upload/w_640,q_80/" + data.result.path.slice(0, data.result.path.length - 3) + "mp4");
        let htmlVideoTag = "<video poster=" + newVideoSource + "jpg controls><source src=\"" + newVideoSource + "mp4\"/></video>"
        execCmdPrompt("insertHTML", false, htmlVideoTag);
      }
  })
);




//WORKING
// $('.formImageUploadCloudinary').append($.cloudinary.unsigned_upload_tag("z2mez0vj",
// { cloud_name: 'writeit' })
// .bind('fileuploadprogress', function(e, data) {
//   $('.progress_bar').css('width', Math.round((data.loaded * 100.0) / data.total) + '%');
// })
// .bind('cloudinarydone', function(e, data) {
//   console.log(e);
//   console.log(data.result);
//   $('.thumbnails')
//   .append($.cloudinary
//     .image(data.result.public_id, {
//       format: 'jpg',
//       width: 150,
//       height: 100,
//       crop: 'thumb',
//       gravity: 'face',
//       effect: 'saturation:50'
//     })
//   )
// })
// );




//FUNCTION CALLS
enableEditMode();





/*
Parameters

aCommandName
A DOMString specifying the name of the command to execute. See Commands for a list of possible commands.
aShowDefaultUI
A Boolean indicating whether the default user interface should be shown. This is not implemented in Mozilla.
aValueArgument
For commands which require an input argument (such as insertImage,
for which this is the URL of the image to insert), this is a DOMString providing that information.
Specify null if no argument is needed.
*/

/*
var parms = [{
	"cmd": "aCommandName",
	"desc": "A DOMString representing the name of the command"
}, {
	"cmd": "aShowDefaultUI",
	"desc": "A Boolean indicating whether the default user interface should be shown. This is not implemented in Mozilla."
}, {
	"cmd": "aValueArgument",
	"desc": "A DOMString representing some commands (such as insertimage) require an extra value argument (the image's url). Pass an argument of null if no argument is needed."
}];
var commands = [{
	"cmd": "backColor",
	"val": "red",
	"desc": "Changes the document background color. In styleWithCss mode, it affects the background color of the containing block instead. This requires a color value string to be passed in as a value argument. (Internet Explorer uses this to set text background color.)"
}, {
	"cmd": "bold",
	"icon": "bold",
	"desc": "Toggles bold on/off for the selection or at the insertion point. (Internet Explorer uses the STRONG tag instead of B.)"
}, {
	"cmd": "contentReadOnly",
	"desc": "Makes the content document either read-only or editable. This requires a boolean true/false to be passed in as a value argument. (Not supported by Internet Explorer.)"
}, {
	"cmd": "copy",
	"icon": "clipboard",
	"desc": "Copies the current selection to the clipboard. Clipboard capability must be enabled in the user.js preference file. See"
}, {
	"cmd": "createLink",
	"val": "http://twitter.com/netsi1964",
	"icon": "link",
	"desc": "Creates an anchor link from the selection, only if there is a selection. This requires the HREF URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)"
}, {
	"cmd": "cut",
	"icon": "scissors",
	"desc": "Cuts the current selection and copies it to the clipboard. Clipboard capability must be enabled in the user.js preference file. See"
}, {
	"cmd": "decreaseFontSize",
	"desc": "Adds a SMALL tag around the selection or at the insertion point. (Not supported by Internet Explorer.)"
}, {
	"cmd": "delete",
	"icon": "scissors",
	"desc": "Deletes the current selection."
}, {
	"cmd": "enableInlineTableEditing",
	"desc": "Enables or disables the table row and column insertion and deletion controls. (Not supported by Internet Explorer.)"
}, {
	"cmd": "enableObjectResizing",
	"desc": "Enables or disables the resize handles on images and other resizable objects. (Not supported by Internet Explorer.)"
}, {
	"cmd": "fontName",
	"val": "'Inconsolata', monospace",
	"desc": "Changes the font name for the selection or at the insertion point. This requires a font name string (\"Arial\" for example) to be passed in as a value argument."
}, {
	"cmd": "fontSize",
	"val": "1-7",
	"icon": "text-height",
	"desc": "Changes the font size for the selection or at the insertion point. This requires an HTML font size (1-7) to be passed in as a value argument."
}, {
	"cmd": "foreColor",
	"val": "rgba(0,0,0,.5)",
	"desc": "Changes a font color for the selection or at the insertion point. This requires a color value string to be passed in as a value argument."
}, {
	"cmd": "formatBlock",
	"desc": "Adds an HTML block-style tag around the line containing the current selection, replacing the block element containing the line if one exists (in Firefox, BLOCKQUOTE is the exception - it will wrap any containing block element). Requires a tag-name string to be passed in as a value argument. Virtually all block style tags can be used (eg. \"H1\", \"P\", \"DL\", \"BLOCKQUOTE\"). (Internet Explorer supports only heading tags H1 - H6, ADDRESS, and PRE, which must also include the tag delimiters < >, such as \"<H1>\".)"
}, {
	"cmd": "forwardDelete",
	"desc": "Deletes the character ahead of the cursor's position.  It is the same as hitting the delete key."
}, {
	"cmd": "heading",
	"val": "h3",
	"icon": "header",
	"desc": "Adds a heading tag around a selection or insertion point line. Requires the tag-name string to be passed in as a value argument (i.e. \"H1\", \"H6\"). (Not supported by Internet Explorer and Safari.)"
}, {
	"cmd": "hiliteColor",
	"val": "Orange",
	"desc": "Changes the background color for the selection or at the insertion point. Requires a color value string to be passed in as a value argument. UseCSS must be turned on for this to function. (Not supported by Internet Explorer.)"
}, {
	"cmd": "increaseFontSize",
	"desc": "Adds a BIG tag around the selection or at the insertion point. (Not supported by Internet Explorer.)"
}, {
	"cmd": "indent",
	"icon": "indent",
	"desc": "Indents the line containing the selection or insertion point. In Firefox, if the selection spans multiple lines at different levels of indentation, only the least indented lines in the selection will be indented."
}, {
	"cmd": "insertBrOnReturn",
	"desc": "Controls whether the Enter key inserts a br tag or splits the current block element into two. (Not supported by Internet Explorer.)"
}, {
	"cmd": "insertHorizontalRule",
	"desc": "Inserts a horizontal rule at the insertion point (deletes selection)."
}, {
	"cmd": "insertHTML",
	"val": "<h3>Life is great!</h3>",
	"icon": "code",
	"desc": "Inserts an HTML string at the insertion point (deletes selection). Requires a valid HTML string to be passed in as a value argument. (Not supported by Internet Explorer.)"
}, {
	"cmd": "insertImage",
	"val": "http://dummyimage.com/160x90",
	"icon": "picture-o",
	"desc": "Inserts an image at the insertion point (deletes selection). Requires the image SRC URI string to be passed in as a value argument. The URI must contain at least a single character, which may be a white space. (Internet Explorer will create a link with a null URI value.)"
}, {
	"cmd": "insertOrderedList",
	"icon": "list-ol",
	"desc": "Creates a numbered ordered list for the selection or at the insertion point."
}, {
	"cmd": "insertUnorderedList",
	"icon": "list-ul",
	"desc": "Creates a bulleted unordered list for the selection or at the insertion point."
}, {
	"cmd": "insertParagraph",
	"icon": "paragraph",
	"desc": "Inserts a paragraph around the selection or the current line. (Internet Explorer inserts a paragraph at the insertion point and deletes the selection.)"
}, {
	"cmd": "insertText",
	"val": new Date(),
	"icon": "file-text-o",
	"desc": "Inserts the given plain text at the insertion point (deletes selection)."
}, {
	"cmd": "italic",
	"icon": "italic",
	"desc": "Toggles italics on/off for the selection or at the insertion point. (Internet Explorer uses the EM tag instead of I.)"
}, {
	"cmd": "justifyCenter",
	"icon": "align-center",
	"desc": "Centers the selection or insertion point."
}, {
	"cmd": "justifyFull",
	"icon": "align-justify",
	"desc": "Justifies the selection or insertion point."
}, {
	"cmd": "justifyLeft",
	"icon": "align-left",
	"desc": "Justifies the selection or insertion point to the left."
}, {
	"cmd": "justifyRight",
	"icon": "align-right",
	"desc": "Right-justifies the selection or the insertion point."
}, {
	"cmd": "outdent",
	"icon": "outdent",
	"desc": "Outdents the line containing the selection or insertion point."
}, {
	"cmd": "paste",
	"icon": "clipboard",
	"desc": "Pastes the clipboard contents at the insertion point (replaces current selection). Clipboard capability must be enabled in the user.js preference file. See"
}, {
	"cmd": "redo",
	"icon": "repeat",
	"desc": "Redoes the previous undo command."
}, {
	"cmd": "removeFormat",
	"desc": "Removes all formatting from the current selection."
}, {
	"cmd": "selectAll",
	"desc": "Selects all of the content of the editable region."
}, {
	"cmd": "strikeThrough",
	"icon": "strikethrough",
	"desc": "Toggles strikethrough on/off for the selection or at the insertion point."
}, {
	"cmd": "subscript",
	"icon": "subscript",
	"desc": "Toggles subscript on/off for the selection or at the insertion point."
}, {
	"cmd": "superscript",
	"icon": "superscript",
	"desc": "Toggles superscript on/off for the selection or at the insertion point."
}, {
	"cmd": "underline",
	"icon": "underline",
	"desc": "Toggles underline on/off for the selection or at the insertion point."
}, {
	"cmd": "undo",
	"icon": "undo",
	"desc": "Undoes the last executed command."
}, {
	"cmd": "unlink",
	"icon": "chain-broken",
	"desc": "Removes the anchor tag from a selected anchor link."
}, {
	"cmd": "useCSS ",
	"desc": "Toggles the use of HTML tags or CSS for the generated markup. Requires a boolean true/false as a value argument. NOTE: This argument is logically backwards (i.e. use false to use CSS, true to use HTML). (Not supported by Internet Explorer.) This has been deprecated; use the styleWithCSS command instead."
}, {
	"cmd": "styleWithCSS",
	"desc": "Replaces the useCSS command; argument works as expected, i.e. true modifies/generates style attributes in markup, false generates formatting elements."
}];
angular.module("myApp", [])
	.directive("click", function () {
		return {
			restrict: "A",
			link: function (scope, element, attrs) {
				element.bind("click", function () {
					scope.$evalAsync(attrs.click);
				});
			}
		};
	})
	.controller("Example", function ($scope) {
		$scope.supported = function (cmd) {
			var css = !!document.queryCommandSupported(cmd.cmd) ? "btn-succes" : "btn-error"
			return css
		};
		$scope.icon = function (cmd) {
			return (typeof cmd.icon !== "undefined") ? "fa fa-" + cmd.icon : "";
		};
		$scope.doCommand = function (cmd) {
			if ($scope.supported(cmd) === "btn-error") {
				alert("execCommand(“" + cmd.cmd + "”)\nis not supported in your browser");
				return;
			}
			val = (typeof cmd.val !== "undefined") ? prompt("Value for " + cmd.cmd + "?", cmd.val) : "";
			document.execCommand(cmd.cmd, false, (cmd.val || ""));
		}
		$scope.commands = commands;
		$scope.tags = [
    'Bootstrap', 'AngularJS', 'execCommand'
  ]
	})
*/
