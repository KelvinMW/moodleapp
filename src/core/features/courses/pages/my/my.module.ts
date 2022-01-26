// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Injector, NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';

import { CoreSharedModule } from '@/core/shared.module';
import { CoreBlockComponentsModule } from '@features/block/components/components.module';

import { CoreCoursesMyCoursesPage } from './my';
import { CoreMainMenuComponentsModule } from '@features/mainmenu/components/components.module';
import { buildTabMainRoutes } from '@features/mainmenu/mainmenu-tab-routing.module';
import { CoreCoursesMyCoursesMainMenuHandlerService } from '@features/courses/services/handlers/my-courses-mainmenu';

function buildRoutes(injector: Injector): Routes {
    return [
        {
            path: '',
            component: CoreCoursesMyCoursesPage,
            data: {
                mainMenuTabRoot: CoreCoursesMyCoursesMainMenuHandlerService.PAGE_NAME,
            },
        },
        {
            path: 'list',
            loadChildren: () =>
                import('../list/list.module')
                    .then(m => m.CoreCoursesListPageModule),
        },
        ...buildTabMainRoutes(injector, {
            redirectTo: '',
            pathMatch: 'full',
        }),
    ];
}

@NgModule({
    imports: [
        CoreSharedModule,
        CoreBlockComponentsModule,
        CoreMainMenuComponentsModule,
    ],
    providers: [
        {
            provide: ROUTES,
            multi: true,
            deps: [Injector],
            useFactory: buildRoutes,
        },
    ],
    declarations: [
        CoreCoursesMyCoursesPage,
    ],
    exports: [RouterModule],
})
export class CoreCoursesMyCoursesPageModule { }
