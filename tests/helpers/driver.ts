import { Builder, By, until, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import * as fs from "fs";
import * as path from "path";

export async function buildDriver(): Promise<WebDriver> {
  const options = new chrome.Options();
  // For CI, you can enable headless later:
  // options.addArguments("--headless=new");
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  await driver.manage().setTimeouts({ implicit: 0, pageLoad: 20000, script: 20000 });
  return driver;
}

export async function takeScreenshot(driver: WebDriver, name: string) {
  const dir = path.join(process.cwd(), "tests", "screenshots");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const data = await driver.takeScreenshot();
  const file = path.join(dir, `${Date.now()}-${name}.png`);
  fs.writeFileSync(file, data, "base64");
  console.log(`Saved screenshot: ${file}`);
}

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
// If your Register page is at "/", keep "/". If you use react-router at "/register", change it here or set env REGISTER_PATH.
/** Example override:  REGISTER_PATH=/register npm run test:ui */
export const REGISTER_PATH = process.env.REGISTER_PATH || "/";
export const LOGIN_PATH = process.env.LOGIN_PATH || "/login";

export { By, until };
