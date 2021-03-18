"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

const TABLE = 'appointments';
const COLUMN = 'user_id';
const FOREIGN_KEY = 'AppointmentUser';

class AddUserIdToAppointments1612102535080 {
  async up(queryRunner) {
    await queryRunner.addColumn(TABLE, new _typeorm.TableColumn({
      name: COLUMN,
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey(TABLE, new _typeorm.TableForeignKey({
      name: FOREIGN_KEY,
      columnNames: [COLUMN],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey(TABLE, FOREIGN_KEY);
    await queryRunner.dropColumn(TABLE, COLUMN);
  }

}

exports.default = AddUserIdToAppointments1612102535080;