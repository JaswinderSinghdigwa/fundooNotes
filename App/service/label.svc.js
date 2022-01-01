const { resolve } = require('bluebird')
const labelmodel = require('../models/label.mdl')
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
    addLabel = (labelInfo, callback) => {
        labelmodel.addLabel(labelInfo, (error, data) => {
            if (!data) {
                return callback(null, data)
            }
            return callback(null, data)
        })
    }
    // Retrieve all labels
    getLabel = (userId) => {
        return new Promise((resolve,reject)=>{
            let result = labelmodel.getLabel(userId)
            result.then((data)=>{
                resolve(data)
            }).catch((error)=>{
                reject(error)
            })
        })
    }

    // Retrieve all labels by Id
    getlabelById = (credential) => {
        return new Promise((resolve,reject)=>{
            if(credential){
                resolve(credential)
            }
                reject("data is not found")
            })
    }
}
module.exports = new LabelService();