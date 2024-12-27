import { TestBed } from '@angular/core/testing';

import { AuthenticationBService } from './authentication-b.service';

describe('AuthenticationBService', () => {
  let service: AuthenticationBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
