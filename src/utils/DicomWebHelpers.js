const MIME_BOUNDARY_1 = '----=_NextPart_a126d56445c14437a161baee8dac89db';
const MIME_BOUNDARY_2 = '----=_NextPart_f826f6fc1ea74f898a6c4e30cf7be988';

export function composeDicomMutltipart(files) {
  const body = ['MIME-Version: 1.0'];
  body.append(`Content-Type: multipart/mixed; boundary="${MIME_BOUNDARY_1}"; type="text/plain"`);
  body.append('\n');
  body.append('This is a multi-part message in MIME format.');
  body.append('\n');
  body.append('--' + MIME_BOUNDARY_1);
  body.append(
    `Content-Type: multipart/related; boundary="${MIME_BOUNDARY_2}"; type="application/dicom"`
  );
  body.append('--' + MIME_BOUNDARY_1);

  Array.from(files).forEach(file => {
    body.append(`Content-Type: application/dicom; name="${file.name}"`);
    body.append('Content-Transfer-Encoding: base64');
    body.append(`Content-Disposition: attachment; filename="${file.name}"`);
    body.append('\n');
    body.append(fileToBase64(file));
    body.append();
  });

  body.append('--' + MIME_BOUNDARY_1 + '--');
  return body.join('\n');
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = resolve;
    reader.onerror = reject;
  });
}
