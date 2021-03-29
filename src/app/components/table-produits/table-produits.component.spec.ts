import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProduitsComponent } from './table-produits.component';

describe('TableProduitsComponent', () => {
  let component: TableProduitsComponent;
  let fixture: ComponentFixture<TableProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
