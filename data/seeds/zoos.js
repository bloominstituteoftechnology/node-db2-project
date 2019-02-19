exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("zoos")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("zoos").insert([
        { id: 1, name: "jb 1" },
        { id: 2, name: "jb 2" },
        { id: 3, name: "jb 3" },
        { id: 4, name: "jb 4" },
        { id: 5, name: "jb 5" },
        { id: 6, name: "jb 6" },
        { id: 7, name: "jb 7" },
        { id: 8, name: "jb 8" },
        { id: 9, name: "jb 9" },
        { id: 10, name: "jb 10" },
        { id: 11, name: "jb 11" },
        { id: 12, name: "jb 12" },
        { id: 13, name: "jb 13" },
        { id: 14, name: "jb 14" },
        { id: 15, name: "jb 15" },
        { id: 16, name: "jb 16" },
        { id: 17, name: "jb 17" },
        { id: 18, name: "jb 18" },
        { id: 19, name: "jb 19" },
        { id: 20, name: "jb 20" },
        { id: 21, name: "jb 21" },
        { id: 22, name: "jb 22" },
        { id: 23, name: "jb 23" },
        { id: 24, name: "jb 24" },
        { id: 25, name: "jb 25" },
        { id: 26, name: "jb 26" },
        { id: 27, name: "jb 27" },
        { id: 28, name: "jb 28" },
        { id: 29, name: "jb 29" },
        { id: 30, name: "jb 30" }
      ]);
    });
};
