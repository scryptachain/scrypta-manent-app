import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTransactionsDetailPage } from './account-transactions-detail.page';

describe('AccountTransactionsDetailPage', () => {
  let component: AccountTransactionsDetailPage;
  let fixture: ComponentFixture<AccountTransactionsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTransactionsDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTransactionsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
