import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserRole1714694304170 implements MigrationInterface {
    name = 'UpdateUserRole1714694304170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "logo" uuid`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_8a5e6cae506a84938c23aa09a5d" UNIQUE ("logo")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "REL_c28e52f758e7bbc53828db9219"`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_8a5e6cae506a84938c23aa09a5d" FOREIGN KEY ("logo") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_8a5e6cae506a84938c23aa09a5d"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "REL_c28e52f758e7bbc53828db9219" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_8a5e6cae506a84938c23aa09a5d"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "logo"`);
    }

}
