import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestResultPage } from './test-result.page';

describe('TestResultPage', () => {
  let component: TestResultPage;
  let fixture: ComponentFixture<TestResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
