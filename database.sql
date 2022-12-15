CREATE TABLE "public.Users" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(100) NOT NULL,
	"accountId" integer(100) NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Accounts" (
	"id" serial NOT NULL,
	"balance" FLOAT NOT NULL,
	CONSTRAINT "Accounts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.Transactions" (
	"id" serial NOT NULL,
	"debitedAccount" integer NOT NULL,
	"creditedAccount" integer NOT NULL,
	"value" FLOAT NOT NULL,
	"createdAt" DATE NOT NULL,
	CONSTRAINT "Transactions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "public.Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("accountId") REFERENCES "public.Accounts"("id");


ALTER TABLE "public.Transactions" ADD CONSTRAINT "Transactions_fk0" FOREIGN KEY ("debitedAccount") REFERENCES "public.Accounts"("id");
ALTER TABLE "public.Transactions" ADD CONSTRAINT "Transactions_fk1" FOREIGN KEY ("creditedAccount") REFERENCES "public.Accounts"("id");




