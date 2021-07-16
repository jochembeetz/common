import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Platform } from '@ionic/angular';

export type PlatformType =
  | 'ios'
  | 'ipad'
  | 'iphone'
  | 'android'
  | 'phablet'
  | 'tablet'
  | 'cordova'
  | 'capacitor'
  | 'electron'
  | 'pwa'
  | 'mobile'
  | 'mobileweb'
  | 'desktop'
  | 'hybrid';

@Directive({
  selector: '[ifPlatformIs]',
})
export class IfPlatformIsDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private platform: Platform
  ) {}

  @Input() ifPlatformIs: PlatformType | Array<PlatformType>;
  @Input() ifPlatformIsElse: TemplateRef<any>;

  ngOnInit(): void {
    if (!Array.isArray(this.ifPlatformIs))
      this.ifPlatformIs = [this.ifPlatformIs];

    if (this.inputMatchesCurrentPlatform(this.ifPlatformIs)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.ifPlatformIsElse
        ? this.viewContainer.createEmbeddedView(this.ifPlatformIsElse)
        : this.viewContainer.clear();
    }
  }

  inputMatchesCurrentPlatform(inputValue: PlatformType[]) {
    return !!(this.platform.platforms() as PlatformType[]).filter(
      (platform) => inputValue.indexOf(platform) != -1
    ).length;
  }
}
