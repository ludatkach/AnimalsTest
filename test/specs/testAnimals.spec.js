const {expect} = require('chai');
import axios from 'axios';

let userEmail;
let catImage;
let dogImage;
let foxImage;

describe('CREATE EMAIL ON GETNADA', () => {

  before('go to getnada.com', () => {
    browser.url('https://getnada.com');
  });

  it('should be a right title ', () => {
    expect(browser.getTitle()).eq('Nada - temp mail - fast and free');
  });

  it('should create an email', () => {
    browser.$('//i[@class="icon-plus"]').click();
    let useName = browser.$('//input[@class="user_name"]').getValue();
    userEmail = useName + '@getnada.com';
    browser.$('//a[@class="button success"]').click();
    expect(browser.$('//a[@class=" is-active"]//span').getText()).eq(userEmail);
  });


  it('should get cat image url', async  () => {
     const result = await axios({
      method: 'get',
      url: 'http://aws.random.cat/meow',
    })
      .then(res => res.data)
      .catch(err => err.response.data)
    catImage = result.file;
    expect(result.file).to.match(/.jpe?g|.png|mp4|gif$/i);
  });

  it('should get dog image url', async  () => {
    const result = await axios({
      method: 'get',
      url: 'http://random.dog/woof.json',
    })
      .then(res => res.data)
      .catch(err => err.response.data)
    dogImage = result.url;
    expect(result.url).to.match(/.jpe?g|.png|mp4|gif$/i);
  });

  it('should get fox image url', async  () => {
        const result = await axios({
      method: 'get',
      url: 'http://randomfox.ca/floof/',
    })
      .then(res => res.data)
      .catch(err => err.response.data)
    foxImage = result.image;
    expect(result.image).to.match(/.jpe?g|.png|mp4|gif$/i);
  });

  it('should login in gmail', () => {
    browser.url('https://mail.google.com');
    browser.$('//input[@id="identifierId"]').setValue('lt364226@gmail.com');
    browser.$('//div[@class="VfPpkd-RLmnJb"]').click();
    browser.waitUntil( () => browser.$('//div[@id="profileIdentifier"]').isDisplayed());
    //browser.$('//h1//span')
    browser.$('//input[@class="whsOnd zHQkBf"]').setValue('lt112233');
    browser.$('//div[@class="VfPpkd-RLmnJb"]').click();
    browser.waitUntil( () => browser.$('//img[@class="gb_va"]').isDisplayed());
  });

  it('should create letter in gmail account', () => {
    browser.$('//div[@class="T-I T-I-KE L3"]').click();
    browser.$('//textarea[@id=":8y"]').setValue(userEmail);
    browser.$('//div[@id=":9l"]').setValue(catImage + "\n" + dogImage + "\n" + foxImage);
    browser.$('//div[@id=":86"]').click();
    browser.waitUntil( () => browser.$('//span[@class="bAq"]').isDisplayed());

  });

});
