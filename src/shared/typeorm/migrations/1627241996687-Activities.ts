import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class Activities1627241996687 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activities',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ]
      })
    );

    await queryRunner.addColumn('acitivities', new TableColumn({
      name: "employmentId",
      type: "varchar"
    }));

    await queryRunner.addColumn('acitivities', new TableColumn({
      name: "boardId",
      type: "varchar"
    }));


    await queryRunner.createForeignKey('acitivities', new TableForeignKey({
      columnNames: ['boardId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'boards',
      onDelete: "CASCADE",
    }));


    await queryRunner.createForeignKey('acitivities', new TableForeignKey({
      columnNames: ['employmentId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'employments',
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('acitivities');
    const fkBoard = table?.foreignKeys.find(fk => fk.columnNames.indexOf('boardId') !== -1);
    const fkEmployment = table?.foreignKeys.find(fk => fk.columnNames.indexOf('employmentId') !== -1);
    await queryRunner.dropForeignKey('acitivities', fkBoard as TableForeignKey);
    await queryRunner.dropForeignKey('acitivities', fkEmployment as TableForeignKey);
    await queryRunner.dropTable('acitivities')
  }

}
