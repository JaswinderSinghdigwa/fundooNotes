class Label {
    /**
     * @description function written to Added Label into the database
     * @param {*} a valid req body is expected
     * @param {*} res
     * @returns response
     */
     addLabelById = (req, res) => {
        try {
            return res.status(201).json({
              message: 'Valid ENtry of Token'
            });
          }catch(err) {
            logger.error('Internal Error');
            return res.status(500).json({
              message: 'Internal Error'
            });
          }
    }
}
module.exports = new Label();