import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { EditNotaPageRoutingModule } from './edit-nota-routing.module';

import { EditNotaPage } from './edit-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditNotaPageRoutingModule
  ],
  declarations: [EditNotaPage]
})
export class EditNotaPageModule {}
