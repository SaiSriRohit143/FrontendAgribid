import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderHomeComponent } from './bidder-home.component';

describe('BidderHomeComponent', () => {
  let component: BidderHomeComponent;
  let fixture: ComponentFixture<BidderHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidderHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidderHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
