import { TestBed } from '@angular/core/testing';

import { UnidadeResolver } from './unidade.resolver';

describe('UnidadeResolver', () => {
  let resolver: UnidadeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UnidadeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
