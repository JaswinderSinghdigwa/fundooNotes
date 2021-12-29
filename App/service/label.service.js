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
     addLabel = (label,callback) => {
        if(!label){
            console.log("2222",label);
            return callback("label is undefine or null",null)
        }
        console.log("this is my body",label)
        return callback(null,label);    
    }
}
module.exports = new LabelService();