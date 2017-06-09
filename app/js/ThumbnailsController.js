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


        // debugger

        var oldImg = document.getElementById(img.name);
        oldImg.src = dataUrl;
    } else {
        img.src = dataUrl;
        window.localStorage.setItem(img.name, dataUrl);
        var imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(img);
        thumbnailsContainer.appendChild(imgContainer);
    }

    storage.setItem(img.name, dataUrl);

}

function loadThumbnailsFromLocalStorage() {
    for (var item in storage) {
        var img = new Image();
        img.id = item;
        img.src = storage[item];

        var imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(img);
        thumbnailsContainer.appendChild(imgContainer);
    }
}

