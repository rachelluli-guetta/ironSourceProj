/**
 * Created by rachelg on 09/06/2017.
 */

//Get Required Elements
var dropZone = document.getElementById("dropZone");
var thumbnailsContainer = document.getElementById("thumbnailsContainer");
var lastPos = 0;

//Constants
var IMG_SIZE = 100;

startApp();

function startApp() {
    DragAndDropView.create(dropZone, onLoadImage);
    loadThumbnailsFromLocalStorage();
}

//Callback called after dropping an image
function onLoadImage() {
    var pos;
    var image = this;
    var resizedImage = ImageScaler.resizeImgAndCreateThumbnail(image, IMG_SIZE);

    var thumbnail = ThumbnailsStorageManager.getThumbnail(image.id)

    if (thumbnail) {
        ThumbnailsView.updateThumbnailElement(resizedImage);
        pos = thumbnail.pos;
    } else {
        ThumbnailsView.createThumbnailElement(thumbnailsContainer, resizedImage, ThumbnailsStorageManager.removeThumbnail);
        pos = ++lastPos;
    }

    ThumbnailsStorageManager.storeThumbnail(resizedImage, pos);
}

//Init the page with the thumbnails from the local storage
//a thumbnail is in the form {imageName: {src: imgSource, pos: imgPosition}}
//whereas the imgPosition represents the position the image should be inserted in
//in the page according to chronological order of the img insertion
function loadThumbnailsFromLocalStorage() {
    var thumbnails = ThumbnailsStorageManager.getAllThumbnails();
    var thumbnailsKeys = getSortedThumbnails(thumbnails)

    for (var key in thumbnailsKeys) {
        var thumbnailId = thumbnailsKeys[key];

        var img = new Image();
        img.id = thumbnailId;
        img.src = thumbnails[thumbnailId].src;

        ThumbnailsView.createThumbnailElement(thumbnailsContainer, img, ThumbnailsStorageManager.removeThumbnail);
    }

    var maxPosThumbnailKey = thumbnailsKeys[thumbnailsKeys.length - 1]
    lastPos = thumbnails[maxPosThumbnailKey].pos || 0;
}


function getSortedThumbnails(thumbnails) {
    var thumbnailsKeys = Object.keys(thumbnails);

    thumbnailsKeys.sort(function (a, b) {
        return thumbnails[a].pos - thumbnails[b].pos;
    })

    return thumbnailsKeys;
}