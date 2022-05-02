import { TestBed } from '@angular/core/testing';

import { GroceryServiceService } from './grocery-service.service';

describe('GroceryServiceService', () => {
  let service: GroceryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
