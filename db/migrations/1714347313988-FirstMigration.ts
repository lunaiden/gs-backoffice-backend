import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1714347313988 implements MigrationInterface {
  name = 'FirstMigration1714347313988';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session_member_words" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "words" jsonb NOT NULL, CONSTRAINT "PK_a3dae5d52b3f2e951923e0a04e0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "line_1" character varying(255) NOT NULL, "line_2" character varying(255) NOT NULL, "zip_code" character varying(50) NOT NULL, "city" character varying(255) NOT NULL, "country" character varying(255) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "siren" character varying, "siret" character varying, "noTva" character varying, "isAutonomous" boolean NOT NULL DEFAULT false, "addressId" uuid, CONSTRAINT "REL_3737905699894299444476dd79" UNIQUE ("addressId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" integer NOT NULL, "name" character varying NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalFileName" character varying NOT NULL, "fileName" character varying NOT NULL, "fileUrl" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_expert" boolean NOT NULL DEFAULT false, "speech" character varying, "userId" uuid, "sessionId" uuid, "presentation_file" uuid, CONSTRAINT "REL_b7e546fc9758719e41f7e570dc" UNIQUE ("presentation_file"), CONSTRAINT "PK_d89c936c1022875dade62be24ec" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "last_name" character varying(50) NOT NULL, "first_name" character varying(50) NOT NULL, "phone" integer NOT NULL, "roleId" uuid, "addressId" uuid, "profile_picture" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_c28e52f758e7bbc53828db9219" UNIQUE ("roleId"), CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "REL_e1f9f3d423f600039f4a485d6b" UNIQUE ("profile_picture"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "result" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "sessionId" uuid, "fileId" uuid, CONSTRAINT "REL_e39ca5d9b9dd6c3ce012897ba6" UNIQUE ("fileId"), CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "graphic_charter" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "primary_color" character varying NOT NULL, "secondary_color" character varying NOT NULL, "companyId" uuid, CONSTRAINT "REL_9763c1ed8c96d2007ec97230ec" UNIQUE ("companyId"), CONSTRAINT "PK_c451036ddbf0ab534fa997344b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company_member" ("userId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_d198f671fc2d7c8fe8d4944d0ed" PRIMARY KEY ("userId", "companyId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3009db3b4315829bf43e1ea71" ON "company_member" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_24e3f0ad735ec89bb235a39554" ON "company_member" ("companyId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_3737905699894299444476dd79c" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_member" ADD CONSTRAINT "FK_32381c57f1eb522b6bc6f1b6fd1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_member" ADD CONSTRAINT "FK_dd72d5619f64609f8781c7f1a36" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_member" ADD CONSTRAINT "FK_b7e546fc9758719e41f7e570dce" FOREIGN KEY ("presentation_file") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_e1f9f3d423f600039f4a485d6b5" FOREIGN KEY ("profile_picture") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "result" ADD CONSTRAINT "FK_601be29c4bf75f59d0261f769ba" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "result" ADD CONSTRAINT "FK_30a5ac23f38627d1eb995bea902" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "result" ADD CONSTRAINT "FK_e39ca5d9b9dd6c3ce012897ba68" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "graphic_charter" ADD CONSTRAINT "FK_9763c1ed8c96d2007ec97230ec2" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_member" ADD CONSTRAINT "FK_c3009db3b4315829bf43e1ea711" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_member" ADD CONSTRAINT "FK_24e3f0ad735ec89bb235a395547" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company_member" DROP CONSTRAINT "FK_24e3f0ad735ec89bb235a395547"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company_member" DROP CONSTRAINT "FK_c3009db3b4315829bf43e1ea711"`,
    );
    await queryRunner.query(
      `ALTER TABLE "graphic_charter" DROP CONSTRAINT "FK_9763c1ed8c96d2007ec97230ec2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "result" DROP CONSTRAINT "FK_e39ca5d9b9dd6c3ce012897ba68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "result" DROP CONSTRAINT "FK_30a5ac23f38627d1eb995bea902"`,
    );
    await queryRunner.query(
      `ALTER TABLE "result" DROP CONSTRAINT "FK_601be29c4bf75f59d0261f769ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_e1f9f3d423f600039f4a485d6b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_member" DROP CONSTRAINT "FK_b7e546fc9758719e41f7e570dce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_member" DROP CONSTRAINT "FK_dd72d5619f64609f8781c7f1a36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session_member" DROP CONSTRAINT "FK_32381c57f1eb522b6bc6f1b6fd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_3737905699894299444476dd79c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_24e3f0ad735ec89bb235a39554"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c3009db3b4315829bf43e1ea71"`,
    );
    await queryRunner.query(`DROP TABLE "company_member"`);
    await queryRunner.query(`DROP TABLE "graphic_charter"`);
    await queryRunner.query(`DROP TABLE "result"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "session_member"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "session_member_words"`);
  }
}
