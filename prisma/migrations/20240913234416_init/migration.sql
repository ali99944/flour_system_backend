-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "shop_name" TEXT NOT NULL,
    "debt_balance" REAL NOT NULL DEFAULT 0.0,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "deleted_at" TEXT
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "paid_at" TEXT NOT NULL,
    "note" TEXT,
    "client_id" INTEGER NOT NULL,
    "sale_id" INTEGER,
    CONSTRAINT "Payment_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "deleted_at" TEXT
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total_amount" REAL NOT NULL,
    "reason" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TEXT NOT NULL,
    "sale_id" INTEGER,
    "deleted_at" TEXT,
    CONSTRAINT "Expense_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total_charge" REAL NOT NULL,
    "notes" TEXT,
    "created_at" TEXT NOT NULL,
    "previous_client_debt" REAL NOT NULL,
    "new_client_debt" REAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    CONSTRAINT "Sale_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StorageOut" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "client_price" REAL NOT NULL,
    "total_client_charge" REAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "sale_id" INTEGER,
    "flour_id" INTEGER NOT NULL,
    "storage_in_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "income_id" INTEGER,
    CONSTRAINT "StorageOut_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StorageOut_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "StorageOut_flour_id_fkey" FOREIGN KEY ("flour_id") REFERENCES "Flour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StorageOut_storage_in_id_fkey" FOREIGN KEY ("storage_in_id") REFERENCES "StorageIn" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StorageOut_income_id_fkey" FOREIGN KEY ("income_id") REFERENCES "Income" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StorageIn" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "flour_id" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "unit_purchase_price" REAL NOT NULL,
    "total_purchase_price" REAL NOT NULL,
    "created_at" TEXT NOT NULL,
    CONSTRAINT "StorageIn_flour_id_fkey" FOREIGN KEY ("flour_id") REFERENCES "Flour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FlourPackage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stock" INTEGER NOT NULL,
    "package_number" INTEGER NOT NULL,
    "flour_id" INTEGER NOT NULL,
    "unit_purchase_price" REAL NOT NULL,
    "created_at" TEXT NOT NULL,
    "storage_in_id" INTEGER NOT NULL,
    CONSTRAINT "FlourPackage_flour_id_fkey" FOREIGN KEY ("flour_id") REFERENCES "Flour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FlourPackage_storage_in_id_fkey" FOREIGN KEY ("storage_in_id") REFERENCES "StorageIn" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Flour" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sale_id" INTEGER NOT NULL,
    "flour_id" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "profit" REAL NOT NULL,
    CONSTRAINT "Income_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Income_flour_id_fkey" FOREIGN KEY ("flour_id") REFERENCES "Flour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "linked_email" TEXT NOT NULL,
    "created_at" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "report_name" TEXT NOT NULL,
    "report_month" TEXT NOT NULL,
    "report_file" TEXT NOT NULL,
    "created_at" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_sale_id_key" ON "Payment"("sale_id");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_sale_id_key" ON "Expense"("sale_id");

-- CreateIndex
CREATE UNIQUE INDEX "FlourPackage_storage_in_id_key" ON "FlourPackage"("storage_in_id");

-- CreateIndex
CREATE UNIQUE INDEX "Income_sale_id_key" ON "Income"("sale_id");
