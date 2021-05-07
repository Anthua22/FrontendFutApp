import { TestBed } from '@angular/core/testing';

import { PartidosDetailService } from './partidos-detail.service';

describe('PartidosDetailService', () => {
  let service: PartidosDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartidosDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
