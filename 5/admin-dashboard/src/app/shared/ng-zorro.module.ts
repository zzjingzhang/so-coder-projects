import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  SettingOutline,
  UserOutline,
  TeamOutline,
  FormOutline,
  BellOutline,
  SearchOutline,
  MoreOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  SettingOutline,
  UserOutline,
  TeamOutline,
  FormOutline,
  BellOutline,
  SearchOutline,
  MoreOutline,
];

@NgModule({
  imports: [
    NzButtonModule,
    NzLayoutModule,
    NzIconModule.forRoot(icons),
    NzMenuModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    NzDropDownModule,
  ],
  exports: [
    NzButtonModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzTagModule,
    NzDividerModule,
    NzDropDownModule,
  ],
})
export class NgZorroModule {}
