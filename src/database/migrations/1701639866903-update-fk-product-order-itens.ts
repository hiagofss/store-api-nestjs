import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFkProductOrderItens1701639866903
  implements MigrationInterface
{
  name = 'UpdateFkProductOrderItens1701639866903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders_itens" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "orders_itens" ADD CONSTRAINT "FK_f413ef254e5dd8b13ece29501ed" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_itens" DROP CONSTRAINT "FK_f413ef254e5dd8b13ece29501ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders_itens" DROP COLUMN "productId"`,
    );
  }
}
