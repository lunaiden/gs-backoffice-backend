import { MigrationInterface, QueryRunner } from "typeorm";

export class SnakeCaseEntitiesProperties1715209092854 implements MigrationInterface {
    name = 'SnakeCaseEntitiesProperties1715209092854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_3737905699894299444476dd79c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP CONSTRAINT "FK_32381c57f1eb522b6bc6f1b6fd1"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP CONSTRAINT "FK_dd72d5619f64609f8781c7f1a36"`);
        await queryRunner.query(`ALTER TABLE "graphic_charter" DROP CONSTRAINT "FK_9763c1ed8c96d2007ec97230ec2"`);
        await queryRunner.query(`ALTER TABLE "graphic_charter" RENAME COLUMN "companyId" TO "company_id"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "originalFileName"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "fileName"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "fileUrl"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "noTva"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "REL_3737905699894299444476dd79"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "file" ADD "original_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file" ADD "file_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file" ADD "file_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "no_tva" character varying`);
        await queryRunner.query(`ALTER TABLE "company" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_1333bb935c62afe403dd22e5372" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "session" ADD "start_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "end_date" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "last_login" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_302d96673413455481d5ff4022a" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD "session_id" uuid`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line_2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_1333bb935c62afe403dd22e5372" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_302d96673413455481d5ff4022a" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD CONSTRAINT "FK_66df6e8d2577e3b54c13b071aec" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD CONSTRAINT "FK_4e1ab3dc8344cf788a6a69dd374" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "graphic_charter" ADD CONSTRAINT "FK_934a6ae709bf235c1d8e4e2db93" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "graphic_charter" DROP CONSTRAINT "FK_934a6ae709bf235c1d8e4e2db93"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP CONSTRAINT "FK_4e1ab3dc8344cf788a6a69dd374"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP CONSTRAINT "FK_66df6e8d2577e3b54c13b071aec"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_1333bb935c62afe403dd22e5372"`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "line_2" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP COLUMN "session_id"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_302d96673413455481d5ff4022a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_login"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "end_date"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_1333bb935c62afe403dd22e5372"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "no_tva"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "file_url"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "file_name"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "original_name"`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD "sessionId" uuid`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "session" ADD "endDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "startDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "REL_3737905699894299444476dd79" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "company" ADD "noTva" character varying`);
        await queryRunner.query(`ALTER TABLE "file" ADD "fileUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file" ADD "fileName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file" ADD "originalFileName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "graphic_charter" RENAME COLUMN "company_id" TO "companyId"`);
        await queryRunner.query(`ALTER TABLE "graphic_charter" ADD CONSTRAINT "FK_9763c1ed8c96d2007ec97230ec2" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD CONSTRAINT "FK_dd72d5619f64609f8781c7f1a36" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD CONSTRAINT "FK_32381c57f1eb522b6bc6f1b6fd1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_3737905699894299444476dd79c" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
