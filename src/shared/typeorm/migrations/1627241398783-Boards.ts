import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class Boards1627241398783 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boards',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
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

    await queryRunner.addColumn('boards', new TableColumn({
      name: "projectId",
      type: "varchar"
    }));

    await queryRunner.createForeignKey('boards', new TableForeignKey({
      columnNames: ['projectId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'projects',
      onDelete: "CASCADE",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('employments');
    const fkProject = table?.foreignKeys.find(fk => fk.columnNames.indexOf('projectId') !== -1);
    await queryRunner.dropForeignKey('boards', fkProject as TableForeignKey);
    await queryRunner.dropTable('boards');
  }

}
