import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1625261874843 implements MigrationInterface
{

    public async up(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    { name: "id", type: "varchar", isPrimary: true, },
                    { name: "first_name", type: "varchar" },
                    { name: "last_name", type: "varchar", },
                    { name: "password", type: "varchar" },
                    { name: "role", type: "varchar", isNullable: false },
                    { name: "forgot_token", type: "varchar", isNullable: true, default: null },
                    { name: "confirm_link", type: "varchar", isNullable: true, default: null },
                    { name: "created_at", type: "date", default: "now()" },
                    { name: "updated_at", type: "varchar", onUpdate: "now()", isNullable: true, default: null }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void>
    {
        await queryRunner.dropTable("users");
    }

}
