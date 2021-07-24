import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/app.state';
import { articlesActions } from './pages/articles/ngrx/articles.actions';
import { pageActions } from './pages/page.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private store: Store<AppState>
  ){
    this.store.dispatch(pageActions.loadData())
  }
}
