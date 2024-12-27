import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldhistoryComponent } from './soldhistory.component';

describe('SoldhistoryComponent', () => {
  let component: SoldhistoryComponent;
  let fixture: ComponentFixture<SoldhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoldhistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
