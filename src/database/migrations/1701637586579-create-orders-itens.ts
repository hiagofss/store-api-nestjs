import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersItens1701637586579 implements MigrationInterface {
  name = 'CreateOrdersItens1701637586579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders_itens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "sale_amount" integer NOT NULL, "orderId" uuid, CONSTRAINT "PK_65f4dbf4eff225e86a1e495ef3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_itens" ADD CONSTRAINT "FK_639e039483ea6795625ebdf922b" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_itens" DROP CONSTRAINT "FK_639e039483ea6795625ebdf922b"`,
    );
    await queryRunner.query(`DROP TABLE "orders_itens"`);
  }
}
