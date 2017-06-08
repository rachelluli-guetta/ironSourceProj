/**
 * Created by rachelg on 07/06/2017.
 */


var dropZone = document.getElementById("dropZone");
var thumbnailsContainer = document.getElementById("thumbnailsContainer");

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

    console.log("Files are " + JSON.stringify(files));

    for (var key in files) {

        var file = files[key];
        var reader = new FileReader();

        reader.onload = function(e2) {
            // finished reading file data.
            var img = document.createElement('img');

            img.src= e2.target.result;
            thumbnailsContainer.appendChild(img);
        }

        reader.readAsDataURL(file); // start reading the file data.
    }

    dropZone.classList.remove('element-dragged');
});


// function createThumbnailElement() {
//     var img = document.createElement('img');
//     img.classList.add('thumbnail');
//     return img;
// }