
exports.seed = function(knex, Promise) {

  return knex('projects').del()
    .then(function () {

      return knex('projects').insert([
        {name: "Shop", description: "Buy groceries, new clothes", completed: false},
        {name: "Workout", description: "Run 2 miles, do push-ups and squats", completed: false},
        {name: "Relax", description: "Play video games, have a beer", completed: true},
      ]);
    });
};
