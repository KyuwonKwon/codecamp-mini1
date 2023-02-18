function getUserInput() {
  const userinput = document.getElementsByClassName("SignupInput");
  const tokenInput = document.getElementById("TokenInput").value;

  return {
    name: userinput[0].value,
    personal: userinput[1].value + "-" + userinput[2].value,
    phone: userinput[3].value + userinput[4].value + userinput[5].value,
    prefer: userinput[6].value,
    email: userinput[7].value,
    pwd: userinput[8].value,
    token: tokenInput,
  };
}

// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector("#ValidationInputWrapper").style.display = "flex";
  await axios.post("http://localhost:3000/tokens/phone", { phone: getUserInput().phone });
  console.log("인증 번호 전송");
};

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const getInput = getUserInput();
  await axios
    .patch("http://localhost:3000/tokens/phone", {
      phone: getInput.phone,
      token: getInput.token,
    })
    .then((res) => {
      if (res.data) console.log("핸드폰 인증 완료");
      else console.log("핸드폰 인증 실패");
    });
};

// 회원 가입 API 요청
const submitSignup = async () => {
  await axios.post("http://localhost:3000/users", getUserInput()).then((res) => {
    console.log(res);
  });
};
