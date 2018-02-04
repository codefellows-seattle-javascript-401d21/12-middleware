'use strict';

let Quote = require('../../model/quote');

let testQuote;
new Quote('Test Author', 'Test Quote')
  .then(quote => testQuote = quote);

describe('Quote', () => {
  describe('#constructor', () => {
    describe('Valid', () => {
      it('should return a valid quote object', () => {
        expect(testQuote).toBeInstanceOf(Quote);
      });

      it('should return an object with the correct properties', () => {
        expect(testQuote).toHaveProperty('quote');
        expect(testQuote).toHaveProperty('author');
        expect(testQuote).toHaveProperty('_id');
      });

      it('The quote should have correct values', () => {
        expect(testQuote.quote).toBe('Test Quote');
        expect(testQuote.author).toBe('Test Author');
      });
    });
    describe('Invalid', () => {
      it('should throw an error if quote is falsey', () => {
        new Quote('Todd')
          .catch(err => expect(err).toBeInstanceOf(Error));
      });

      it('should throw an error if both args are falsey', () => {
        new Quote()
          .catch(err => expect(err).toBeInstanceOf(Error));
      });
    });
  });
});
