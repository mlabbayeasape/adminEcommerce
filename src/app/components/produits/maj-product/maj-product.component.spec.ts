import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajProductComponent } from './maj-product.component';

describe('MajProductComponent', () => {
  let component: MajProductComponent;
  let fixture: ComponentFixture<MajProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
