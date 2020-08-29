const {expect} = require('chai');
import axios from 'axios';

let userEmail;

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
});


/*
   axios({
      method: 'get',
      url: 'http://aws.random.cat/meow',
    })
      .then(res => res.data)
      .catch(err => err.response.data);

 */

