import coolsms from "coolsms-node-sdk";

export function checkValidationPhone(phone) {
  if (phone.length !== 10 && phone.length !== 11) {
    console.log("에러 발생!!! 핸드폰 번호를 제대로 입력해 주세요!!!");
    return false;
  } else {
    const phoneWithDash = " "
      .concat(phone)
      .replace(/(.{4})/g, "$1-")
      .slice(1, -1);
    return phoneWithDash;
  }
}

export function getToken() {
  const count = 6;
  if (count === undefined) {
    console.log("에러 발생!!! 갯수를 제대로 입력해 주세요!!!");
    return;
  } else if (count <= 0) {
    console.log("에러 발생!!! 갯수가 너무 적습니다!!!");
    return;
  } else if (count > 10) {
    console.log("에러 발생!!! 갯수가 너무 많습니다!!!");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(count, "0");
  return result;
}

export async function sendTokenToSMS(phone, token) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SMS_SENDER = process.env.SMS_SENDER;

  const mysms = coolsms.default;
  const messageService = new mysms(SMS_KEY, SMS_SECRET);
  const result = await messageService.sendOne({
    to: phone,
    from: SMS_SENDER,
    text: `안녕하세요!! 인증번호는 ${token}입니다!!`,
  });
  console.log(result);
}
