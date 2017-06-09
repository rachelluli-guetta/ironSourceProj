/**
 * Created by rachelg on 08/06/2017.
 */

loadThumbnailsFromLocalStorage();

function addOrUpdateThumbnailElement(img) {
    if (getThumbnail(img.id)) {
        //If the item is already stored
        //then it was loaded and added to
        //the thumbnails, should only
        //update its data here
        var oldImg = document.getElementById(img.id);
        oldImg.src = img.src;
    } else {
        createThumbnailElement(img);
    }

    storeThumbnail(img.id, img.src);
}

function loadThumbnailsFromLocalStorage() {
    var thumbnails = getAllThumbnails();
    for (var item in thumbnails) {
        var img = new Image();
        img.id = item;
        img.src = thumbnails[item];

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
    removeThumbnailFromStorage(img.id);
    thumbnailsContainer.removeChild(thumbnailElement);
}
