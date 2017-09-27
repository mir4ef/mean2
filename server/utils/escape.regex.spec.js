/* eslint-env jasmine */

'use strict';

const regex = require('./escape.regex').escapeRegExp;

describe('Escape Special Characters', () => {
  it('should return the original string', () => {
    expect(regex('random string')).toEqual('random string');
  });

  it('should escape . character', () => {
    expect(regex('random .string')).toEqual('random \\.string');
  });

  it('should escape * character', () => {
    expect(regex('random *string')).toEqual('random \\*string');
  });

  it('should escape + character', () => {
    expect(regex('random +string')).toEqual('random \\+string');
  });

  it('should escape ? character', () => {
    expect(regex('random ?string')).toEqual('random \\?string');
  });

  it('should escape ^ character', () => {
    expect(regex('random ^string')).toEqual('random \\^string');
  });

  it('should escape = character', () => {
    expect(regex('random =string')).toEqual('random \\=string');
  });

  it('should escape ! character', () => {
    expect(regex('random !string')).toEqual('random \\!string');
  });

  it('should escape : character', () => {
    expect(regex('random :string')).toEqual('random \\:string');
  });

  it('should escape $ character', () => {
    expect(regex('random $string')).toEqual('random \\$string');
  });

  it('should escape { character', () => {
    expect(regex('random {string')).toEqual('random \\{string');
  });

  it('should escape } character', () => {
    expect(regex('random }string')).toEqual('random \\}string');
  });

  it('should escape ( character', () => {
    expect(regex('random (string')).toEqual('random \\(string');
  });

  it('should escape ) character', () => {
    expect(regex('random )string')).toEqual('random \\)string');
  });

  it('should escape | character', () => {
    expect(regex('random |string')).toEqual('random \\|string');
  });

  it('should escape [ character', () => {
    expect(regex('random [string')).toEqual('random \\[string');
  });

  it('should escape ] character', () => {
    expect(regex('random ]string')).toEqual('random \\]string');
  });

  it('should escape [ character', () => {
    expect(regex('random [string')).toEqual('random \\[string');
  });
});
