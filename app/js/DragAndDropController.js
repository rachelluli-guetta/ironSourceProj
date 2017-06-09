/**
 * Created by rachelg on 07/06/2017.
 */

var dropZone = document.getElementById("dropZone");
var thumbnailsContainer = document.getElementById("thumbnailsContainer");
var IMG_SIZE = 100;

//Change the UI when an image is dragged
dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();

    dropZone.classList.add("element-dragged");

    e.dataTransfer.dropEffect = 'copy';
});

//Reset UI when drag leaves
dropZone.addEventListener('dragleave', function (e) {
    console.log('a drag left...')
    e.preventDefault();

    dropZone.classList.remove('element-dragged');
})

// Get file data on drop
dropZone.addEventListener('drop', function(e) {
    console.log('something was dropped!!!')
    e.stopPropagation();
    e.preventDefault();
    var files = e.dataTransfer.files; // Array of all files

    for (var i = 0; i < files.length; i++ ) {

        var file = files[i];
        var img = new Image();

        img.name = file.name;
        img.onload = resizeImgAndCreateThumbnail;

        var reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function() {
            console.log('Reader loaded img..');
            img.src = reader.result;
        }
    }

    //Reset UI after dropping
    dropZone.classList.remove('element-dragged');
});


function resizeImgAndCreateThumbnail() {
    console.log('Resizing image ' + this.name);

    //'this' is bind to the img that is loading when the function is called
    var originalImg = this;
    var canvas = document.createElement("canvas");

    //Resize the img to fixed size 100x100px
    canvas.width = IMG_SIZE;
    canvas.height = IMG_SIZE;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(originalImg, 0, 0, IMG_SIZE, IMG_SIZE);

    var dataurl = canvas.toDataURL("image/png");

    var resizedImg = new Image();
    resizedImg.name = originalImg.name;
    resizedImg.src= dataurl;

    addOrUpdateThumbnailElement(resizedImg);
}