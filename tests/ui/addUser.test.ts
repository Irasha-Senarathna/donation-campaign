import { expect } from "chai";
import axios from "axios";
import { buildDriver, takeScreenshot, BASE_URL, REGISTER_PATH, By, until } from "../helpers/driver";

describe("UI - Add User (Registration)", function () {
  this.timeout(60000);
  let driver: any;

  beforeEach(async () => {
    driver = await buildDriver();
  });

  afterEach(async () => {
    if (driver) await driver.quit();
  });

  it("adds a new user and shows it in the list", async () => {
    const name = `Test User ${Date.now()}`;
    const email = `user${Date.now()}@test.com`;

    await driver.get(`${BASE_URL}${REGISTER_PATH}`);

    const nameInput = await driver.wait(until.elementLocated(By.css('input[placeholder="Name"]')), 10000);
    const emailInput = await driver.wait(until.elementLocated(By.css('input[placeholder="Email"]')), 10000);

    await nameInput.sendKeys(name);
    await emailInput.sendKeys(email);

    const addBtn = await driver.findElement(By.xpath("//button[contains(., 'Add User')]"));
    await addBtn.click();

    // Verify new user appears in list
    const itemXpath = `//li[contains(., "${name}") and contains(., "${email}")]`;
    await driver.wait(until.elementLocated(By.xpath(itemXpath)), 10000);

    await takeScreenshot(driver, "add-user-success");

    // Extra check via API (optional)
const res = await axios.get("http://127.0.0.1:5000/api/users");
    const found = res.data.find((u: any) => u.email === email);
    expect(found).to.exist;
  });
});
