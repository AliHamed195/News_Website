import { TestBed } from '@angular/core/testing';

import { HashTagsService } from './hash-tags.service';

describe('HashTagsService', () => {
  let service: HashTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
