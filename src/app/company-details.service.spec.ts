import { TestBed } from '@angular/core/testing';

import { CompanyDetailsService } from './services/company-details.service';

describe('CompanyDetailsService', () => {
  let service: CompanyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
