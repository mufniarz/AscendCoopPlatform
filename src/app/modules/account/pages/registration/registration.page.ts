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
import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {GroupRegistrationComponent} from "./components/group-registration/group-registration.component";
import {UserRegistrationComponent} from "./components/user-registration/user-registration.component";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService} from "../../../../core/services/store.service";
import {Account} from "../../../../models/account.model";
import {AppHeaderComponent} from "../../../../shared/components/app-header/app-header.component";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.page.html",
  styleUrls: ["./registration.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppHeaderComponent,
    GroupRegistrationComponent,
    UserRegistrationComponent,
  ],
})
export class RegistrationPage {
  private accountsSubscription?: Subscription;
  public accountId: string | null = null;
  account?: Partial<Account>;
  public selectedType: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
  ) {
    this.accountId = this.route.snapshot.paramMap.get("accountId");
  }

  ionViewWillEnter() {
    this.initiateSubscribers();
  }

  ionViewWillLeave() {
    this.accountsSubscription?.unsubscribe();
  }

  initiateSubscribers() {
    this.accountsSubscription = this.storeService.accounts$.subscribe(
      (accounts) => {
        if (!this.accountId) return;
        this.account = accounts.find(
          (account) => account.id === this.accountId,
        );
        if (!this.account) {
          this.storeService.getDocById("accounts", this.accountId); // get and add doc to store
        } else if (this.account?.type) {
          this.router.navigate([`/${this.accountId}`]);
        }
      },
    );
  }

  selectType(type: string) {
    this.selectedType = type;
  }
}
