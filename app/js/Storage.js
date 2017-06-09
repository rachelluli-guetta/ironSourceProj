/**
 * Created by rachelg on 08/06/2017.
 */

//Prefix to store, retrieve and remove
//thumbnails from local storage
var THUMBNAILS_PREFIX = 'thumbnails/';

function storeThumbnail(imgName, imgData){
    var storage = window.localStorage;
    storage.setItem(THUMBNAILS_PREFIX + imgName, imgData);
}

function removeThumbnailFromStorage(imgName) {
    var storage = window.localStorage;
    storage.removeItem(THUMBNAILS_PREFIX + imgName);
}

function getThumbnail(imgName) {
    var storage = window.localStorage;
    return storage.getItem(THUMBNAILS_PREFIX + imgName);
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