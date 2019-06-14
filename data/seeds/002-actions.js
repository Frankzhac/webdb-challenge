
exports.seed = function(knex, Promise) {
// Deletes ALL existing entries
  return knex('actions').del()
    .then(function () {

      return knex('actions').insert([
        {description: "Buy more vegetables", notes: "mushrooms, kale", completed: 0, project_id: 7},
        {description: "Workouts", notes: "weight-training, cardio", completed: 0, project_id: 8},
        {description: "Beat Ghost Recon Wildlands", notes: "beat it on Ghost mode", completed: 0, project_id: 8}
      ]);
    });
};
