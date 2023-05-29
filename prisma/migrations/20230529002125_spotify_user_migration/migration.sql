-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "spotifyID" INTEGER NOT NULL,
    "display_name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "uri" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SpotifyURL" (
    "spotify" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "SpotifyURL_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SpotiFyImages" (
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "SpotiFyImages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_spotifyID_key" ON "User"("spotifyID");

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyURL_userId_key" ON "SpotifyURL"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SpotiFyImages_userId_key" ON "SpotiFyImages"("userId");
