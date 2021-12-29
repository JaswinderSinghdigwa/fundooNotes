const validation = require('../utilities/validation')
class LabelController {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
    addLabelById = (req, res) => {
        try {
            if(req.user){
            const labelName =req.body.labelName
            const validateResult = validation.validateLabel.validate(labelName);
            if (validateResult.error) {
                const response = {sucess : false ,message :"Wrong Input Vaidation"}
                return res.status(422).json(response)
            }
            const response = {sucess : true ,message :"Valid Entry of Token"}
            return res.status(200).json(response)
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