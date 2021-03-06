const labelmodel = require('../models/label.model');
const nodeRedis = require('../Connector/redis.connector');
const { logger } = require('../../logger/logger');


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
        try {
            if (!result) {
                return false;
            }
            return result;
        } catch (error) {
            logger.error("Error Occured while finding Label");
        }
    }

    // Retrieve labels by Id
    findlabelById = async (credential) => {
        let data = await nodeRedis.findAllData('getById')
        if (!data) {
            return new Promise((resolve, reject) => {
                labelmodel.findlabelById(credential)
                    .then(data => {
                        resolve(data)
                    }).catch((error) => {
                        reject(error)
                    })
            })
        }
        else if (data) {
            nodeRedis.setData('getById', 60, JSON.stringify(data))
            resolve(data)
        }
        reject(error)
    }

    updatelabelById = (updtlabel) => {
        let updatelabel = labelmodel.updatelabelById(updtlabel)
        try {
            if (!updatelabel) {
                return false;
            }
            return updatelabel
        } catch (error) {
            logger.error("Error Occured while finding Label");
        }

    }

    deleteLabel = async (credential) => {
        let deletedlabel = await labelmodel.deleteLabel(credential)
        try {
            if (deletedlabel) {
                return deletedlabel;
            }
        } catch (error) {
            logger.error("Error Occured while finding Label");
        }
    }
}
module.exports = new LabelService();