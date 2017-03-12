'use strict';

import { expect } from 'chai';
import jsdom from 'jsdom';
import path from 'path';
import fs from 'fs';

describe('Our first test', () => {
  it('Should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('Should say hello', (done) => {
    const index = fs.readFileSync(path.join('src', 'index.html'), 'utf-8');
    jsdom.env(index, (err, window) => {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal('Users');
      window.close();
      done();
    });
  });
});
