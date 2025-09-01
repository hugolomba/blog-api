import Joi from "joi";
import { validationResult } from "express-validator";
import validator from "validator";

// middleware to validate and sanitize request body

export const validateAndSanitize = (schema) => {
  return (req, res, next) => {
    // validation with Joi
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Validation error",
        error: error.details.map((d) => d.message)
      });
    }

    // sanitization and normalization
    const sanitized = {};
    for (const key in value) {
      let val = value[key];

      if (typeof val === "string") {
        val = val.trim();                     // remove spaces in the begin and the end
        val = val.replace(/\s+/g, " ");       // multiple internal spaces → 1
        val = validator.escape(val);          // XSS
        if (key === "email" || key === "username") {
          val = val.toLowerCase();            // lowercase
        }
      }

      sanitized[key] = val;
    }

    req.body = sanitized;  // overwrite req.body with sanitized data
    next();
  };
};