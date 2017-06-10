/**
 * Created by rachelg on 08/06/2017.
 */

//Prefix to store, retrieve and remove
//thumbnails from local storage
var THUMBNAILS_PREFIX = 'thumbnails/';
var ThumbnailsStorageManager = {};

ThumbnailsStorageManager.storeThumbnail = function(img, pos){
    var storage = window.localStorage;
    var thumbnail = { src: img.src, pos: pos};
    var serializedThumbnail = JSON.stringify(thumbnail)

    storage.setItem(THUMBNAILS_PREFIX + img.id, serializedThumbnail);
}

ThumbnailsStorageManager.removeThumbnail = function(imgId) {
    var storage = window.localStorage;
    storage.removeItem(THUMBNAILS_PREFIX + imgId);
}

ThumbnailsStorageManager.getThumbnail = function(imgId) {
    var storage = window.localStorage;
    return JSON.parse(storage.getItem(THUMBNAILS_PREFIX + imgId));
}

ThumbnailsStorageManager.getAllThumbnails = function() {
    var storage = window.localStorage;
    var thumbnails = {};

    Object.keys(storage).forEach(function(key) {
        if (key.startsWith(THUMBNAILS_PREFIX)) {
            //Remove thumbnails prefix as it is
            //used for storing purposes only
            var thumbnailKey = key.replace(THUMBNAILS_PREFIX, "");
            thumbnails[thumbnailKey] = JSON.parse(storage[key]);
        }
    });

    return thumbnails;
}