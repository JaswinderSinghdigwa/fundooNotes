const labelmodel = require('../models/label.model');
const nodeRedis = require('../Connector/redis.connector');


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
                return callback(error, data)
            }
            return callback(null, data)
        })
    }
    // Retrieve all labels
    findAllLabel = async (userId) => {
        let result = await labelmodel.findAllLabel(userId)
        if (!result) {
            return false;
        }
        return result;
    }

    // Retrieve labels by Id
    findlabelById = (credential) => {
        return new Promise((resolve, reject) => {
            labelmodel.findlabelById(credential)
                .then(data => {
                    nodeRedis.setData('getRedisById',60,JSON.stringify(data))
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
        })
    }

    updatelabelById = (updtlabel) => {
        let updatelabel = labelmodel.updatelabelById(updtlabel)
        if (!updatelabel) {
            return false;
        }
        return updatelabel
    }

    deleteLabel = async (credential) => {
        let deletedlabel = await labelmodel.deleteLabel(credential)
        if (!deletedlabel) {
            return false;
        }
        return deletedlabel;
    }
}
module.exports = new LabelService();