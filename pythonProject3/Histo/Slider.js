let k = function() {

  var parent = document.getElementById("ps")


  if(!parent) return;


  var
    rangeS = parent.querySelectorAll("input[type=range]"),
    numberS = parent.querySelectorAll("input[type=number]");



  rangeS.forEach(function(el) {
    el.oninput = function() {

      var slide1 = parseFloat(rangeS[0].value),
         slide2 = parseFloat(rangeS[1].value);
      parent.querySelectorAll("input[type=number]")[0].value = Math.min(slide1, slide2);
      parent.querySelectorAll("input[type=number]")[1].value = Math.max(slide1, slide2);
    }
  });

  numberS.forEach(function(el) {

        el.oninput = function() {
            var number1 = parseFloat(numberS[0].value),
                number2 = parseFloat(numberS[1].value);

            parent.querySelectorAll("input[type=range]")[0].value = Math.min(number1, number2);
            parent.querySelectorAll("input[type=range]")[1].value = Math.max(number1, number2);
        }
  });

}
k();
