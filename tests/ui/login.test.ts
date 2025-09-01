import { expect } from "chai";
import axios from "axios";
import { buildDriver, takeScreenshot, BASE_URL, LOGIN_PATH, By, until } from "../helpers/driver";

describe("UI - Login existing user", function () {
  this.timeout(60000);
  let driver: any;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it("logs in with an existing email and shows success message", async () => {
    // Seed an existing user via API
    const email = `login${Date.now()}@test.com`;
    const name = "Login User";
await axios.post("http://127.0.0.1:5000/api/users", { name, email });

    await driver.get(`${BASE_URL}${LOGIN_PATH}`);

    // Find email field on Login page (placeholder must be "Email")
    const emailInput = await driver.wait(until.elementLocated(By.css('input[placeholder="Email"]')), 10000);
    await emailInput.clear();
    await emailInput.sendKeys(email);

    const loginBtn = await driver.findElement(By.xpath("//button[contains(., 'Login')]"));
    await loginBtn.click();

    // Wait for your success message to appear somewhere in the DOM
    // Make sure your frontend shows the text "Login successful" on success
    const success = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(., 'Login successful')]")),
      10000
    );

    expect(success).to.exist;

    await takeScreenshot(driver, "login-success");
  });
});
