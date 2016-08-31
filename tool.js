//console.log("alert");

//TODO add button tag, accordion, column layout gen

var del = "\n";
var openingTag = "";
var closingTag = "";
var bTag = "";
var eTag = "";

document.getElementById("clear-btn").onclick = (function convert() {
  document.getElementById("data-complete").innerHTML = "";
  //$('#iframe').contents().find('body').replaceWith("<body></body>");
  document.getElementById('iframe').contentWindow.location.reload();
});


document.getElementById("data-btn").onclick = (function convert() {
  var tag = document.getElementById("custom-tag").value;
  var custTag = true;
  if(tag == "") {
    tag = document.getElementById("tag").value;
    custTag = false;
  }

  //****** TODO ADD ONE VAR TO HOLD ALL ATTR ******

  //get attributes and build string

  //get attributes specific to 'a' tag if needed
  var hrefAttr = "";
  var targetAttr = "";
  if (tag == "a") {
    hrefAttr = " href='" + document.getElementById("href-attr").value + "' ";
    targetAttr = " target='" + document.getElementById("target-attr").value + "' ";
  }

  //get attributes specific to 'img' tag if needed
  var srcAttr = "";
  if (tag == "img") {
    srcAttr = " src='" + document.getElementById("src-attr").value + "' ";
    console.log(srcAttr);
  }

  //get attributes specific to 'blockquote' tag if needed
  var citeAttr = "";
  if (tag == "blockquote") {
    citeAttr = " cite='" + document.getElementById("cite-attr").value + "' ";
  }

  //get id attr if set
  var idAttr = document.getElementById("id-attr").value;
  if (idAttr != "") {
    idAttr = " id='" + idAttr + "' ";
  }

  //get class attr if set
  var classAttr = document.getElementById("class-attr").value;
  if (classAttr != "") {
    classAttr = " class='" + classAttr + "' ";
  }

  //get custom attributes

  var custA1 = document.getElementById("custom1-attr").value;
  var custA1Val = document.getElementById("custom1-val").value;

  var custA2 = document.getElementById("custom2-attr").value;
  var custA2Val = document.getElementById("custom2-val").value;

  var custA3 = document.getElementById("custom3-attr").value;
  var custA3Val = document.getElementById("custom3-val").value;

  var custAttrString = "";
  if (custA1 != "") { custAttrString += " " + custA1 + "='" + custA1Val + "' "; }
  if (custA2 != "") { custAttrString += " " + custA2 + "='" + custA2Val + "' "; }
  if (custA3 != "") { custAttrString += " " + custA3 + "='" + custA3Val + "' "; }

  var attrString = hrefAttr + targetAttr + idAttr + srcAttr + citeAttr + classAttr + custAttrString;
  //var attrString = hrefAttr + targetAttr + idAttr;



  var listStyle = "";
  if (tag == "ul" || tag == "ol") {
     listStyle = " style='" + document.getElementById("list-style-attr").value + "'";
     if (listStyle == " style=''") {
       listStyle = "";
     }
  }

  if (custTag) {
    //openingTag = "<" + tag + " " + attrString + ">";
    //closingTag = "</" + tag + ">";
    bTag = "<" + tag + " " + attrString + ">";
    eTag = "</" + tag + ">";
  }

  else {

  switch(tag) {
    case "p":
      bTag = "<p" + attrString + ">";
      eTag = "</p>";
      break;
    case "ul":
      var listType = "ul";
      openingTag = "<" + listType + " " + attrString + listStyle + ">";
      closingTag = "</ul>";
      bTag = "<li>";
      eTag = "</li>";
      break;
    case "ol":
      var listType = "ol";
      openingTag = "<" + listType + " " + attrString + listStyle + ">";
      closingTag = "</ul>";
      bTag = "<li>";
      eTag = "</li>";
      break;
    //*** TODO NEED TO HANDLE LOGIC BEHIND DESCRIPTION LIST
    case "dl":
      var listType = "dl";
      openingTag = "<" + listType + " " + attrString + ">";
      closingTag = "</ul>";
      bTag = "<dt>";
      eTag = "</li>";
      break;
    case "a":
      bTag = "<a" + attrString + ">";
      eTag = "</a>";
      break;
    case "strong":
      bTag = "<strong" + attrString + ">";
      eTag = "</strong>";
      break;
    case "span":
      bTag = "<span" + attrString + ">";
      eTag = "</span>";
      break;
    case "img":
      openingTag = "<img" + attrString;
      closingTag = " />";
      break;
    case "blockquote":
      bTag = "<blockquote" + attrString + ">";
      eTag = "</blockquote>";
      break;

  }
}

  var x = document.getElementById("data").value;

  //if tag type is list remove bullets in text
  if (tag == "ul") {
    console.log("before: " + x);
    //.replace(/^\s*(?:[\dA-Z]+\.|[a-z]\)|•)\s+/gm, '')
    //x = x.split('•').join(" - ");
    x = x.replace(/•\s/gi, "");
    console.log("after: " + x);
  }

  //**** TODO FIX EMPTY END TAGS
  var y = x.replace(del, eTag + bTag);
  var yy = x.split('\n').join(eTag + bTag);

  //console.log("btn pressed");
  var z = bTag + yy + eTag;
  z = openingTag + z + closingTag;

  var examples = document.getElementById("examples").value

  if (tag == "img") {
    var imgtag =  openingTag + " " + closingTag;
    document.getElementById("data-complete").innerHTML = imgtag;
    console.log(imgtag);
  }
  else if (examples != "blank") {
    if (examples == "button") {
      z = '<a href="about.html" class="button">Learn More</a>\n<a href="#features" class="button">View All Features</a>\n<button type="button" class="success button">Save</button>\n<button type="button" class="alert button">Delete</button>';
    }
    else if (examples == "threeColumn") {
      z = '<div class="row">\n<div class="columns small-4">\nThis is column ONE</div>\n<div class="columns small-4">\nThis is column TWO</div>\n<div class="columns small-4">\nThis is column THREE</div>\n</div>';
    }
    else if (examples == "accordion") {
      z = `<ul class="accordion" data-accordion data-allow-all-closed="true">
        <li class="accordion-item " data-accordion-item>
          <a href="#" class="accordion-title">Heading One</a>
          <div class="accordion-content" data-tab-content>
            This is the first accordion content
            </div>
          </li>
          <li class="accordion-item " data-accordion-item>
            <a href="#" class="accordion-title">Heading Two</a>
            <div class="accordion-content" data-tab-content>
              This is the second accordion content
              </div>
            </li>
        </ul>`;
    }
    else if (examples == "twoColumn") {
      z = `<div class="row">
        <div class="small-6 columns">Column One</div>
        <div class="small-6 columns">Column Two</div>
      </div>`;
    }
    else if (examples == "threeNineColumn") {
      z = `<div class="row">
        <div class="small-3 columns">Column One</div>
        <div class="small-9 columns">Column Two</div>
      </div>`;
    }
    document.getElementById("data-complete").innerHTML = z;
  }
  else{
    document.getElementById("data-complete").innerHTML = z;
  }

  $('#iframe').contents().find('body').append(z);

});