let k = function() {

  var parent = document.getElementById("ps")
  if(!parent) return;


  var
    rangeS = parent.querySelectorAll("input[type=range]"),
    numberS = parent.querySelectorAll("input[type=number]");

  let getMAx = function (liste){
      return function() {

      var slide1 = parseFloat(liste[0].value),
          slide2 = parseFloat(liste[1].value);

      parent.querySelectorAll("input[type=number]")[0].value = Math.min(slide1, slide2);
      parent.querySelectorAll("input[type=number]")[1].value = Math.max(slide1, slide2);
    }
  }

  rangeS.forEach(function(el) {
    el.oninput = getMAx(rangeS)
  });

  numberS.forEach(function(el) {
    el.oninput = getMAx(numberS);
  });

}
k();
