createNote = (req, res) =>{
    try{
        if(token){
            return res.status(201).send({
                message: 'Successfully inserted note',
                success: true,
                data: data
              });
              else{
              return res.status(400).send({
                success: false,
                message: 'Wrong Input Validations',
              }
    }
}