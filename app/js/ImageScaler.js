/**
 * Created by rachelg on 09/06/2017.
 */

var ImageScaler = {}
ImageScaler.resizeImgAndCreateThumbnail = function(originalImg, imgSize) {
    //'this' is bind to the img that is loading when the function is called
    var canvas = document.createElement("canvas");

    //Resize the img to fixed size 100x100px
    canvas.width = imgSize;
    canvas.height = imgSize;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(originalImg, 0, 0, imgSize, imgSize);

    var dataUrl = canvas.toDataURL("image/png");

    var resizedImg = new Image();
    resizedImg.id = originalImg.id;
    resizedImg.src = dataUrl;

    return resizedImg;
}
