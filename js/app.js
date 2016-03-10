'use strict';

let images = [
  {
    title: 'Image 1',
    url: 'https://js.cx/gallery/img1-lg.jpg',
    thumbUrl: 'https://js.cx/gallery/img1-thumb.jpg'
  },{
    title: 'Image 2',
    url: 'https://js.cx/gallery/img2-lg.jpg',
    thumbUrl: 'https://js.cx/gallery/img2-thumb.jpg'
  },{
    title: 'Image 3',
    url: 'https://js.cx/gallery/img3-lg.jpg',
    thumbUrl: 'https://js.cx/gallery/img3-thumb.jpg'
  },{
    title: 'Image 4',
    url: 'https://js.cx/gallery/img4-lg.jpg',
    thumbUrl: 'https://js.cx/gallery/img4-thumb.jpg'
  },{
    title: 'Image 5',
    url: 'https://js.cx/gallery/img5-lg.jpg',
    thumbUrl: 'https://js.cx/gallery/img5-thumb.jpg'
  },{
    title: 'Image 6',
    url: 'https://js.cx/gallery/img6-lg.jpg',
    thumbUrl: 'https://js.cx/gallery/img6-thumb.jpg'
  }
];


[].forEach.call(document.querySelectorAll('[data-component="gallery"]'), function(galleryEl) {
  let myGallery = new Gallery({
    element: galleryEl,
    images: images
  });
});




