import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderLoginComponent } from './bidder-login.component';

describe('BidderLoginComponent', () => {
  let component: BidderLoginComponent;
  let fixture: ComponentFixture<BidderLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BidderLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
