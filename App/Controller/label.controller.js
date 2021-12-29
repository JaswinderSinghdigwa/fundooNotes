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
            const labelName =req.body.labelName
            const validateResult = validation.validateLabel.validate(labelName);
            if (validateResult.error) {
                const response = {sucess : false ,message :"Wrong Input Vaidation"}
                return res.status(422).json(response)
            }
            const labelInfo = {
                labelName: req.body.labelName,
                userId: req.user.dataForToken.id,
                noteId : req.params.id
            }
            labelService.addLabel(labelInfo, (error, data) => {
                if (error) {
                    const response = {sucess : true , message : error.message}
                   return res.status(401).send(response)
                }
                else if (!data){
                    const response = {sucess : true , message : data.message }
                   return res.status(400).send(response)
                }
                const response = {sucess : true ,message :"Valid Entry of Token"}
                return res.status(200).json(response)
        })
    }
        else {
            const response = {sucess : false ,message :"Invalid Entry of Token"}
            return res.status(400).json(response)
        } 
    }catch (err) {
            return res.status(500).json({
                sucess : false,
                message: 'Internal Error'
            });
        }
    }
}
module.exports = new LabelController();