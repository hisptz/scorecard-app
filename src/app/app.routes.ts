import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './pages';
import { CreateModule} from './pages/create/create.module';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
   loadChildren: () => import('./pages/create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'view',
   loadChildren: () => import('./pages/view/view.module').then(m => m.ViewModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
