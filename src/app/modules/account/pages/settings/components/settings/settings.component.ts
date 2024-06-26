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
import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {StoreService} from "../../../../../../core/services/store.service";
import {User} from "firebase/auth";
import {Account} from "../../../../../../models/account.model";

@Component({
  selector: "app-settings-form",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, TranslateModule],
})
export class SettingsComponent implements OnChanges {
  @Input() authUser?: User | null;
  @Input() account?: Partial<Account>;
  @Output() languageChange = new EventEmitter<string>();

  settingsForm = this.fb.group({
    privacy: ["public", Validators.required],
    language: ["en"],
  });

  languageList = [
    {code: "en", name: "english", text: "English"},
    {code: "fr", name: "french", text: "Français"},
  ];

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private translateService: TranslateService,
  ) {}

  ngOnChanges() {
    this.loadFormData();
  }

  onLanguageChange() {
    const lang = this.settingsForm.value.language ?? "en";
    this.translateService.use(lang);
    this.languageChange.emit(lang);
  }

  updateSetting() {
    if (this.authUser?.uid) {
      this.storeService.updateDoc("accounts", {
        id: this.authUser?.uid,
        privacy: this.settingsForm.value.privacy,
        accessibility: {preferredLanguage: this.settingsForm.value.language},
      });
    }
  }

  loadFormData() {
    if (!this.account) return;
    // Update the form with the account data
    this.settingsForm.patchValue({
      privacy: this.account.privacy,
      language: this.account.accessibility?.preferredLanguage ?? "en",
    });
  }

  toggleDarkTheme(event: CustomEvent) {
    const isDarkModeEnabled = event.detail.checked;
    document.body.classList.toggle("dark", isDarkModeEnabled);
  }
}
