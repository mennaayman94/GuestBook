var canvas = new fabric.Canvas("canvas");

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

$("#fill").change(function () {
  var obj = canvas.getActiveObject();

  if (obj) {
    // old api
    // obj.setFill($(this).val());
    obj.set("fill", this.value);
  }
  canvas.renderAll();
});

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
$("#font").change(function () {
  var obj = canvas.getActiveObject();

  if (obj) {
    //old api
    //obj.setFontFamily($(this).val());
    obj.set("fontFamily", this.value);
  }

  canvas.renderAll();
});
download_img = function (el) {
  // get image URI from canvas object
  var imageURI = canvas.toDataURL("image/jpg");
  el.href = imageURI;
};
