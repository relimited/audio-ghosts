//a wave visualization of a sound file
//using an fft to get the frequency data out of a time domain setting
//wrapping all of p5 in an object, so we can get other variables into p5's scope

var FrequenceVis = function(analyser, wavetableData, dataLen){
  var self = this;

  //variables we want to use for p5
  this.waveData = wavetableData;
  this.bufferLength = dataLen;

  this.analyser = analyser;

  this.sketch = function(p){
    //instance variables for p5 go here
    var data = self.waveData;         //moving from object parameters to local p5 variables
    var dataLength = self.bufferLength;
    var analyser = self.analyser;

    p.setup = function(){
      //setup processing function
      p.createCanvas(400, 300);
      p.background(0);
      p.stroke('white');
    };

    p.draw = function(){
      //draw processing function
      analyser.getByteFrequencyData(data);
      var sliceWidth = p.width * 1.0 / dataLength;
      p.background(0);
      
      var x = 0, y = 0;
      for(var i = 0; i < bufferLength; i++){
        var v = data[i] / 128.0;

        y = p.height - v * p.height / 2;
        p.line(x, p.height, x, y);

        x = x + sliceWidth;
      }
    };
  };
};

FrequenceVis.prototype = {
  draw: function(){
    var sketch = new p5(this.sketch);
  }
};
