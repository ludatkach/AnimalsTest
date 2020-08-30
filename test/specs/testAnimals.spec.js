const { expect } = require('chai');
import axios from 'axios';
const fs = require('fs');

let userEmail;
let catImage;
let dogImage;
let foxImage;
let catUrl;
let dogUrl;
let foxUrl;
let fileName;

describe('TEST TASK', () => {
  before('go to getnada.com', () => {
    browser.url('https://getnada.com');
    browser.maximizeWindow();
  });

  it('should have a right title ', () => {
    expect(browser.getTitle()).eq('Nada - temp mail - fast and free');
  });

  it('should create an email', () => {
    browser.$('//i[@class="icon-plus"]').click();
    let userName = browser.$('//input[@class="user_name"]').getValue();
    let d = new Date();
    userName = userName + d.getTime();
    userEmail = userName + '@getnada.com';
    browser.$('//input[@class="user_name"]').keys('Control', 'a');
    browser.$('//input[@class="user_name"]').setValue(userName);

    browser.$('//a[@class="button success"]').click();
    expect(browser.$('//a[@class=" is-active"]//span').getText()).eq(userEmail);
  });

  it('should get API cat image url', async () => {
    const result = await axios({
      method: 'get',
      url: 'http://aws.random.cat/meow',
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    catImage = result.file;
    expect(result.file).to.match(/.jpe?g|.png|.mp4|.gif|.webm$/i);
  });

  it('should get API dog image url', async () => {
    const result = await axios({
      method: 'get',
      url: 'http://random.dog/woof.json',
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    dogImage = result.url;
    expect(result.url).to.match(/.jpe?g|.png|.mp4|.gif|.webm$/i);
  });

  it('should get API fox image url', async () => {
    const result = await axios({
      method: 'get',
      url: 'http://randomfox.ca/floof/',
    })
      .then(res => res.data)
      .catch(err => err.response.data);
    foxImage = result.image;
    expect(result.image).to.match(/.jpe?g|.png|.mp4|.gif|.webm$/i);
  });

  it('should login in gmail', () => {
    browser.newWindow('https://mail.google.com');
    browser.maximizeWindow();
    browser.$('//input[@id="identifierId"]').setValue('lt364226@gmail.com');
    browser.$('//div[@class="VfPpkd-RLmnJb"]').click();
    browser.waitUntil(() => browser.$('//input[@type="password"]').isDisplayed());
    browser.$('//input[@class="whsOnd zHQkBf"]').setValue('lt112233');
    browser.$('//div[@class="VfPpkd-RLmnJb"]').click();
    browser.waitUntil(() => browser.$('//img[@class="gb_va"]').isDisplayed());
    expect(browser.$('//div[@class="T-I T-I-KE L3"]').isClickable()).eq(true);
  });

  it('should create letter in gmail account and send it to another email', () => {
    browser.$('//div[@class="T-I T-I-KE L3"]').click();
    browser.$('//textarea[@class="vO"]').setValue(userEmail);
    browser.$('//input[@name="subjectbox"]').setValue('My favorite animals');
    browser
      .$('//div[@class="Am Al editable LW-avf tS-tW"]')
      .setValue(catImage + '\n' + dogImage + '\n' + foxImage);
    browser.$('//div[text()="Send"]').click();
    browser.waitUntil(() => browser.$('//span[text()="Message sent."]').isDisplayed());
    expect(browser.$('//div[@class="vh"]//span[@class="aT"]').isDisplayed()).eq(true);
  });

  it('should check email with 3 url in getnada email box', () => {
    browser.switchWindow('https://getnada.com/');
    browser.waitUntil(() => browser.$('//li[@class="msg_item"]').isClickable(), {
      timeout: 120000,
    });
    browser.$('//li[@class="msg_item"]').click();
    browser.waitUntil(() => browser.$('//iframe[@id="idIframe"]').isDisplayed());
    const emailFrame = browser.$('//iframe[@id="idIframe"]');
    browser.switchToFrame(emailFrame);
    browser.waitUntil(() => browser.$('//a[text()="' + catImage + '"]').isDisplayed());
    browser.waitUntil(() => browser.$('//a[text()="' + dogImage + '"]').isDisplayed());
    browser.waitUntil(() => browser.$('//a[text()="' + foxImage + '"]').isDisplayed());
    catUrl = browser.$('//div[@dir="ltr"]/a').getAttribute('href');
    dogUrl = browser.$('(//div[@dir="ltr"]/div/a)[1]').getAttribute('href');
    foxUrl = browser.$('(//div[@dir="ltr"]/div/a)[2]').getAttribute('href');
    expect(catUrl).eq(catImage);
    expect(dogUrl).eq(dogImage);
    expect(foxUrl).eq(foxImage);
  });

  it('should take screenshot of cat image', () => {
    fileName = 'test/img/catImage.png';
    browser.url(catUrl);
    browser.saveScreenshot(fileName);
    expect(fs.existsSync(fileName)).eq(true);
  });

  it('should take screenshot of dog image', () => {
    fileName = 'test/img/dogImage.png';
    browser.url(dogUrl);
    browser.saveScreenshot(fileName);
    expect(fs.existsSync(fileName)).eq(true);
  });

  it('should take screenshot of fox image', () => {
    fileName = 'test/img/foxImage.png';
    browser.url(foxUrl);
    browser.saveScreenshot(fileName);
    expect(fs.existsSync(fileName)).eq(true);
  });
});
