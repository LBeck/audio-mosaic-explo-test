/*
 * main.js
 *
 */

var mosaicMap = {},
  rotateInterval = 3000;

// --- start the ball rolling
window.onload = function () {
  make_mosaic_map();
  render_mosaics();
}

// --- create map for mosaic name to mosaicData index
var make_mosaic_map = function() {
  var mosaicsLength = mosaicData.length,
    mosaicName,
    n,
    m;

  for(n=0; n < mosaicsLength; n++) {
    m = {};
    mosaicName = mosaicData[n]["mosaic"];

    m["index"] = n;
    m["numImages"] = mosaicData[n]["images"].length;
    m["curImage"] = 0;

    mosaicMap[mosaicName] = m;
  }

};


// --- create individual pic/snd mosaic item
var create_mosaic_div = function(mosaic, mosaicName) {
  var mosaicDiv = document.createElement("div"),
    mosaicImg = document.createElement("img"),
    mosaicAudio = document.createElement("audio"),
    mosaicPlayButton = document.createElement("div");

    // setup main div and append children
    mosaicDiv.setAttribute("class", "mosaic-item");
    mosaicDiv.setAttribute("id", mosaicName);

    mosaicDiv.appendChild(mosaicImg);
    mosaicDiv.appendChild(mosaicAudio);
    mosaicDiv.appendChild(mosaicPlayButton);

    // setup img, audio, div for button
    // -- set id's for easy access later
    mosaicImg.setAttribute("src", mosaic.images[0]);
    mosaicImg.setAttribute("id", "image-" + mosaicName);

    mosaicAudio.setAttribute("src", mosaic.sound);
    mosaicAudio.setAttribute("id", "audio-" + mosaicName);

    mosaicPlayButton.setAttribute("class", "stopped");
    mosaicPlayButton.setAttribute("id", "button-" + mosaicName);

    // start/stop audio with click
    mosaicDiv.addEventListener("click", function() {
      if (mosaicPlayButton.classList.contains("stopped")) {
        mosaicPlayButton.classList.remove("stopped");
        mosaicPlayButton.classList.add("playing");
        mosaicAudio.play();

        // start rotating images
        mosaicMap[mosaicName]["interval"] = setInterval(function(){
          rotate_image(mosaicImg);
          }, rotateInterval);

      }
      else {
        mosaicPlayButton.classList.remove("playing");
        mosaicPlayButton.classList.add("stopped");
        mosaicAudio.pause();

        // stop rotating images
        clearInterval(mosaicMap[mosaicName]["interval"]);
      };
    });

    // when audio ends
    mosaicAudio.addEventListener("ended", function() {
      mosaicPlayButton.classList.remove("playing");
      mosaicPlayButton.classList.add("stopped");

      // stop rotating images
      clearInterval(mosaicMap[mosaicName]["interval"]);
    });

    return mosaicDiv;
};


// --- create complete mosaic, using mosaicData from data.js
var render_mosaics = function() {
  var mosaicMain = document.querySelector(".mosaic"),
    mosaicsLength = mosaicData.length,
    n;
 
  for(n=0; n < mosaicsLength; n++) {
    mosaicMain.appendChild(create_mosaic_div(mosaicData[n], mosaicData[n]["mosaic"]));
  };

};


// -- rotate image
var rotate_image = function(imageElement) {
  var cMosaic = imageElement.getAttribute("id").split("-")[1],
    cMosaicIndex = mosaicMap[cMosaic]["index"],
    cImage = mosaicMap[cMosaic]["curImage"],
    nImage = cImage + 1,
    numImages = mosaicMap[cMosaic]["numImages"];

  if (nImage >= numImages) {
    // too large, reset
    nImage = 0;
  };

// debug
//
//   console.log("cMosaic: " + cMosaic);
//   console.log("cMosaicIndex: " + cMosaicIndex);
//   console.log("cImage: " + cImage);
//   console.log("nImage: " + nImage);
//   console.log("numImages: " + numImages);

  // update image
  imageElement.src = mosaicData[cMosaicIndex]["images"][nImage];
  // change curImage to reflect change
  mosaicMap[cMosaic]["curImage"] = nImage;

};
