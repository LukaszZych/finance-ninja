import { TestBed, inject } from '@angular/core/testing';

import { FinancesService } from './finances.service';

describe('FinancesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinancesService]
    });
  });

  it('should be created', inject([FinancesService], (service: FinancesService) => {
    expect(service).toBeTruthy();
  }));
});
