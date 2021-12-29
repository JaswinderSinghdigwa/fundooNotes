const labelmodel = require('../models/label.model')
/*************************************************************************
* Purpose : to recieve request from controller and send it to model layer 
    and perform some intermediate business logic
*
* @file : label.service.js
* @author : Jaswinder Singh <findjassi121212@gmail.com>
* @version : 1.0
* @since : 29/12/2021
*
**************************************************************************/
class LabelService {
    /**
     * @description Create a new label 
     * @method labelModel.create calls model class method
     */
     addLabel = (labelInfo,callback) => {
         labelmodel.addLabel(labelInfo,(error,data)=>{
             if(error){
                 return callback(error,null)
             }
             else if(!data){
                 return callback(null,data)
             }
             return callback(null,data)
         })
    }
}
module.exports = new LabelService();