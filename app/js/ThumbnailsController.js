/**
 * Created by rachelg on 08/06/2017.
 */

loadThumbnailsFromLocalStorage();

function createThumbnailElement(img, dataUrl) {

    if (storage.getItem(img.name)) {
        //If the item is already stored
        //then it was loaded and added to
        //the thumbnails, should only
        //update its data here
        var oldImg = document.getElementById(img.name);
        oldImg.src = dataUrl;
    } else {
        img.src = dataUrl;
        var imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(img);
        thumbnailsContainer.appendChild(imgContainer);
    }

    storeImg(img.name, dataUrl);

}

function loadThumbnailsFromLocalStorage() {
    for (var item in storage) {
        var img = new Image();
        img.id = item;
        img.src = storage[item];

        createThumbnailElement(img);
    }
}

function createThumbnailElement(img) {

    //Create a container for the element
    var imgContainer = document.createElement('div');
    imgContainer.id = img.id + '-container';
    imgContainer.classList.add('img-container');

    //Insert the thumbnail in the container
    imgContainer.appendChild(img);

    //Insert a remove button in the container
    var removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'x';
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = removeThumbnailFactory(imgContainer.id);
    imgContainer.appendChild(removeBtn);

    thumbnailsContainer.appendChild(imgContainer);
}

//Creates a function calling removeThumbnail
//with the given thumbnail element id
function removeThumbnailFactory(thumbnailElementId) {
    return function() {
        removeThumbnail(thumbnailElementId);
    }
}

function removeThumbnail(thumbnailElementId) {
    var thumbnailElement = document.getElementById(thumbnailElementId);
    var img = thumbnailElement.firstElementChild;
    removeImgFromStorage(img.id);
    thumbnailsContainer.removeChild(thumbnailElement);
}
