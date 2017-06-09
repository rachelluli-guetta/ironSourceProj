/**
 * Created by rachelg on 07/06/2017.
 */

var DragAndDropController = {};
DragAndDropController.create = function (dropZone, imageProcessingCallback) {
    initDragOver(dropZone);
    initDragLeave(dropZone);
    initDrop(dropZone, imageProcessingCallback)
}

//Change the UI when an image is dragged
function initDragOver(dropZone) {
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropZone.classList.add("element-dragged");
        e.dataTransfer.dropEffect = 'copy';
    });
}

//Reset UI when drag leaves
function initDragLeave(dropZone) {
    dropZone.addEventListener('dragleave', function (e) {
        e.preventDefault();
        dropZone.classList.remove('element-dragged');
    })
}

// Get file data on drop
function initDrop(dropZone, imageProcessingCallback) {
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        var files = e.dataTransfer.files; // Array of all files

        for (var i = 0; i < files.length; i++ ) {
            var file = files[i];

            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function() {
                var img = new Image();

                img.name = file.name;
                img.onload = imageProcessingCallback;
                img.src = reader.result;
            }
        }

        //Reset UI after dropping
        dropZone.classList.remove('element-dragged');
    });

}
