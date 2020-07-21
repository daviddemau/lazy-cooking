import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputFocusOnError]'
})
export class InputFocusOnErrorDirective {
  constructor(private el: ElementRef) {}

  @HostListener('submit')
  onFormSubmit() {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    if (invalidControl) {
      invalidControl.focus();
    }
  }
}
