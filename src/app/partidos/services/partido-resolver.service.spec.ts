import { TestBed } from '@angular/core/testing';

import { PartidoResolverService } from './partido-resolver.service';

describe('PartidoResolverService', () => {
  let service: PartidoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
