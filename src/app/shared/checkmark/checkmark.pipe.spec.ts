import { CheckmarkPipe } from './checkmark.pipe';

describe('CheckmarkPipe', () => {
  const pipe = new CheckmarkPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert boolean values to unicode checkmark or cross', () => {
    expect(pipe.transform(true)).toBe('\u2713');
    expect(pipe.transform(false)).toBe('\u2718');
  });

  it('should convert boolean as a string values to unicode checkmark or cross', () => {
    expect(pipe.transform('true')).toBe('\u2713');
    expect(pipe.transform('false')).toBe('\u2718');
  });

  it('should return the original value if anything other than a boolean or boolean as a string is passed', () => {
    expect(pipe.transform('random string')).toBe('random string');
  });
});
