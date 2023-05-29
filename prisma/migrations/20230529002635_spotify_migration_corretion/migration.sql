-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "spotifyID" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "uri" TEXT NOT NULL
);
INSERT INTO "new_User" ("display_name", "href", "id", "spotifyID", "uri") SELECT "display_name", "href", "id", "spotifyID", "uri" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_spotifyID_key" ON "User"("spotifyID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
