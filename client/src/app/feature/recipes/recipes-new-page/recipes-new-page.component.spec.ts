import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesNewPageComponent } from './recipes-new-page.component';

describe('RecipesNewPageComponent', () => {
  let component: RecipesNewPageComponent;
  let fixture: ComponentFixture<RecipesNewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesNewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
