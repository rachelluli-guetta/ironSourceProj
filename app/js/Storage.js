/**
 * Created by rachelg on 08/06/2017.
 */

var storage = window.localStorage;

function storeImg(imgName, imgData){
    storage.setItem(imgName, imgData);
}


function removeImgFromStorage(imgName) {
    storage.removeItem(imgName);
}