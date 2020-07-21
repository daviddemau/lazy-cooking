import { Directive, HostBinding, HostListener, } from '@angular/core';

@Directive({
  selector: `[appToggleActive]`
})
export class ToggleActiveDirective {
  constructor() { }

  @HostBinding('class.active') isActive = false;
  @HostListener('click') toggleActive() {
    this.isActive = !this.isActive;
  }
}
