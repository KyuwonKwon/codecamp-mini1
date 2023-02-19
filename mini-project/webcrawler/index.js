import puppeteer from "puppeteer";
import mongoose from "mongoose";
import { Starbucks } from "./models/starbucksSchema.js";
mongoose.connect("mongodb://localhost:27017/cafe");

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);

  let i;
  let j;

  for (i = 2; i < 11; i += 2) {
    for (j = 1; j < 15; j++) {
      try {
        const data = await page.$eval(
          `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li:nth-child(${j}) > dl > dt > a > img`,
          (el) => el.outerHTML
        );
        const imageAndName = data.split('"');
        const starbucks = new Starbucks({ name: imageAndName[3], img: imageAndName[1] });
        starbucks.save();
      } catch (error) {
        j = 15;
      }
    }
  }

  await browser.close();
  process.exit(0);
}

startCrawling();
