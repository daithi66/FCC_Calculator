var calc = {
    currentNumber:"",
    runningTotal:"",
    currentOperKey:"+",
    topDisplayLine:"",
    bottomDisplayLine:"0"
  }
  
  $(".numKey").mousedown(function() {
    if (calc.currentNumber.length < 13) {
      var numKey = document.getElementById(this.id).innerHTML;
      calc.currentNumber += numKey;
      calc.bottomDisplayLine = calc.currentNumber;
      $("#displayBottom").html(calc.bottomDisplayLine);
    } 
  });
  
  $(".operKey").mousedown(function() {
    var operKey = document.getElementById(this.id).innerHTML;
    if (calc.currentNumber == "") {  
      // they pressed an operKey followed by another operKey, so use the last one pressed
      calc.topDisplayLine = calc.topDisplayLine.substring(1,calc.topDisplayLine.length-1) + operKey;
      $("#displayTop").html(calc.topDisplayLine);
      setOperKey(operKey);
      return;
    }
    calc.topDisplayLine += " " + calc.bottomDisplayLine + " " + operKey;
    $("#displayTop").html(calc.topDisplayLine);
    calc.runningTotal = eval(calc.runningTotal + calc.currentOperKey + calc.currentNumber);
    setOperKey(operKey);
    calc.currentNumber = "";
    calc.bottomDisplayLine = displayNumber(calc.runningTotal);
    $("#displayBottom").html(calc.bottomDisplayLine);
  });
    
  $("#keyEqual").mousedown(function() {
    calc.runningTotal = eval(calc.runningTotal + calc.currentOperKey + calc.currentNumber);
    calc.currentNumber = "";
    calc.currentOperKey = "+";
    calc.topDisplayLine = "";
    calc.bottomDisplayLine = displayNumber(calc.runningTotal);
    $("#displayTop").html(calc.topDisplayLine);
    $("#displayBottom").html(calc.bottomDisplayLine);
  });
  
  $("#keyClearEntry").mousedown(function() {
    calc.currentNumber = "";
    calc.bottomDisplayLine = "0";
    $("#displayBottom").html(calc.bottomDisplayLine);
  });
  
  $("#keyClearAll").mousedown(function() {
    calc.currentNumber = "";
    calc.runningTotal = "";
    calc.currentOperKey = "+";
    calc.topDisplayLine = "";
    calc.bottomDisplayLine = "0";
    $("#displayTop").html(calc.topDisplayLine);
    $("#displayBottom").html(calc.bottomDisplayLine);
  });
  
  function setOperKey(operKey) {
    if (operKey == "x") {
      calc.currentOperKey = "*";  
    } else if (operKey == "+") {
      calc.currentOperKey = "+";  
    } else if (operKey == "-") {
      calc.currentOperKey = "-";  
    } else {
      calc.currentOperKey = "/"; 
    }
  }
  
  function displayNumber(numberToFormat) {
    numberToFormat = numberToFormat.toString();
    if (numberToFormat.length > 13) {
      if (numberToFormat.substring(1,13).includes(".")) {
        numberToFormat = numberToFormat.substring(0,13);
        if (numberToFormat[13] == ".") {
          numberToFormat = numberToFormat.substring(0,12);
        } else if (numberToFormat[0] == ".") {
          numberToFormat = "0" + numberToFormat;
        }
      } else {
        var expLength = numberToFormat.length-1;
        numberToFormat = numberToFormat.substring(0,3)/100;
        numberToFormat += "E+" + expLength.toString();
      }
    }
    return numberToFormat;
  }