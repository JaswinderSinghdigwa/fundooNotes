const Joi = require('joi');

class Validation {
  ValidationRegister =
    Joi.object({
      firstName: Joi.string()
        .min(2)
        .max(30)
        .required()
        .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,20}?)")),

      lastName: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .pattern(new RegExp("^([A-Z]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{1,30}[ ]?[.]?[']?[ ]?[a-zA-Z]{0,30}[ ]?[a-zA-Z]{0,20}?)")),


      email: Joi.string()
        .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
        .required(),

      password: Joi.string()
        // eslint-disable-next-line no-control-regex
        .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
        .required()
    });

  ValidationLogin =
    Joi.object({
      email: Joi.string()
        .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
        .required(),

      password: Joi.string()
        .required()
        .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
    });

  validationforgotPassword = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('^[a-z0-9.+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$'))
      .required()
  });

  validateReset = Joi.object({
    email: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
      .required(),
    password: Joi.string()
      .pattern(new RegExp('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'))
      .required(),
    code: Joi.string()
      .pattern(new RegExp('[0-9aA-Za-z]{1,}'))
      .required()
  });

  notesCreationValidation = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(2)
      .required(),
    description: Joi.string().min(5)
      .required()
  });
  NoteValidation = Joi.object({
    id: Joi.string().required()
  });
  getNoteValidation = Joi.object({
    userId: Joi.string().required(),
    noteId: Joi.string().required()
  });
  notesUpdateValidation = Joi.object({
    id: Joi.string().required(),
    userId: Joi.string().required(),
    title: Joi.string().min(2),
    description: Joi.string().min(2)
  });
  validateDeleteNote = Joi.object({
    id: Joi.string(),
    noteId: Joi.string(),
    userId: Joi.string()
  })
  validateLabel = Joi.object({
    labelName: Joi.string()
  });
  validateUserid = Joi.object({
    id: Joi.string()
  });
  labelvalidator = Joi.object({
    userId: Joi.string(),
    labelId
      : Joi.string()
  })
  updatelabelbyid = Joi.object({
    userId: Joi.string(),
    id: Joi.string(),
    labelName: Joi.string().min(5).required()
  })
  deletelabel = Joi.object({
    userId: Joi.string(),
    id: Joi.string().min(10).required()
  })
}

module.exports = new Validation(); 