/***********************************************************************************************
* Nonprofit Social Networking Platform: Allowing Users and Organizations to Collaborate.
* Copyright (C) 2023  ASCENDynamics NFP
*
* This file is part of Nonprofit Social Networking Platform.
*
* Nonprofit Social Networking Platform is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as published
* by the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.

* Nonprofit Social Networking Platform is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Affero General Public License for more details.

* You should have received a copy of the GNU Affero General Public License
* along with Nonprofit Social Networking Platform.  If not, see <https://www.gnu.org/licenses/>.
***********************************************************************************************/
// src/app/state/reducers/index.ts

import {ActionReducerMap} from "@ngrx/store";
import {authReducer} from "./auth.reducer";
import {accountReducer} from "./account.reducer";
import {listingsReducer} from "./listings.reducer";
import {projectsReducer} from "./projects.reducer";
import {timeTrackingReducer} from "./time-tracking.reducer";
import {AppState} from "../app.state";

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  accounts: accountReducer,
  listings: listingsReducer,
  projects: projectsReducer,
  timeTracking: timeTrackingReducer,
};
