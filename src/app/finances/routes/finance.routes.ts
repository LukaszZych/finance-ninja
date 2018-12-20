import {Routes} from '@angular/router';import {HistoryComponent} from '../containers/history/history.component';import {AuthGuard} from '../../authentication/guards/auth.guard';import {AddDataComponent} from '../containers/add-data/add-data.component';export const financeRoutes: Routes = [  { path: 'history', component: HistoryComponent, data: {translation_key: 'COMMON.HISTORY'}, canActivate: [AuthGuard] },  { path: 'add-data', component: AddDataComponent, data: {translation_key: 'COMMON.ADD_DATA'}, canActivate: [AuthGuard] }];