
exports.up = function (knex) {
    return knex.schema.createTable('movies_theaters', table => {
        table.integer('movie-id').unsigned().notNullable();
        table
            .foreign('movie-id')
            .references('movie-id')
            .inTable('movies')
            .onDelete('cascade');
        table.integer('theater-id').unsigned().notNullable();
        table
            .foreign('theater-id')
            .references('theater-id')
            .inTable('theaters')
            .onDelete('cascade');
        table.boolean('isShowing');
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("movies_theaters")
};
