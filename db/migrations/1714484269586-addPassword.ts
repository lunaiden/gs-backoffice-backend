import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPassword1714484269586 implements MigrationInterface {
    name = 'AddPassword1714484269586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
