exports.seed = async function(knex) {
    await knex('users').del(); //delete all users
};