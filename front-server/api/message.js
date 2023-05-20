const timestamp = () => {
  const current_time = new Date().getTime();
  return String(current_time);
}

const signiture = () => {
  // TODO: crypto 모듈 알아보기 
  const crypto = require('crypto');

  function generateSignature(secretKey, body) {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(body);
    const signature = hmac.digest('base64');
    return signature;
}

  const accessKeyId = "YOUR_ACCESS_KEY_ID";
  const secretKey = "YOUR_SECRET_KEY";
  const requestBody = "YOUR_REQUEST_BODY";

  const signature = generateSignature(secretKey, requestBody);

  return signature
}