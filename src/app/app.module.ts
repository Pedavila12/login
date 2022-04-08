import { Task } from './tasks/models/task.model';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from './core/core.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksItemComponent } from './tasks/components/tasks-item/tasks-item.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, AppRoutingModule, IonicModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
