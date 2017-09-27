import { throwIfAlreadyLoaded } from './module-import-guard';

describe('Module Import Guard', () => {
  it('should throw an error if module is loaded', () => {
    const fn = () => throwIfAlreadyLoaded('parentModule', 'myModule');

    expect(fn).toThrow(new Error(`myModule has already been loaded. Import myModule modules in the AppModule only.`));
  });

  it('should not throw an error if module is not loaded', () => {
    const fn = () => throwIfAlreadyLoaded(null, 'myModule');

    expect(fn).not.toThrow();
  });
});
