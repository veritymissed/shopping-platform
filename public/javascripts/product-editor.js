// var quill = new Quill('#editor-container', {
//   modules: {
//     toolbar: [
//       ['bold', 'italic'],
//       ['link', 'blockquote', 'image'],
//       [{ list: 'ordered' }, { list: 'bullet' }]
//     ]
//   },
//   placeholder: '輸入商品簡介',
//   theme: 'snow'
// });
//
// var form = document.querySelector('form');
// form.onsubmit = function(e) {
//   e.preventDefault()
//   // Populate hidden form on submit
//   var about = document.querySelector('input[name=about]');
//   about.value = JSON.stringify(quill.getContents());
//
//   console.log("Submitted", $(form).serialize(), $(form).serializeArray());
//   var selectedFile = document.querySelector('input[name=inputImage]').files[0];
//   // console.log("selectedFile", selectedFile);
//
//   // No back end to actually submit to!
//   // alert('Open the console to see the submit data!')
//
//   var uploadEle = fileElem = document.querySelector('input[name=inputImage]')
//   console.log("uploadEle", uploadEle.files[0]);
//
//   return false;
// };
//
// var changePhotoItem = document.querySelector('#change-photo')
// var fileElem = document.querySelector('input[name=inputImage]')
// changePhotoItem.addEventListener("click", function (e) {
//   if (fileElem) {
//     fileElem.click();
//   }
//   e.preventDefault(); // prevent navigation to "#"
// }, false);
//
// fileElem.addEventListener('change', function(e) {
//   if (this.files.length === 0 ) return
//   var file = this.files[0]
//   var reader = new FileReader();
//   reader.readAsDataURL(file);
//
//   reader.onload = function(e) {
//     document.querySelector('img[name=image-display]').src = reader.result
//   }
//   this.reader = reader
// })
