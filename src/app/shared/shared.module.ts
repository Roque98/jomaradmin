import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';

const components = [LoadingComponent];

@NgModule({
  declarations: components,
  imports: [CommonModule, RouterModule],
  exports: components,
})
export class SharedModule {}
