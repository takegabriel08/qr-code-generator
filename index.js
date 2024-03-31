const forms = document.querySelector('#form-container');
const formUrl = document.querySelector('#form-container .form-option-url');
const formText = document.querySelector('#form-container .form-option-text');
const formEmail = document.querySelector('#form-container .form-option-email');
const formCall = document.querySelector('#form-container .form-option-call');
const formSms = document.querySelector('#form-container .form-option-sms');
const formVcard = document.querySelector('#form-container .form-option-vcard');
const formWhatsapp = document.querySelector('#form-container .form-option-whatsapp');
const formWifi = document.querySelector('#form-container .form-option-wifi');
const qrCodeDiv = document.querySelector('#qrcode');
const downloadSvgBtn = document.querySelector('#download-svg');
const downloadPngBtn = document.querySelector('#download-png');
const optionsContainer = document.querySelector('.options-container');

const optionsArray = ['option-url', 'option-text', 'option-email', 'option-call', 'option-sms', 'option-vcard', 'option-whatsapp', 'option-wifi'];
const functionsMap = {
    'option-url': generateQRCodeUrl,
    'option-text': generateQRCodeText,
    'option-email': generateQRCodeEmail,
    'option-call': generateQRCodeCall,
    'option-sms': generateQRCodeSms,
    'option-vcard': generateQRCodeVcard,
    'option-whatsapp': generateQRCodeWhatsapp,
    'option-wifi': generateQRCodeWifi,
}

optionsArray.forEach(element => {
    const optionElement = document.getElementById(`${element}`);
    optionElement.addEventListener('click', (e) => {
        const selectedOption = e.target.closest('.option');
        const prevSelectedOption = document.querySelector('.option-active');
        const selectedForm = forms.querySelector(`.form-${selectedOption.id}`);
        const prevSelectedForm = forms.querySelector(`form:not(.display-none)`);

        selectedOption.classList.toggle('option-active');
        prevSelectedOption.classList.toggle('option-active');
        selectedForm.className = selectedForm.className.replace('display-none', 'display-flex-center')
        prevSelectedForm.className = prevSelectedForm.className.replace('display-flex-center', 'display-none')
    })

    const selectedForm = document.getElementById(`form-${element}`);
    const submitBtn = selectedForm.querySelector('button.btn-generate');
    submitBtn.addEventListener('click', (e) => { functionsMap[element](e) });
    submitBtn.addEventListener('click', (e) => { resetInputs(e, element) });
    // window.addEventListener("keydown", function (e) {
    //     if (e.key === "Enter") {
    //         (e) => { functionsMap[element](e) };
    //     }
    // });
});

function generateQRCodeSms(e) {
    e.preventDefault()
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    const country = formSms.countrycodetel.value;
    const phone = formSms.tel.value;
    const body = formSms.body.value;

    qr.addData(`sms:${country}${phone}?body=${encodeURIComponent(body)}`);
    qr.make();
    var qrCodeHTML = qr.createSvgTag(5, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}


function generateQRCodeWhatsapp(e) {
    e.preventDefault()

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    const country = formWhatsapp.countrycodetel.value;
    const phone = formWhatsapp.tel.value;
    const message = formWhatsapp.message.value;

    qr.addData(`https://wa.me/${country}${phone}?text=${encodeURIComponent(message)}`);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(2, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}

function generateQRCodeVcard(e) {
    e.preventDefault()
    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    let name = formVcard.vname.value;
    let lastName = formVcard.vlast.value;
    let phone = formVcard.vmobile.value;
    let codTara = formVcard.codtara.value;
    let company = formVcard.vcompany.value;
    let title = formVcard.vtitle.value;
    let address = formVcard.vaddress.value;
    let city = formVcard.vcity.value;
    let country = formVcard.vcountry.value;
    let cap = formVcard.vcap.value;
    let email = formVcard.vemail.value;
    let url = formVcard.vurl.value;

    const vcard = `BEGIN:VCARD\nVERSION:2.1\nN;CHARSET=UTF-8:${lastName};${name}\nFN;CHARSET=UTF-8:${name} ${lastName}\nTEL;CELL:${codTara}${phone}\nORG;CHARSET=UTF-8:${company}\nTITLE;CHARSET=UTF-8:${title}\nADR;CHARSET=UTF-8;WORK;PREF:;;${address};${city};${country};${cap}\nEMAIL:${email}\nURL:${url}\nEND:VCARD`;

    qr.addData(vcard);
    qr.make();
    var qrCodeHTML = qr.createSvgTag(3, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}

function generateQRCodeCall(e) {
    e.preventDefault()
    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    const country = formCall.countrycodetel.value;
    const phone = formCall.tel.value;

    qr.addData(`tel:${country}${phone}`);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(5, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}

function generateQRCodeWifi(e) {
    e.preventDefault()

    var typeNumber = 4;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    const ssid = formWifi.ssid.value;
    const type = formWifi.networktype.value;
    const password = formWifi.wifipass.value;
    const hidden = formWifi.hidden.checked;

    qr.addData(`WIFI:S:${ssid};T:${type};P:${password};H:${hidden};;`);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(5, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}

function generateQRCodeEmail(e) {
    e.preventDefault()

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    const address = formEmail.email.value;
    const subject = formEmail.subject.value;
    const body = formEmail.message.value;

    qr.addData(`mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(3, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}

function generateQRCodeText(e) {
    e.preventDefault()

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    const text = formText.text.value;

    qr.addData(text);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(4, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}

function generateQRCodeUrl(e) {
    e.preventDefault()

    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    const url = formUrl.url.value;

    qr.addData(url);
    qr.make();

    var qrCodeHTML = qr.createSvgTag(4, 5, 'none');
    qrCodeDiv.innerHTML = qrCodeHTML;
}

function resetInputs(e, element) {
    e.preventDefault();
    const form = document.getElementById(`form-${element}`);
    form.reset();
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
