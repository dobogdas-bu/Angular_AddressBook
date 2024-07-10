import { TestBed } from '@angular/core/testing';

import { MqServiceService } from './mq-service.service';

describe('MqServiceService', () => {
  let service: MqServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
