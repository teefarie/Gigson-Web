import {Directive, ElementRef, HostListener, OnInit, Renderer} from "@angular/core";
import {WindowRefService} from "../services/window.service";

@Directive({
  selector: '[stick]'
})


export class StickDirective implements OnInit {
  private _window: Window;
  private _offset: number;
  private _offsetWidth: number;

  constructor(private _element: ElementRef, private _windowRef: WindowRefService, public renderer: Renderer) {

  }

  ngOnInit() {
    this._offset = this._element.nativeElement.parentElement.offsetTop - this._element.nativeElement.offsetHeight;
    this._offsetWidth = this._element.nativeElement.offsetWidth;

    this._window = this._windowRef.nativeWindow;
  };

  @HostListener('window:scroll', ['$event'])
  handleScrollEvent(e) {
    this._window.addEventListener('scroll', (e) => {
      if (this._window.pageYOffset >= this._offset) {
        // this._element.nativeElement.classList.add('stick');
        // this.renderer.setElementStyle(this._element.nativeElement, 'width', this._offsetWidth + 'px');
      } else {
        // this._element.nativeElement.classList.remove('stick');
      }
    });
  }
}
