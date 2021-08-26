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

    await queryRunner.addColumn('activities', new TableColumn({
      name: "employmentId",
      type: "varchar"
    }));

    await queryRunner.addColumn('activities', new TableColumn({
      name: "boardId",
      type: "varchar"
    }));


    await queryRunner.createForeignKey('activities', new TableForeignKey({
      columnNames: ['boardId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'boards',
      onDelete: "CASCADE",
    }));


    await queryRunner.createForeignKey('activities', new TableForeignKey({
      columnNames: ['employmentId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'employments',
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('activities');
    const fkBoard = table?.foreignKeys.find(fk => fk.columnNames.indexOf('boardId') !== -1);
    const fkEmployment = table?.foreignKeys.find(fk => fk.columnNames.indexOf('employmentId') !== -1);
    await queryRunner.dropForeignKey('activities', fkBoard as TableForeignKey);
    await queryRunner.dropForeignKey('activities', fkEmployment as TableForeignKey);
    await queryRunner.dropTable('activities')
  }

}
