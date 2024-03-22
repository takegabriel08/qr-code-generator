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

var qrCodeHTML = generateQRCode('Hello, World!');
console.log(qrCodeHTML);