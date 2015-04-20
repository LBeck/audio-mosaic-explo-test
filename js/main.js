/*
 * main.js
 *
 */

// --- start the ball rolling
window.onload = function () {
  render_mosaics();
}

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
      }
      else {
        mosaicPlayButton.classList.remove("playing");
        mosaicPlayButton.classList.add("stopped");
        mosaicAudio.pause();
      };
    });

    // when audio ends
    mosaicAudio.addEventListener("ended", function() {
      mosaicPlayButton.classList.remove("playing");
      mosaicPlayButton.classList.add("stopped");
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
  }

};
