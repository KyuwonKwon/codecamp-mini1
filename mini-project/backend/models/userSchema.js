/*
const userTableSubItem = document.createElement("div");
userTableSubItem.className = "User_Table_Item";

const ogImgItem = document.createElement("img");
ogImgItem.className = "Og_Img_Info";
ogImgItem.src = data?.og?.image || "https://codebootcamp.co.kr/images/meta/main-thumb.png";

const ogTitleItem = document.createElement("div");
ogTitleItem.className = "Og_Item_Title";
ogTitleItem.textContent = data?.og?.title || "코드캠프";

const ogDescItem = document.createElement("div");
ogDescItem.className = "Og_Item_Info";
ogDescItem.textContent = data?.og?.description || "개발회사에서 만든 실무 코딩 부트캠프 || 개발자로 커리어점프 하다.";
*/

import mongoose from "mongoose";
const og = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
});
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: og,
});

export const User = mongoose.model("User", UserSchema);
