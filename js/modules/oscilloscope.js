//uses p5 running in instance mode to make a oscilloscope visualization
//Essentally we are coping the time-domain data from a wave using a analyser node
//wrapping all of p5 in an object, so we can get other variables into p5's scope

var OscilloscopeVis = function(analyser, wavetableData, dataLen){
  var self = this; //scope escape trick

  //variables we want to use for p5
  this.waveData = wavetableData;
  this.bufferLength = dataLen;
  this.analyser = analyser;

  //interal reference to an instance of p5 for vizsualization.
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
      analyser.getByteTimeDomainData(data);
      var sliceWidth = p.width * 1.0 / dataLength;
      p.background(0);

      var x = 0, y = 0;
      var pastX = 0, pastY = 0;

      for(var i = 0; i < bufferLength; i++){
        var v = data[i] / 128.0;

        pastY = y;
        y = v * p.height / 2;

        if(i === 0){
          pastX = 0;
          pastY = y;
        }else{
          p.line(pastX, pastY, x, y);
        }

        pastX = x;
        x = x + sliceWidth;
      }
    };
  };
};

OscilloscopeVis.prototype = {
  draw: function(){
    var sketch = new p5(this.sketch);
  }
};
