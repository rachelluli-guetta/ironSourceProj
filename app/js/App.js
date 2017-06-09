/**
 * Created by rachelg on 09/06/2017.
 */

var dropZone = document.getElementById("dropZone");
var IMG_SIZE = 100;

DragAndDropController.create(dropZone, onLoadImage);

function onLoadImage() {
    var image = this;
    var resizedImage = ImageScaler.resizeImgAndCreateThumbnail(image, IMG_SIZE);
    ThumbnailsController.addOrUpdateThumbnailElement(resizedImage);
    Storge.store()
}
