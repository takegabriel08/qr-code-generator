const forms = document.querySelectorAll('#form-container form');
const formUrl = document.querySelector('#form-container .form-url');
const formText = document.querySelector('#form-container .form-text');
const formEmail = document.querySelector('#form-container .form-email');
const qrCodeDiv = document.querySelector('#qrcode');
const downloadSvgBtn = document.querySelector('#download-svg');
const downloadPngBtn = document.querySelector('#download-png');
const optionsContainer = document.querySelector('.options-container');

const optionsArray = ['url', 'text', 'email', 'call', 'sms', 'vcard', 'whatsapp', 'wifi'];

for (let idx = 0; idx < optionsContainer.querySelectorAll('.option').length; idx++) {
    let array = optionsContainer.querySelectorAll('.option');
    const element = array[idx];
    element.addEventListener('click', (e) => {
        const selectedOption = e.target.closest('.option');
        if (selectedOption) {
            const prevSelectedOption = document.querySelector('.options-container .option-active');
            prevSelectedOption.classList.toggle('option-active');
            selectedOption.classList.toggle('option-active');
            const prevSelectedForm = document.querySelectorAll('#form-container form:not(.display-none)')[0];
            const selectedForm = document.querySelector(`#form-container form.form-${selectedOption.classList[0]}`);
            deselectForm(prevSelectedForm);
            selectForm(selectedForm);
        }
        console.log('asdfg')
    });
}

const onGenerateUrl = (e) => {
    e.preventDefault();
    const url = formUrl.url.value;
    const qrCodeHTML = generateQRCodeUrl(url);
    qrCodeDiv.innerHTML = qrCodeHTML;
}

const onGenerateText = (e) => {
    e.preventDefault();
    const text = formText.text.value;
    const qrCodeHTML = generateQRCodeText(text);
    qrCodeDiv.innerHTML = qrCodeHTML;
}

const onGenerateEmail = (e) => {
    e.preventDefault();
    const email = formEmail.email.value;
    const subject = formEmail.subject.value;
    const body = formEmail.mesaj.value;
    const qrCodeHTML = generateQRCodeEmail(email, subject, body);
    qrCodeDiv.innerHTML = qrCodeHTML;
}

const functionsMap = {
    url: onGenerateUrl,
    text: onGenerateText,
    email: onGenerateEmail
}

for (let idx = 0; idx < forms.length; idx++) {
    const element = Array.from(forms)[idx];
    if (!element.className.includes('display-none')) {
        let functionName = element.className.split(' ').length > 1 ? element.className.split(' ')[0].replace('form-', '') : element.className.replace('form-', '');
        element.addEventListener('click', functionsMap[functionName])
    }
}

function generateQRCodeEmail(email, subject, body) {
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(`mailto:${email}?subject=${subject}&body=${body}`);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(5, 5, 'none');
    return qrCodeHTML;
}

function generateQRCodeText(text) {
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(5, 5, 'none');
    return qrCodeHTML;
}

function generateQRCodeUrl(url) {
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(url);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(5, 5, 'none');
    return qrCodeHTML;
}

function deselectForm(form) {
    if (form.className.includes('display-flex-center')) {
        form.classList.remove('display-flex-center');
    }
    form.classList.add('display-none');
}

function selectForm(form) {
    form.classList.remove('display-none');
    form.classList.add('display-flex-center');
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
