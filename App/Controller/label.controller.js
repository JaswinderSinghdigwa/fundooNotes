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
const {logger} = require('../../logger/logger')

class LabelController {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    addLabel = (req, res) => {
        try {
            if(req.user){
            const labelName ={labelName : req.body.labelName}
            const validateResult = validation.validateLabel.validate(labelName);
            if (validateResult.error) {
                const response = {sucess : false ,message :"Wrong Input Vaidation"}
                return res.status(422).json(response)
            }
            const labelInfo = {
                labelName: req.body.labelName,
                userId: req.user.dataForToken.id,
                noteId : req.params.id,
                email : req.user.dataForToken.email
            }
            labelService.addLabel(labelInfo, (error, data) => {
                if (error) {
                    logger.error('Some error occurred !')
                    const response = {sucess : false , message : 'Some error occured'}
                   return res.status(200).send(response)
                }
                else if (!data){
                    logger.info('Some error occurred while adding label')
                    const response = {sucess : true , message : 'Data is undefine or null' }
                   return res.status(400).send(response)
                }
                logger.info('Successfully added label !');
                const response = {sucess : true ,message :"Valid Entry of Token",data:data}
                return res.status(200).json(response)
        })
    }
        else {
            const response = {sucess : false ,message :"Invalid Entry of Token"}
            return res.status(400).json(response)
        } 
    }catch (err) {
        const response = {sucess : false ,message :"Internal  Server error"}
        return res.status(500).json(response);
        }
    }

    getlabel = (req,res)=>{
        try{
            if(req.user){
                    const response = {sucess : true , message : 'Some error occured'}
                   return res.status(200).send(response)
            }
            else{
                const response = {sucess : true , message : 'Some error occured'}
                   return res.status(400).send(response)
            }
        }
        catch(error){
            const response = {sucess : false ,message :"Internal  Server error"}
            return res.status(500).json(response)
        }
    }
}
module.exports = new LabelController();