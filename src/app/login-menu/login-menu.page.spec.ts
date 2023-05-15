import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginMenuPage } from './login-menu.page';

describe('LoginMenuPage', () => {
  let component: LoginMenuPage;
  let fixture: ComponentFixture<LoginMenuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
