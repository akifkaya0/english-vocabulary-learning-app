import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { delay, timeout, timer } from 'rxjs';

@Directive({
  selector: '[appMouseEnterDt]'
})
export class MouseEnterDtDirective {

  constructor(private el: ElementRef) { }


  @HostListener('click') onClick() {

    timer(100).subscribe(() => {

        this.el.nativeElement.classList.remove('height80');
        this.el.nativeElement.classList.add('flip');
        this.el.nativeElement.classList.add('height200');
    })


  }

  @HostListener('mouseleave') onMouseLeave() {
    timer(300).subscribe(() => {
      var elements = [... this.el.nativeElement.classList]
      if(elements.indexOf('height200') != -1)
      this.el.nativeElement.classList.add('height80');

      this.el.nativeElement.classList.remove('height200');
      this.el.nativeElement.classList.remove('flip');

    })

  }

}
