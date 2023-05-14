import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CongratulationPage } from './congratulation.page';

describe('CongratulationPage', () => {
  let component: CongratulationPage;
  let fixture: ComponentFixture<CongratulationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CongratulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
