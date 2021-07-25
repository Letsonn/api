import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class Employments1627237899954 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['manager', 'administrator', 'collaborator', 'reader'],
            isNullable: false
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

    await queryRunner.addColumn('employments', new TableColumn({
      name: "userId",
      type: "varchar"
    }));

    await queryRunner.addColumn('employments', new TableColumn({
      name: "projectId",
      type: "varchar"
    }));

    await queryRunner.createForeignKey('employments', new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: "CASCADE",
    }));

    await queryRunner.createForeignKey('employments', new TableForeignKey({
      columnNames: ['projectId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'projects',
      onDelete: "CASCADE",
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('employments');
    const fkUser = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    const fkProject = table?.foreignKeys.find(fk => fk.columnNames.indexOf('projectId') !== -1);
    await queryRunner.dropForeignKey('employments', fkUser as TableForeignKey);
    await queryRunner.dropForeignKey('employments', fkProject as TableForeignKey);
    await queryRunner.dropTable('employments');
  }

}
