-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "create_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_view_date" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
