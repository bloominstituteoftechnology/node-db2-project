
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('fruits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('fruits').insert([
        {name:'Jlaks akhfj',avgWeightOz:722, 
        isDelicious:false,color:'red'
        },
        {name:'asdfd 1ass',avgWeightOz:522, 
        isDelicious:true,color:'blue'
        },
        {name:'asss asdd1',avgWeightOz:242, 
        isDelicious:false,color:'black'
        },
        {name:'dfddd 1ffdd',avgWeightOz:122, 
        isDelicious:true,color:'brown'
        },
        {name:'sdfas 1asdd',avgWeightOz:322, 
        isDelicious:true,color:'pink'
        },
      ]);
    });
};

// DELETE FROM 'fruits' WHERE name LIKE 's%'