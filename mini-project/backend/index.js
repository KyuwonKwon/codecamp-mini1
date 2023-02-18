import "dotenv/config.js";
import cors from "cors";
import express from "express";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import mongoose from "mongoose";
import { Starbucks } from "./models/starbucksSchema.js";
import { Token } from "./models/tokenSchema.js";
import { User } from "./models/userSchema.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  const phoneWithDash = checkValidationPhone(phone);
  if (phoneWithDash) {
    const newToken = getToken();
    // sendTokenToSMS(phone, token);
    const token = new Token({
      token: newToken,
      phone: phone,
      isAuth: false,
    });
    const found = await Token.findOne({ phone: phone }).exec();
    if (found) {
      await Token.updateOne({ phone: phone }, { token: token.token, isAuth: false });
    } else {
      token.save();
    }
    res.send(`${newToken}${phoneWithDash}으로 인증 문자가 전송되었습니다.`);
  }
});
app.patch("/tokens/phone", async (req, res) => {
  const found = await Token.findOne({ phone: req.body.phone }).exec();
  if (found) {
    if (found.token === req.body.token) {
      await Token.updateOne({ phone: req.body.phone }, { isAuth: true });
      res.send(true);
    } else {
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

app.post("/users", async (req, res) => {
  const input = req.body;
  console.log(req.body);
  if (checkValidationEmail(input.email)) {
    const found = await Token.findOne({ phone: input.phone }).exec();
    console.log(found);
    if (found.token === input.token) {
      const user = new User(input);
      user.save();
      //   sendTemplateToEmail(req.body.email, getWelcomeTemplate());
    } else {
      res.status(422).send("에러!! 핸드폰 번호가 인증되지 않았습니다.");
    }
  } else {
    res.send("올바른 이메일 주소를 입력해주세요");
  }
});
app.get("/users", async (_, res) => {
  const user = await User.find();
  res.send(user);
});
app.get("/starbucks", async (_, res) => {
  const menu = await Starbucks.find();
  res.send(menu);
});

// 몽고DB 접속
mongoose.connect("mongodb://minicafe-db:27017/cafe");

app.listen(3000, () => {
  console.log(`서버 실행중 ${3000}`);
});
