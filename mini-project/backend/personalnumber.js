export function customRegistrationNumber(reginum) {
  if (correctHipen(reginum) === false);
  if (isReginumberLength(reginum) === false);
  return blockLastNumbers(reginum);
}

function correctHipen(reginum) {
  if (reginum[6] !== "-") {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!");
    return false;
  }
  return true;
}

function isReginumberLength(reginum) {
  if (reginum.length !== 14) {
    console.log("에러 발생!!! 개수를 제대로 입력해 주세요!!!");
    return false;
  }
  return true;
}

function blockLastNumbers(reginum) {
  return reginum.slice(0, 8) + "******";
}
