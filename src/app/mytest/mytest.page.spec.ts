import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MytestPage } from './mytest.page';

describe('MytestPage', () => {
  let component: MytestPage;
  let fixture: ComponentFixture<MytestPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MytestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
