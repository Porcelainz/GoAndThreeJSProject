-- CreateTable
CREATE TABLE "Object" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "position_z" INTEGER NOT NULL,
    "quadrant" INTEGER NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "naam" TEXT NOT NULL,
    "leeftijd" INTEGER NOT NULL,
    "adres" TEXT NOT NULL,
    "telefoon" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);
