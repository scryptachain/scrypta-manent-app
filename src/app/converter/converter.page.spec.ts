import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterPage } from './converter.page';

describe('ConverterPage', () => {
  let component: ConverterPage;
  let fixture: ComponentFixture<ConverterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConverterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
