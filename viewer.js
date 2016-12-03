document.addEventListener("click", function() {
  if (document.getElementById("fileinput").files[0] !== undefined) {
    run();
  }
})

function run() {
  var file = fileInput.files[0];
  if (file === undefined) {
    console.log("No file found");
    return;
  }
  var reader = new FileReader();

  reader.onload = function(e) {
    objlist = JSON.parse(reader.result);

  }

  reader.readAsText(file);
}
