import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProductComponent } from './public-product.component';

describe('PublicProductComponent', () => {
  let component: PublicProductComponent;
  let fixture: ComponentFixture<PublicProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
