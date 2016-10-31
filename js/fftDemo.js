//script to do a rough demo of loading in an audio file and throwing an analyizer node on the audio graph
//
//requires all the modules in modules to be loaded in


//create an audio context
var audioContext = new AudioContext();

//get a file loader
var soundFileLoader = new SoundFileLoader(audioContext);

//make an analyizer node, which is web audio API language for a FFT
var analyser = audioContext.createAnalyser();
//set up parameters!
analyser.fftSize = 2048;                        //kinda a lot of bins
var bufferLength = analyser.frequencyBinCount;  //number of bins for the fft
var dataArray = new Uint8Array(bufferLength);   //data array for the fft

//ok that's all we need to create a visuzalizer with p5
var oscVis = new OscilloscopeVis(analyser, dataArray, bufferLength);
var freqVis = new FrequenceVis(analyser, dataArray, bufferLength);

oscVis.draw(); //start the p5 instance
freqVis.draw();

soundFileLoader.load('./sounds/My_Shot.mp3')
  .then(function(bufferSource){
    bufferSource.connect(analyser);              //connect our buffered source to the analyizer
    analyser.connect(audioContext.destination);  //connect the analyizer to the destination
    bufferSource.start();                         //kick the whole thing off!
  })
  .catch(function(e){ console.error(e); });
