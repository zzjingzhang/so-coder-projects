import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraffitiGenerator } from './graffiti-generator';

describe('GraffitiGenerator', () => {
  let component: GraffitiGenerator;
  let fixture: ComponentFixture<GraffitiGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraffitiGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(GraffitiGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
