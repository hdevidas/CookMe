import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeShortComponent } from './recipe-short.component';

describe('RecipeShortComponent', () => {
  let component: RecipeShortComponent;
  let fixture: ComponentFixture<RecipeShortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeShortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
