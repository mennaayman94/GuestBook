var canvas = new fabric.Canvas("canvas");
//function to preview the image and add the image to canvas
document.getElementById("file").addEventListener("change", function (e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  console.log("reader   " + reader);
  reader.onload = function (f) {
    var data = f.target.result;
    fabric.Image.fromURL(data, function (img) {
      var oImg = img.set();
      canvas.add(oImg).renderAll();
      canvas.setActiveObject(oImg);
    });
  };
  reader.readAsDataURL(file);
});
//function to choose the color
$("#fill").change(function () {
  var obj = canvas.getActiveObject();

  if (obj) {
    obj.set("fill", this.value);
  }
  canvas.renderAll();
});
//function add text to canvas and add font and color to it
function addText() {
  var oText = new fabric.IText("Tap and Type", {
    left: 100,
    top: 100,
  });

  canvas.add(oText);
  oText.bringToFront();
  canvas.setActiveObject(oText);
  $("#fill, #font").trigger("change");
}
//function to choose the color
$("#font").change(function () {
  var obj = canvas.getActiveObject();

  if (obj) {
    obj.set("fontFamily", this.value);
  }

  canvas.renderAll();
});
//function to download image after editing
download_img = function (el) {
  // get image URI from canvas object
  var imageURI = canvas.toDataURL("image/jpg");
  el.href = imageURI;
};
