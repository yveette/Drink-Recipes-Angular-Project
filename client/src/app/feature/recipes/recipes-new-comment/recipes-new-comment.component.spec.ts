import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesNewCommentComponent } from './recipes-new-comment.component';

describe('RecipesNewCommentComponent', () => {
  let component: RecipesNewCommentComponent;
  let fixture: ComponentFixture<RecipesNewCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesNewCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesNewCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
