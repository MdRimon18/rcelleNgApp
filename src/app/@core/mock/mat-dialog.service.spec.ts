import { TestBed } from '@angular/core/testing';

import { MatDialogService } from './mat-dialog.service';

describe('MatDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatDialogService = TestBed.get(MatDialogService);
    expect(service).toBeTruthy();
  });
});
