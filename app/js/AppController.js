/**
 * Created by rachelg on 09/06/2017.
 */
var dropZone = document.getElementById("dropZone");
var thumbnailsContainer = document.getElementById("thumbnailsContainer");
var IMG_SIZE = 100;

startApp();

function startApp() {
    DragAndDropView.create(dropZone, onLoadImage);
    loadThumbnailsFromLocalStorage();
}

//Callback called after dropping an image
function onLoadImage() {
    var image = this;
    var resizedImage = ImageScaler.resizeImgAndCreateThumbnail(image, IMG_SIZE);

    if (ThumbnailsStorageManager.getThumbnail(image.id)) {
        ThumbnailsView.updateThumbnailElement(resizedImage);
    } else {
        ThumbnailsView.createThumbnailElement(thumbnailsContainer, resizedImage, ThumbnailsStorageManager.removeThumbnail);
    }

    ThumbnailsStorageManager.storeThumbnail(resizedImage);
}

//Init the page with the thumbnails from the local storage
function loadThumbnailsFromLocalStorage() {
    var thumbnails = ThumbnailsStorageManager.getAllThumbnails();
    for (var item in thumbnails) {
        var img = new Image();
        img.id = item;
        img.src = thumbnails[item];

        ThumbnailsView.createThumbnailElement(thumbnailsContainer, img, ThumbnailsStorageManager.removeThumbnail);
    }
}