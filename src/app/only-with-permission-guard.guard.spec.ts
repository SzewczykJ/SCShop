import { TestBed, async, inject } from '@angular/core/testing';

import { OnlyWithPermissionGuardGuard } from './only-with-permission-guard.guard';

describe('OnlyWithPermissionGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyWithPermissionGuardGuard]
    });
  });

  it('should ...', inject([OnlyWithPermissionGuardGuard], (guard: OnlyWithPermissionGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
