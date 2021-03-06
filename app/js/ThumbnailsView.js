/**
 * Created by rachelg on 08/06/2017.
 */

var ThumbnailsView = {};

ThumbnailsView.updateThumbnailElement = function(img) {
    var oldImg = document.getElementById(img.id);
    oldImg.src = img.src;
}

ThumbnailsView.createThumbnailElement = function(container, img, onRemoveCallback) {
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

    removeBtn.onclick = this.removeThumbnail.bind(this, imgContainer.id, onRemoveCallback);
    imgContainer.appendChild(removeBtn);

    container.appendChild(imgContainer);
}

ThumbnailsView.removeThumbnail = function(thumbnailElementId, onRemoveCallback) {
    var thumbnailElement = document.getElementById(thumbnailElementId);
    var img = thumbnailElement.firstElementChild;
    thumbnailElement.remove();

    onRemoveCallback(img.id);
}
