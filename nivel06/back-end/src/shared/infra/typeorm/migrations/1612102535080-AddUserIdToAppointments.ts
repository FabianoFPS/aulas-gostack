import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const TABLE = 'appointments';
const COLUMN = 'user_id';
const FOREIGN_KEY = 'AppointmentUser';

export default class AddUserIdToAppointments1612102535080
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TABLE,
      new TableColumn({
        name: COLUMN,
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      TABLE,
      new TableForeignKey({
        name: FOREIGN_KEY,
        columnNames: [COLUMN],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(TABLE, FOREIGN_KEY);
    await queryRunner.dropColumn(TABLE, COLUMN);
  }
}
