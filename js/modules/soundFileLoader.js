//Load a sound file with the Fetch API, and set it to be a source in
//the web audio graph
//This class works as a loader, with a single load method
//Abstract this for a generic loader

/**
 * Constructor for a SoundFileLoader. Invoked with new, creates a new SoundFileLoader
 * @param  {Object}  audioContext the audio context object to use with this sound file loader
 * @return {Object}               a SoundFileLoader object
 */
var SoundFileLoader = function(audioContext){
  this.audioContext = audioContext;
};

/**
 * Functions for a SoundFileLoader
 * @type {SoundFileLoader}
 */
SoundFileLoader.prototype = {
  /**
   * Load a new sound file, either throw an error if unable to find a resource
   * or fire a callback
   * @param  {String} filepath location of the sound file to load
   * @return {Promise}          A promise to decode the audio file with this loader's
   *                              audio context
   */
  load: function(filepath){
    var self = this; //we need a handle back to the object because we're about to change closures.

    var promise = new Promise(function(success, failure){
      fetch(filepath)                                                 //get the file at the file path, using the fetch API
        .then(function(response){ return response.arrayBuffer(); })   //load the response  from a successful get request into an array buffer
        .then(function(arrayBuffer){ return self.audioContext.decodeAudioData(arrayBuffer); }) //decode the sound info from the array buffer into an audio buffer
        .then(function(audioBuffer){
          var sourceNode = self.audioContext.createBufferSource();  //create a buffer source node in the
          sourceNode.buffer = audioBuffer;                          //set the buffer source node's buffer to the one we just made
          success(sourceNode);                                      //ok, we've set the bare minimum.  Return and let the rest of the code
                                                                    //figure it out.
        })
        .catch(function(e){ failure(e); });                                    //otherwise, catch a failure and pass the exception off to someone else
    });

    return promise;
  }
};
