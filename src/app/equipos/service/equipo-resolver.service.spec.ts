import { TestBed } from '@angular/core/testing';

import { EquipoResolverService } from './equipo-resolver.service';

describe('EquipoResolverService', () => {
  let service: EquipoResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipoResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
