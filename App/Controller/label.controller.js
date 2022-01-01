/*************************************************************************
* Purpose : to recieve request from routes and forward it to service layer
*
* @file : label.controller.js
* @author : Jaswinder Singh  <findjassi1212@gmail.com>
* @version : 1.0
* @since : 29/12/2021
*
**************************************************************************/
const validation = require('../utilities/validation')
const labelService = require('../service/label.service')
const { logger } = require('../../logger/logger')

class LabelController {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    addLabel = (req, res) => {
        try {
            if (req.user) {
                const labelName = { labelName: req.body.labelName }
                const validateResult = validation.validateLabel.validate(labelName);
                if (validateResult.error) {
                    const response = { sucess: false, message: "Wrong Input Vaidation" }
                    return res.status(422).json(response)
                }
                const labelInfo = {
                    labelName: req.body.labelName,
                    userId: req.user.dataForToken.id,
                    noteId: req.params.id,
                    email: req.user.dataForToken.email
                }
                labelService.addLabel(labelInfo, (error, data) => {
                    if (error) {
                        logger.error('Some error occurred !')
                        const response = { sucess: false, message: 'Some error occured' }
                        return res.status(404).send(response)
                    }
                    else if (!data) {
                        const response = { sucess: true, message: "Successfully added label !", data: data }
                        return res.status(400).json(response)
                    }
                    logger.info('Successfully added label !');
                    const response = { sucess: true, message: "Successfully added label !", data: data }
                    return res.status(200).json(response)
                })
            }
            else {
                const response = { sucess: false, message: "Invalid Entry of Token" }
                return res.status(400).json(response)
            }
        } catch (err) {
            const response = { sucess: false, message: "Internal  Server error" }
            return res.status(500).json(response);
        }
    }

    getlabel = (req, res) => {
        try {
            if (req.user) {
                const userId = { id: req.user.dataForToken.id }
                const validateResult = validation.validateUserid.validate(userId);
                if (validateResult.error) {
                    const response = { sucess: false, message: 'Wrong Input Validation', data: validateResult }
                    return res.status(400).send(response)
                }
                labelService.getLabel(userId)
                    .then((data) => {
                        const response = { sucess: true, message: 'label is fetched', data: data }
                        return res.status(200).send(response)
                    }).catch((error) => {
                        const response = { sucess: false, message: 'Some error occured' }
                        return res.status(200).send(response)
                    })
            }
            else {
                const response = { sucess: false, message: 'Invalid Token' }
                return res.status(400).send(response)
            }
        }
        catch (error) {
            const response = { sucess: false, message: "Internal  Server error" }
            return res.status(500).json(response)
        }
    }

    getlabelById = (req, res) => {
        try {
            const credentials = {
                userId: req.user.dataForToken.id,
                labelId: req.params.id
            };
            const validationResult = validation.labelvalidator.validate(credentials)
            if (validationResult.error) {
                const response = { sucess: false, message: "Wrong Credential  Validation" }
                res.status(422).json(response)
            }
            labelService.getlabelById(credentials)
                .then(data => {
                    const response = { sucess: true, message: "Succesfuly label is fetch", data: data }
                    return res.status(201).json(response);
                }).catch(error => {
                    const response = { sucess: false, message: "Succesfuly label is not fetch", error: error.message }
                    return res.status(400).json(response)
                })
        }
        catch (error) {
            const response = { sucess: false, message: "Internal  Server error" }
            return res.status(500).json(response)
        }
    }

    updatelabelById = (req, res) => {
        try {
                const updtlabel = {
                    userId: req.user.dataForToken.id,
                    id: req.params.id,
                    labelName : req.body.labelName
                };
                const validatiionResult = validation.updatelabelbyid.validate(updtlabel)
                if(validatiionResult.error){
                const response = { sucess: false, message: "Validation Failed", error : validatiionResult.error }
                 return res.status(422).json(response)
                }
                labelService.updatelabelById(updtlabel)
                .then(data=>{
                    const response = { sucess: false, message: "Added Service Layer",data:data }
                    return res.status(200).json(response)
                }).catch(error=>{
                    const response = { sucess: false, message: "some error occured " }
                    return res.status(400).json(response)
                })
               

        } catch (error) {
            console.log("errr",error);
            const response = { sucess: false, message: "Internal  Server error" }
            return res.status(500).json(response)
        }
    }
}
module.exports = new LabelController();