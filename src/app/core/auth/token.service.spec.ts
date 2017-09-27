import { inject, TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('Token Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TokenService ],
    });
  });

  beforeEach(() => {
    // reset the token before each unit test
    const tokenService = TestBed.get(TokenService);
    tokenService.token = '';
  });

  afterAll(() => {
    // reset the token after done with this unit test
    const tokenService = TestBed.get(TokenService);
    tokenService.token = '';
  });

  it('should be null when initialized',
    inject([ TokenService ], (tokenService: TokenService) => {
      expect(tokenService.token).toBeNull();
    }),
  );

  it('should save a passed token',
    inject([ TokenService ], (tokenService: TokenService) => {
      const token = 'token string';
      tokenService.token = token;

      expect(tokenService.token).toEqual(token);
    }),
  );

  it('should delete a saved token',
    inject([ TokenService ], (tokenService: TokenService) => {
      const token = 'token string';
      tokenService.token = token;

      expect(tokenService.token).toEqual(token);

      tokenService.token = '';

      expect(tokenService.token).toBeNull();
    }),
  );
});
