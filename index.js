const formUrl = document.querySelector('#form-container .url-form');
const formEmail = document.querySelector('#form-container .form-email');
const qrCodeDiv = document.querySelector('#qrcode');
const downloadSvgBtn = document.querySelector('#download-svg');
const downloadPngBtn = document.querySelector('#download-png');

const onGenerateUrl = (e) => {
    e.preventDefault();
    const url = formUrl.url.value;
    const qrCodeHTML = generateQRCodeUrl(url);
    qrCodeDiv.innerHTML = qrCodeHTML;
}

const onGenerateEmail = (e) => {
    e.preventDefault();
    const email = formEmail.email.value;
    const subject = formEmail.subject.value;
    const body = formEmail.mesaj.value;
    const qrCodeHTML = generateQRCodeUrl(email, subject, body);
    qrCodeDiv.innerHTML = qrCodeHTML;
}

formUrl.addEventListener('submit', onGenerateUrl);
formEmail.addEventListener('submit', onGenerateEmail);

function generateQRCodeEmail(email, subject, body){
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(`mailto:${email}?subject=${subject}&body=${body}`);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(7, 5, 'none');
    return qrCodeHTML;
}

function generateQRCodeUrl(url) {
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(url);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(7, 5, 'none');
    return qrCodeHTML;
}

function generateQRCode(text) {
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();
    // document.getElementById('placeHolder').innerHTML = qr.createImgTag();

    var qrCodeHTML = qr.createImgTag();
    return qrCodeHTML;
}

function downloadSVG() {
    var imgElm = imgElm = document.querySelector('#qrcode > svg');
    var svgData = new XMLSerializer().serializeToString(imgElm);
    var encodedSvgData = encodeURIComponent(svgData);
    var link = document.createElement('a');
    link.download = 'qrcode.svg';
    link.href = 'data:image/svg+xml,' + encodedSvgData;
    link.click();
}

function downloadPNG() {
    var imgElm = document.querySelector('#qrcode > svg');
    var svgData = new XMLSerializer().serializeToString(imgElm);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var v = canvg.Canvg.fromString(ctx, svgData);
    v.start();
    var imgData = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = imgData;
    link.click();
}
downloadSvgBtn.addEventListener('click', downloadSVG);
downloadPngBtn.addEventListener('click', downloadPNG);

var qrCodeHTML = generateQRCode('Hello, World!');
console.log(qrCodeHTML);