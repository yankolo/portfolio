isIE = /*@cc_on!@*/false || !!document.documentMode; // Checking for IE features

// content needs to be rendered for typeWriter to work correctly (offset depends on font)
window.onload = init;

function init () {
  var java = document.querySelector("#java div pre");
  var javaCode = "public void main(String[] args) {\u000Abool java = true;\u000A\u000Abool cSharp;\u000Aif (java == true) {\u000A    cSharp = false;\u000A} else {\u000A    cSharp = true;\u000A}\u000AString[] fruits = {\"Apple\",\u000A \"Orange\", \"Pineapple\"};\u000Afor (int i = 0; \u000A i < fruits.length; i++)";
  var javaCursor = new Image();
  javaCursor.src = "../resources/icons/line.svg";
  javaCursor.className = "code-typing-cursor";
  javaCursor.style.left = "5.5px";

  var cSharp = document.querySelector("#cSharp div pre");
  var cSharpCode = "private Pixel[,] _data;\u000Apublic String Metadata { get; private set; }\u000Apublic int MaxRange { get; private set; }\u000Apublic Pixel this [int y , int x]\u000A{\u000A    get { return _data[y, x]; }\u000A}\u000Apublic int GetLength(int rank)\u000A{\u000Aif (rank != 0 && rank != 1)\u000A    throw new IndexOutOfRangeException\u000A       (\"Error\");\u000Aif (rank == 0)\u000A    return _data.GetLength(0)\u000Aelse\u000A    return _data.GetLength(1);\u000A}\u000Apublic Image(string metadata, \u000A int maxRange, Pixel[,] data)\u000A{\u000Aif (maxRange < 0)\u000A    throw new ArgumentException(\"\");\u000AMetadata = metadata;\u000AMaxRange = maxRange;\u000A\u000A_data = new Pixel[data.GetLength(0),\u000A data.GetLength(1)];\u000Afor (int y = 0; y < data.GetLength(0); y++)\u000A  for (int x = 0; x < data.GetLength(1); x++)\u000A    _data[y, x] = data[y, x];\u000A}\u000Apublic void ToGrey()\u000A{\u000Afor (int y = 0; y < _data.GetLength(0); y++)\u000A  for (int x = 0; x < _data.GetLength(1); x++)\u000A    _data[y, x] = new Pixel(_data[y, x].Grey());\u000A}\u000Apublic void Flip(bool horizontal)\u000A{\u000Aif (horizontal)\u000A{\u000Afor (int y = 0; y < _data.GetLength(0)/2; y++)\u000A{\u000A Pixel[] temp = new Pixel[_data.GetLength(1)];\u000A for (int x = 0; x < _data.GetLength(1); x++)\u000A {\u000A  temp[x] = _data[y, x];\u000A  _data[y, x] = _data[_data.GetLength(0)\u000A    - (1 + y), x];\u000A  _data[_data.GetLength(0) - (1 + y), x] = temp[x];\u000A  }\u000A }\u000A}\u000Aelse\u000A{\u000A  for (int x = 0; x < _data.GetLength(1)/2; x++)\u000A{\u000APixel[] temp = new Pixel[_data.GetLength(0)];\u000Afor (int y = 0; y < _data.GetLength(0); y++)\u000A {\u000A temp[y] = _data[y, x];\u000A _data[y, x] = _data[y, _data.GetLength(1) - (1 + x)];\u000A _data[y, _data.GetLength(1) - (1 + x)] = temp[y];\u000A   }\u000A  }\u000A }\u000A}\u000Apublic void Crop(int startX, int startY\u000A , int endX, int endY)\u000A{\u000Aif (startX > endX || startY > endY ||\u000A  startX < 0 || startY < 0 \u000A  || endX > _data.GetLength(1) \u000A  || endY > _data.GetLength(0))\u000A  throw new ArgumentException(\"Invalid crop coordinates\");\u000A    Pixel[,] croppedImage = \u000A      new Pixel[(endY - startY), (endX - startX)];\u000A\u000Afor (int y = startY; y < endY; y++)\u000A for (int x = startX; x < endX; x++)\u000A  {\u000A  croppedImage[y, x] = _data[y,x];\u000A  }\u000A  _data = croppedImage;\u000A}\u000Apublic override bool Equals(object obj)\u000A{\u000Avar img = obj as Image;\u000Aif (img == null)\u000A{\u000A  return false;\u000A}\u000Aelse\u000A{\u000A for(int y = 0; y < _data.GetLength(0); y++)\u000A  {\u000A   for(int x = 0; x < _data.GetLength(1); x++)\u000A   {\u000A   if (!(_data[y, x].Equals(img[y, x])))\u000A    return false;  \u000A   } \u000A }\u000A return true;\u000A }\u000A}";
  var cSharpCursor = new Image();
  cSharpCursor.src = "../resources/icons/line.svg";
  cSharpCursor.className = "code-typing-cursor";
  cSharpCursor.style.left = "5.5px";

  var sql = document.querySelector("#sql div pre");
  var sqlCode = "\u000ACREATE PROCEDURE add_order_for_book\u000A (cust_id_input IN NUMBER,\u000A  isbn_input IN VARCHAR2)\u000AAS\u000Aorder_date DATE;\u000Aship_street VARCHAR2(18);\u000Aship_city VARCHAR2(15);\u000Aship_state VARCHAR2(2);\u000Aship_zip VARCHAR2(5);\u000Aship_cost NUMBER := 4;\u000Aitem_number NUMBER := 1;\u000Aquantity NUMBER := 1;\u000Apaid_each NUMBER(5,2)\u000Aorder_id NUMBER;\u000ABEGIN\u000Aorder_date := SYSDATE;\u000ASELECT address, city, state, zip \u000A  INTO ship_street, ship_city,\u000A   ship_state, ship_zip\u000A  FROM customers \u000A  WHERE customer# = cust_id_input;\u000ASELECT retail INTO paid_each\u000A FROM books WHERE isbn = isbn_input;\u000ASELECT MAX(order#) + 1 \u000A INTO order_id FROM orders;\u000AINSERT INTO orders VALUES\u000A (order_id, cust_id_input, order_date, null,\u000Aship_street, \u000Aship_state, ship_zip, ship_cost);\u000AINSERT INTO orderitems \u000A  VALUES(order_id, item_number,\u000A   isbn_input, quantity, paid_each);\u000AEND;\u000ACREATE FUNCTION \u000A eligible_promotion\u000A (isbn_input IN VARCHAR2) \u000A  RETURN VARCHAR2\u000AAS\u000Apromotion_for_book VARCHAR2(15);\u000ABEGIN\u000ASELECT p.gift INTO promotion_for_book FROM books b\u000A JOIN promotion p ON b.retail\u000A  BETWEEN p.minretail AND p.maxretail\u000A WHERE b.isbn = isbn_input;    \u000Areturn promotion_for_book;\u000AEND;\u000ACREATE FUNCTION is_free_shipping\u000A (order_id_input IN NUMBER)\u000A  RETURN VARCHAR2\u000AAS\u000A  TYPE string_list IS VARRAY(100) OF VARCHAR2(10);\u000A  books_in_order string_list;\u000A  i NUMBER;\u000ABEGIN\u000ASELECT isbn BULK COLLECT INTO books_in_order FROM orderitems\u000AWHERE order# = order_id_input;\u000AFOR i IN 1 .. books_in_order.COUNT LOOP\u000A IF eligible_promotion(books_in_order(i))\u000A  = 'FREE SHIPPING' THEN\u000A   RETURN 'FREE SHIPPING';\u000A END IF;\u000AEND LOOP;\u000ARETURN 'NO FREE SHIPPING';\u000AEND;";
  var sqlCursor = new Image();
  sqlCursor.src = "../resources/icons/line.svg";
  sqlCursor.className = "code-typing-cursor";
  sqlCursor.style.left = "5.5px";

  var javaScript = document.querySelector("#JavaScript div pre");
  var javaScriptCode = "\u000Afunction fixMaxWidth(element, parent, maxWidth) {\u000Aconsole.log(\"working\");\u000AparentWidth = parseInt(\u000A  window.getComputedStyle(parent,\u000A  null).getPropertyValue(\"width\"));\u000Aconsole.log(parentWidth);\u000Aif (parentWidth >= maxWidth) {\u000A element.style.width = maxWidth + \"px\";\u000A} else {\u000A element.style.removeProperty(\"width\");\u000A }\u000A}\u000Afunction typeWriter() {\u000Avar h1 = document.querySelector(\"#main_text h1\");\u000Avar h2 = document.querySelector(\"#main_text h2\");\u000AfillElementWithText(h1, \"h1 text\");\u000AfillElementWithText(h2, \"Text text\");\u000Avar bigCursor = new Image();\u000AbigCursor.src = \"resources/icons/line.svg\";\u000AbigCursor.id = \"big_typing_cursor\";\u000Avar smallCursor = bigCursor.cloneNode(true);\u000AsmallCursor.style.height = \"33px\";\u000AsmallCursor.style.top = \"5px\";\u000AbigCursor.style.left = \u000A  h1.firstChild.offsetLeft + \"px\";\u000Ah1.appendChild(bigCursor);\u000AtoggleFlashLine(bigCursor, true);\u000AsetTimeout(function () {\u000A  bigCursor.style.visibility = \"visible\";\u000A  toggleFlashLine(bigCursor, false);\u000A  writeHeading(100, h1, bigCursor, h2, smallCursor );\u000A}, 900);\u000Afunction writeHeading(speed, \u000A  heading1, line1, heading2, line2) {\u000Avar i = 0;\u000Avar text = heading1.querySelectorAll(\"span\");\u000Avar intervalId = setInterval(writeCharacter, speed);\u000Afunction writeCharacter () {\u000Aline1.style.left = \u000A (text[i].offsetWidth + \u000A text[i].offsetLeft) + \"px\";\u000Aif (heading1.tagName == \"H1\")\u000A line1.style.top = \u000A (text[i].offsetTop + 10) + \"px\";\u000Aelse if (heading1.tagName == \"H2\")\u000A line1.style.top = \u000A (text[i].offsetTop + 5) + \"px\";\u000Atext[i].style.visibility = \"visible\";\u000Ai++;\u000Aif (i >= text.length &&\u000A  heading1.tagName == \"H1\") {\u000AclearInterval(intervalId);\u000AtoggleFlashLine(line1, true);\u000AsetTimeout(function () {\u000AtoggleFlashLine(line1, false);\u000Aheading1.removeChild(line1)\u000Aline2.style.left = \u000A heading2.firstChild.offsetLeft + \"px\";\u000Aheading2.appendChild(line2);\u000AwriteHeading(50, heading2, line2);\u000A}, 1000);\u000A} else if (i >= text.length &&\u000A heading1.tagName == \"H2\") {\u000AclearInterval(intervalId);\u000Aheading1.removeChild(line1);\u000Aline1.style.left = \u000A heading1.lastChild.offsetWidth + \"px\";\u000Aline1.style.top = \"5px\";\u000Aheading1.lastChild.appendChild(line1);\u000AtoggleFlashLine(line1, true);\u000A  }\u000A }\u000A}";
  var javaScriptCursor = new Image();
  javaScriptCursor.src = "../resources/icons/line.svg";
  javaScriptCursor.className = "code-typing-cursor";
  javaScriptCursor.style.left = "5.5px";

  var markup = document.querySelector("#markup div pre xmp");
  var markupCode = "<head>\u000A<title>My Portfolio</title>\u000A<link href=\"style.css\" \u000Arel=\"stylesheet\" type=\"text/css\">\u000A<script src=\"script.js\"></script>\u000A</head><body>\u000A<div id=\"wrapper\">\u000A<header><nav> <ul>\u000A<li><div id=\"home\">Home</div></li>\u000A<li><div id=\"skills\">Skills</div></li>\u000A<li><div id=\"portfolio\">Portfolio</div></li>\u000A<li><div id=\"about_me\">About me</div></li>\u000A</ul></nav>\u000A<div id=\"page_indicator_container\">\u000A<div id=\"page_indicator\"></div>\u000A</div></header>\u000A<div id=\"main\">\u000A<div id=\"content\">\u000A<div id=\"main_text\">\u000A<h1>Main Title</h1>\u000A<h2>Secondary Title</h2>\u000A</div></div>\u000A<footer><div>\u000A<div id=\"first_icon\" \u000A class=\"social_media\"></div>\u000A<div id=\"second_icon\" \u000A class=\"social_media\"></div>\u000A<div id=\"forth_icon\" \u000A class=\"social_media\"></div>\u000A<div id=\"third_icon\" \u000A class=\"social_media\"></div>\u000A</div></footer>\u000A</div></body>";
  var markupCursor = new Image();
  markupCursor.src = "../resources/icons/line.svg";
  markupCursor.className = "code-typing-cursor";
  markupCursor.style.left = "5.5px";

  var css = document.querySelector("#css div pre");
  var cssCode = "\u000Aheader {\u000A height: 46px;\u000A position: relative;\u000A}\u000Anav {\u000A height: 100%;\u000A width: 100%;\u000A position: absolute;\u000A bottom: 5%;\u000A font-size: 1.1em;\u000A text-transform: uppercase\u000A}\u000Anav ul {\u000A height: 100%;\u000A}\u000Anav li {\u000A display: block;\u000A position: relative;\u000A float: left;\u000A text-align: center;\u000A height: 100%;\u000A}\u000Anav li {\u000A width: 25%;\u000A}\u000A#home {\u000A width: 70px;\u000A}\u000A#skills {\u000A width: 70px;\u000A}\u000A#portfolio {\u000A width: 100px;\u000A}\u000A#about_me {\u000A width: 100px;\u000A}\u000Anav div {\u000A position: absolute;\u000A padding-top: 5px;\u000A top: 20%;\u000A bottom: 0;\u000A left: 0;\u000A right: 0;\u000A height: 80%;\u000A margin: auto;\u000A}\u000Anav div:hover {\u000A color: #CCCBCB;\u000A}\u000A#page_indicator_container {\u000A clear: left;\u000A position: absolute;\u000A bottom: 0;\u000A width: 100%;\u000A height: 5%;\u000A background-color: transparent;\u000A}\u000A#page_indicator {\u000A position: absolute;\u000A height: 100%;\u000A width: 12.5%;\u000A left: 6.25%;\u000A background-color: #192231;\u000A}\u000Afooter {\u000A height: 78px;\u000A text-align: center;\u000A overflow: hidden;\u000A}\u000A@keyframes social_media_animation {\u000A  from {width: 4000px;}\u000A  to {width: 272px;}\u000A}\u000Afooter > div {\u000A display: inline-block;\u000A margin: 0 -1000%;\u000A width: 272px;\u000A}\u000A.social_media {\u000A display: block;\u000A width: 68px;\u000A height: 62px;\u000A padding: 0 3px;\u000A	box-shadow: 0px 6px 8px 0 rgba(0, 0, 0, 0.3);\u000A border-radius: 50%;\u000A margin: auto;\u000A}\u000A.social_media div:hover {\u000A box-shadow: 0px 6px 8px 2px rgba(0, 0, 0, 0.4);\u000A}\u000A#icon_animator {\u000A display: inline-block;\u000A width: 1300px;\u000A}\u000A#first_icon {\u000A float: left;\u000A background: url(\"resources/icons/facebook_white.svg\");\u000A background-position: center;\u000A background-repeat: no-repeat;\u000A}";
  var cssCursor = new Image();
  cssCursor.src = "../resources/icons/line.svg";
  cssCursor.className = "code-typing-cursor";
  cssCursor.style.left = "5.5px";

  programmer(java, javaCode, javaCursor);
  programmer(cSharp, cSharpCode, cSharpCursor);
  programmer(sql, sqlCode, sqlCursor);
  programmer(javaScript, javaScriptCode, javaScriptCursor);
  programmer(markup, markupCode, markupCursor, true);
  programmer(css, cssCode, cssCursor);

  // To print HTML, the code is inserted into a xmp tag, that is why the funciton
  // verifies sometimes if the language isHTML
  function programmer(language, sourceCode, cursor, isHTML) {
    if (isHTML == true) {
      language.parentElement.parentElement.parentElement.appendChild(cursor);
      language.parentElement.style.marginLeft = "0px";
    } else {
      language.parentElement.parentElement.appendChild(cursor);
      language.style.marginLeft = "0px";
    }

    var codeLines = sourceCode.split("\u000A");

    for (var i = 0; i < 9; i++) {
      language.innerHTML += codeLines[i] + "\u000A";
    }

    var currentLine = i;
    var isCursorSet = false;
    var isCharacterWidthSet = false;
    var characterWidth = 0;

    typeLine();

    function typeLine() {
      var currentText = language.innerHTML;
      var currentTextLines = currentText.split("\u000A");
      language.innerHTML = "";
      for (var i = 1; i < currentTextLines.length; i++) {
        if (i !== (currentTextLines.length - 1)) {
          language.innerHTML += currentTextLines[i] + "\u000A";
        } else {
          language.innerHTML += currentTextLines[i];
        }
      }

      var overflow = false;
      var currentCharacter = 0;
      var intervalId = setInterval(function () {
        var line = codeLines[currentLine];

        if (currentCharacter < line.length) {
          if (isCursorSet == false || isCharacterWidthSet == false) {
            var span = document.createElement("span");
            var textNode = document.createTextNode(line[currentCharacter]);
            span.appendChild(textNode);
            language.appendChild(span);
            cursor.style.top = language.lastChild.offsetTop + "px";
            cursor.style.visibility = "visible";
            characterWidth = language.lastChild.getBoundingClientRect().width;
            language.removeChild(span);

            isCursorSet = true;
            isCharacterWidthSet = true;
          }

          language.innerHTML += line[currentCharacter];
          var languageWidth = isHTML ? language.parentElement.offsetWidth : language.offsetWidth;

          if ((parseFloat(cursor.style.left) + characterWidth) > languageWidth)
            overflow = true;

          if (overflow == false) {
            cursor.style.left = (parseFloat(cursor.style.left) + characterWidth) + "px";
          } else {
            if (isHTML) {
              language.parentElement.style.marginLeft = (parseFloat(language.parentElement.style.marginLeft) - characterWidth) + "px";
            } else {
              language.style.marginLeft = (parseFloat(language.style.marginLeft) - characterWidth) + "px";
            }
          }

          currentCharacter++;
          } else {
          language.innerHTML += "\u000A";

          if (isHTML) {
            language.parentElement.style.marginLeft = "0px";
          } else {
            language.style.marginLeft = "0px";
          }

          cursor.style.left = "5.5px";
          clearInterval(intervalId);
          currentLine++;
          if (currentLine < codeLines.length) {
            typeLine();
          } else {
            currentLine = 0;
            typeLine();
          }
        }
      }, 70);

    }
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
