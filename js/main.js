/*
 * main.js
 *
 */

var mosaics = {
  selected: null,
  playing: null,
  data: null,
  get_sound: function() {
    return null;
  },
  get_images: function() {
    return null;
  },
  log_data: function() {
    console.log(this.data);
  }
};

//-- Mosaic item template source
var mosaicItemTemplate =
  document
    .getElementById('mosaic-item')
    .innerHTML
    .trim();

// Renders the mosaic item from the HTML template
var render_mosaic_item = function(mosaic, mosaicNum) {
  var html = mosaicItemTemplate;
  html = html.replace("{{mosaic-id}}", mosaicNum);
  html = html.replace("{{image-url}}", mosaic.images[0]);
  html = html.replace("{{audio-url}}", mosaic.sound)
  return html
};

// Render all mosaics for page
var render_mosaics = function() {
  var mosaicHTML = "",
    mosaicsLength = mosaicData.length,
    n;
 
  for(n=0; n < mosaicsLength; n++) {
    mosaicHTML += render_mosaic_item(mosaicData[n], mosaicData[n]["mosaic"]) + "\n";
  }

  document.querySelector('.mosaic').innerHTML = mosaicHTML;
};


// ---

var clipPlayer = {}

clipPlayer.activeMosaicEl = null

clipPlayer.play = function(mosaicEl) {
  this.stop()
  this.activeMosaicEl = mosaicEl
  this.activeMosaicEl.classList.add('active')
  this.activeAudioEl().play()
}

clipPlayer.stop = function() {
  if (!this.activeMosaicEl) return
  this.activeMosaicEl.classList.remove('active')
  this.activeAudioEl().pause()
  this.activeAudioEl().currentTime = 0
  this.activeMosaicEl = null
}

clipPlayer.activeAudioEl = function() {
  return this.activeMosaicEl.querySelector('audio')
}

//-- Events
window.onload = function () {
  render_mosaics();
}

// Play sounds on click of an image
document.querySelector('.mosaic').addEventListener('click', function(event){
  clipPlayer.play(event.target.parentElement)
})

// Cancel when clicking outside the mosaic (i.e. on html element)
document.addEventListener('click', function(event) {
  if (event.target !== document.querySelector('html')) return
  clipPlayer.stop()
})
