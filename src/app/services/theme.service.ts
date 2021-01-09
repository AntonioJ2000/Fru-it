import { DOCUMENT } from '@angular/common';
import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) { 
    this.renderer = this.rendererFactory.createRenderer(null,null);
  }

  enableLight(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'default-theme');
  }

  enableDark(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'dark-theme');
  } 

  enableRed(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'red-theme');
  }

  enablePink(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'pink-theme');
  }

  enableBlue(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'blue-theme');
  }

  enableOrange(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'orange-theme');
  }

  enableYellow(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'yellow-theme');
  }

  enableGreen(){
    this.removeAll();
    this.renderer.addClass(this.document.body, 'green-theme');
  }

  setThemeOnInit(tema:string){
    this.removeAll();
    this.renderer.addClass(this.document.body, tema);
  }

  removeAll(){
    this.renderer.removeClass(this.document.body, 'dark-theme');
    this.renderer.removeClass(this.document.body, 'red-theme');
    this.renderer.removeClass(this.document.body, 'pink-theme');
    this.renderer.removeClass(this.document.body, 'blue-theme');
    this.renderer.removeClass(this.document.body, 'orange-theme');
    this.renderer.removeClass(this.document.body, 'yellow-theme');
    this.renderer.removeClass(this.document.body, 'green-theme');
  }


}
