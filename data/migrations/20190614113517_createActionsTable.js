
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', tbl => {
        tbl.increments();
// action that belongs to one project
        tbl
            .integer('project_id')
            .notNullable()
            .references('id')
            .inTable('projects');

        tbl
            .string('description')
            .notNullable();

        tbl
            .string('notes')
            .notNullable();

        tbl.boolean('completed');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
};
