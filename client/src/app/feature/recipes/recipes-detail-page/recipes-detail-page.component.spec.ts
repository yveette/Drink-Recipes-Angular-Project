import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesDetailPageComponent } from './recipes-detail-page.component';

describe('RecipesDetailPageComponent', () => {
  let component: RecipesDetailPageComponent;
  let fixture: ComponentFixture<RecipesDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
