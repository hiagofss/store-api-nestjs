import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTypeAmountOrderAndOrderItem1701638980893
  implements MigrationInterface
{
  name = 'UpdateTypeAmountOrderAndOrderItem1701638980893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_itens" DROP COLUMN "sale_amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_itens" ADD "sale_amount" numeric NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" numeric NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "amount"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "amount" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_itens" DROP COLUMN "sale_amount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_itens" ADD "sale_amount" integer NOT NULL`,
    );
  }
}
