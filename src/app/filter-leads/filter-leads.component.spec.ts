import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLeadsComponent } from './filter-leads.component';

describe('FilterLeadsComponent', () => {
  let component: FilterLeadsComponent;
  let fixture: ComponentFixture<FilterLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterLeadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
