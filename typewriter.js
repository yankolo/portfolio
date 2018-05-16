isIE = /*@cc_on!@*/false || !!document.documentMode; // Checking for IE features

//document.addEventListener("DOMContentLoaded", init, false);

// content needs to be rendered for typeWriter to work correctly (offset depends on font)
// and for getComputedStyle() to work correctly on IE, therefore setting onload property instead of event listener
window.onload = typeWriter;

/*
// This function creates a type writer effect for the main text in
// the main page
//
// Each character is wrapped in a span with a hidden visibility
// This is done instead of appending the text nodes to the heading so that the
// text starts from a fixed point on the screen (which is easier for the eyes)
//
// The cursor is line in an SVG. It is moved using an absolute position
*/
function typeWriter() {
  var h1 = document.querySelector("#typewriter h1");
  var h2 = document.querySelector("#typewriter h2");

  // Setting up the headings with hidden spans that contain the text characters
  fillElementWithText(h1, "hi, my name is yanik");
  fillElementWithText(h2, "I am a software developer specializing in web development");

  // Setting up the cursors for both headings
  var bigCursor = new Image();
  bigCursor.src = "resources/icons/line.svg";
  bigCursor.id = "big_typing_cursor";
  var smallCursor = bigCursor.cloneNode(true);
  smallCursor.style.height = "33px";
  smallCursor.style.top = "5px";

  // Setting up the initial position of the cursor
  bigCursor.style.left = h1.firstChild.offsetLeft + "px";
  h1.appendChild(bigCursor);

  // Making the line flash and writing the text
  toggleFlashLine(bigCursor, true);
  setTimeout(function () {
      bigCursor.style.visibility = "visible";
      toggleFlashLine(bigCursor, false);
      writeHeading(55, h1, bigCursor, h2, smallCursor );
  }, 250);

  cacheImages();

  function writeHeading(speed, heading1, line1, heading2, line2) {
    var i = 0;
    var text = heading1.querySelectorAll("span");
    var intervalId = setInterval(writeCharacter, speed);

    function writeCharacter () {
      // Moving the line cursor (top space depends on current header)
      line1.style.left = (text[i].offsetWidth + text[i].offsetLeft) + "px";
      if (heading1.tagName == "H1")
        line1.style.top = (text[i].offsetTop + 10) + "px";
      else if (heading1.tagName == "H2")
        line1.style.top = (text[i].offsetTop + 5) + "px";

      // Maxing the character visible
      text[i].style.visibility = "visible";
      i++;

      // After writing the h1, flashing the line a little and starting to write the h2
      if (i >= text.length && heading1.tagName == "H1") {
        clearInterval(intervalId);
        toggleFlashLine(line1, true);

        setTimeout(function () {
          toggleFlashLine(line1, false);
          heading1.removeChild(line1);

          line2.style.left = heading2.firstChild.offsetLeft + "px";
          heading2.appendChild(line2);

          writeHeading(30, heading2, line2);
        }, 350);

      // After writing the h2, the cursor line will be appended to the last character
      // (to stay in place when window resizes) and will flash continuously
      } else if (i >= text.length && heading1.tagName == "H2") {
        clearInterval(intervalId);
        heading1.removeChild(line1);
        line1.style.left = heading1.lastChild.offsetWidth + "px";
        line1.style.top = "5px";
        heading1.lastChild.appendChild(line1);
        toggleFlashLine(line1, true);
      }
    }
  } // End of writeHeading

  function toggleFlashLine(line, toggle) {
    if (toggle === false)
      clearInterval(line.flashInterval);
    else if (toggle === true) {
      var lineStatus = 1;
      line.flashInterval = setInterval(flash, 400);

        function flash() {
        if (lineStatus === 1) {
          line.style.visibility = "hidden";
          lineStatus = 0;
        } else {
          line.style.visibility = "visible";
          lineStatus = 1;
        }
      }
    }
  } // End of toggleFlashLine()


  function fillElementWithText(element, text) {
    for (var i = 0; i < text.length; i++){
      if (text[i] === " ")
        var character = document.createTextNode(" ");
      else
        var character = document.createTextNode(text[i]);
      var tempSpan = document.createElement("span");
      tempSpan.appendChild(character);
      tempSpan.class = "main-text-char";
      tempSpan.style.position = "relative";
      tempSpan.style.visibility = "hidden";
      element.appendChild(tempSpan);
    }
  } // End of fillElementWithText()

} // End of typeWriter()

function cacheImages () {
  var images = ["resources/images/about_me_5.jpg", "resources/images/battleship.jpg", "resources/images/battleship_compressed.jpg", "resources/images/daily_greens.jpg", "resources/images/daily_greens_compressed.jpg", "resources/images/election_system.jpg", "resources/images/election_system_compressed.jpg", "resources/images/image_manipulation.jpg", "resources/images/image_manipulation_compressed.jpg", "resources/images/sql_lab.jpg", "resources/images/sql_lab_compressed.jpg"];
  var tempImage = new Image();

  for (var i = 0; i < images.length; i++) {
    tempImage.src = images[i];
  }
}

// Creating a resource-friendly resize event (because resize can be run a lot of time
// in a short period of time) Using requestAnimationFrame() which calls
// a method just before the next draw.
// The following function is run right away.
(function () {
  var isRunning = false; // Tracking if draw is running
  function createOptimizedResize () {
    if (isRunning === false) {
      isRunning = true;
      requestAnimationFrame(function() {
        if (isIE === true) {
          var event = document.createEvent("Event");
          event.initEvent("optimizedResize", false, true);
          window.dispatchEvent(event);
        } else {
          window.dispatchEvent(new CustomEvent("optimizedResize"))
        }
        isRunning = false;
      });
    }
  }
  window.addEventListener("resize", createOptimizedResize, false);
}) ();
