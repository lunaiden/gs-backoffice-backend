import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDatesFields1714942679284 implements MigrationInterface {
    name = 'AddDatesFields1714942679284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "address" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "file" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "file" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "company" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "company" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "session_member" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastLogin" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "result" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "result" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "session" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "session" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "startDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "endDate" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "endDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "startDate" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "result" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "result" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastLogin"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "session_member" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "created_at"`);
    }

}
