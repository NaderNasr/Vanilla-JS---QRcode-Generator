/* eslint-disable no-undef */
const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const spinner = document.getElementById('spinner');
const close = document.querySelector('#close');
const toast = document.querySelector('#toast-warning');

close.addEventListener('click', () => {
  toast.style.display = 'none';
});


const generateQRCode = (url, size) => {
  new QRCode(qr, {
    text: url,
    width: size,
    height: size,
    colorDark: "#000000"
  });
};

const clearQrCode = () => {
  qr.innerHTML = '';
  const saveButton = document.getElementById('save-link');
  if (saveButton) {
    saveButton.remove();
  }
};

const saveQR = (url) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto mt-5 mb-5';
  link.href = url;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('generated').appendChild(link);
};

const showSpinner = () => {
  spinner.style.marginBottom = '120px';
  spinner.style.display = 'block';

};

const hideSpinner = () => {
  spinner.style.display = 'none';
};

const onSubmit = (event) => {
  event.preventDefault();
  clearQrCode();
  const size = document.querySelector('#size').value;
  const noUrl = document.querySelector('#toast-warning');
  const url = document.querySelector('#url').value;

  console.log(url);
  if (url.length <= 0) {
    clearQrCode();
    return noUrl.style.display = 'flex';
  }
  if (size === '') {
    clearQrCode();
    noUrl.style.display = 'flex';
    console.log(noUrl);
    return document.querySelector('#error').innerText = 'Please select a size';
  }

  if (size !== '' && url.length > 0) {
    showSpinner();
    console.log(url.length, size);
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      setTimeout(() => {
        // console.log(qr.querySelector('img'));
        const saveURL = qr.querySelector('img').src;
        saveQR(saveURL);
      }, 50);
    }, 2200);
  }

};

hideSpinner();

form.addEventListener('submit', onSubmit);