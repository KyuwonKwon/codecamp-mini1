import "dotenv/config.js";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "./email.js";
import mongoose from "mongoose";
import { Starbucks } from "./models/starbucksSchema.js";
import { Token } from "./models/tokenSchema.js";
import { User } from "./models/userSchema.js";
import { customRegistrationNumber } from "./personalnumber.js";
import cheerio from "cheerio";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  const phoneWithDash = checkValidationPhone(phone);
  if (phoneWithDash) {
    const newToken = getToken();
    sendTokenToSMS(phone, newToken);
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
    res.send(`${phoneWithDash}으로 인증 문자가 전송되었습니다.`);
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
  let input = req.body;
  // console.log(req.body);
  if (checkValidationEmail(input.email)) {
    const found = await Token.findOne({ phone: input.phone });
    // console.log(found);
    if (found.isAuth && input.token === found.token) {
      // console.log("정상")
      input.personal = customRegistrationNumber(input.personal);
      let og = {};
      const result = await axios.get(input.prefer);
      const $ = cheerio.load(result.data);
      $("meta").each((_, el) => {
        if ($(el).attr("property")) {
          console.log(og);
          og[$(el).attr("property").split(":")[1]] = $(el).attr("content");
        }
      });
      input["og"] = og;
      const user = new User(input);
      await user.save();
      sendTemplateToEmail(input.email, getWelcomeTemplate(input));
      res.send("정상반영");
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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
// 몽고DB 접속
mongoose.connect("mongodb://minicafe-db:27017/cafe");

app.listen(3000, () => {
  console.log(`서버 실행중 ${3000}`);
});
