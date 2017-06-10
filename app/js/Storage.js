/**
 * Created by rachelg on 08/06/2017.
 */

//Prefix to store, retrieve and remove
//thumbnails from local storage
var THUMBNAILS_PREFIX = 'thumbnails/';

function storeThumbnail(img){
    var storage = window.localStorage;
    storage.setItem(THUMBNAILS_PREFIX + img.id, img.src);
}

function removeThumbnailFromStorage(imgId) {
    var storage = window.localStorage;
    storage.removeItem(THUMBNAILS_PREFIX + imgId);
}

function getThumbnail(imgId) {
    var storage = window.localStorage;
    return storage.getItem(THUMBNAILS_PREFIX + imgId);
}

function getAllThumbnails() {
    var storage = window.localStorage;
    var thumbnails = {};

    Object.keys(storage).forEach(function(key) {
        if (key.startsWith(THUMBNAILS_PREFIX)) {
            //Remove thumbnails prefix as it is
            //used for storing purposes only
            var thumbnailKey = key.replace(THUMBNAILS_PREFIX, "");
            thumbnails[thumbnailKey] = storage[key];
        }
    });

    return thumbnails;
}