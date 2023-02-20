import { TestBed } from '@angular/core/testing';

import { EmbalagemService } from './embalagem.service';

describe('EmbalagemService', () => {
  let service: EmbalagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbalagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
