'use strict';

class Gallery {
  constructor(options) {
    this._el = options.element;
    this._images = options.images;

    this._el.innerHTML = `
        <p>
          <img data-selector="largeImage" src="https://js.cx/gallery/img1-lg.jpg" alt="Large image">
        </p>

        <ul data-selector="imageList"></ul>
    `;

    this._largeImage = this._el.querySelector('[data-selector="largeImage"]');
    this._imageList = this._el.querySelector('[data-selector="imageList"]');

    this._preloadImages();
    this._renderImages();

    this._imageList.addEventListener('click', this._onThumbClick.bind(this));
  }

  _onThumbClick(event) {
    let link = event.target.closest('[data-selector="imageLink"]');

    if (!link) {
      return;
    }

    event.preventDefault();

    this._showThumbnail(link.href, link.title)
  }

  _showThumbnail(href, title) {
    this._largeImage.src = href;
    this._largeImage.alt = title;
  }

  _renderImages() {
    this._images.forEach(imageData => {
      let imageHtml = `
          <li>
            <a data-selector="imageLink" href="${ imageData.url }" title="${ imageData.title }">
              <img src="${ imageData.thumbUrl }">
            </a>
          </li>
      `;

      this._imageList.insertAdjacentHTML('beforeEnd', imageHtml);
    });
  }

  _preloadImages() {
    this._images.forEach(function(imageData) {
      let image = new Image();

      image.src = imageData.url;
    });
  }
}




