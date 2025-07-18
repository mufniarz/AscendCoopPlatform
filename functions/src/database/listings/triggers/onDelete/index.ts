/**
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
// functions/src/database/listings/triggers/onDelete/index.ts

import {
  onDocumentDeleted,
  FirestoreEvent,
} from "firebase-functions/v2/firestore";
import {admin} from "../../../../utils/firebase";
import * as logger from "firebase-functions/logger";
import {QueryDocumentSnapshot} from "firebase-admin/firestore";

const db = admin.firestore();

// Trigger for listings onDelete
export const onDeleteListing = onDocumentDeleted(
  {document: "listings/{listingId}", region: "us-central1"},
  handleListingDelete,
);

/**
 * Handles the deletion of a listing document in Firestore.
 * When a listing is deleted, this function deletes all relatedListing
 * documents under all accounts that are linked to this listing.
 *
 * @param {FirestoreEvent<QueryDocumentSnapshot | undefined>} event - The event for the deleted listing document.
 * @return {Promise<void>} A promise that resolves when all relatedListings are deleted, or logs an error if it fails.
 */
async function handleListingDelete(
  event: FirestoreEvent<QueryDocumentSnapshot | undefined, {listingId: string}>,
) {
  const {listingId} = event.params;

  try {
    // Get all related accounts for this listing
    const relatedAccountsSnapshot = await db
      .collection("listings")
      .doc(listingId)
      .collection("relatedAccounts")
      .get();

    if (relatedAccountsSnapshot.empty) {
      logger.info(`No related accounts found for listing ${listingId}`);
      return;
    }

    const batch = db.batch();

    relatedAccountsSnapshot.forEach((doc) => {
      const accountId = doc.id;

      // Reference to the relatedListing in the account
      const relatedListingRef = db
        .collection("accounts")
        .doc(accountId)
        .collection("relatedListings")
        .doc(listingId);

      batch.delete(relatedListingRef);
    });

    // Commit the batch delete
    await batch.commit();

    logger.info(
      `Successfully deleted relatedListings for listing ${listingId} in all related accounts`,
    );
  } catch (error) {
    logger.error("Error in handleListingDelete:", error);
  }
}
