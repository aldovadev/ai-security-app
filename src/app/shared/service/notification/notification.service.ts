import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';

@Injectable()
export class NotificationService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  showNotification(icon: string, color: string, message: string) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      NotificationComponent
    );
    const componentRef = factory.create(this.injector);
    componentRef.instance.toasterMessage = message;
    componentRef.instance.toasterIcon = icon;
    componentRef.instance.toasterColor = color;
    componentRef.instance.createBasicNotification();

    this.appRef.attachView(componentRef.hostView);

    document.body.appendChild(componentRef.location.nativeElement);

    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 100);
  }
}
