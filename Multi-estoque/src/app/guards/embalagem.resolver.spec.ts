import { TestBed } from '@angular/core/testing';

import { EmbalagemResolver } from './embalagem.resolver';

describe('EmbalagemResolver', () => {
  let resolver: EmbalagemResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EmbalagemResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
