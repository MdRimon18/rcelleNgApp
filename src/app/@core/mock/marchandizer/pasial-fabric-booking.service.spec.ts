import { TestBed } from '@angular/core/testing';

import { PasialFabricBookingService } from './pasial-fabric-booking.service';

describe('PasialFabricBookingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasialFabricBookingService = TestBed.get(PasialFabricBookingService);
    expect(service).toBeTruthy();
  });
});
