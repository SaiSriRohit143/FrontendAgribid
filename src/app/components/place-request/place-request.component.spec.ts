import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceRequestComponent } from './place-request.component';

describe('PlaceRequestComponent', () => {
  let component: PlaceRequestComponent;
  let fixture: ComponentFixture<PlaceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
