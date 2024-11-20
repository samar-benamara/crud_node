import Joi from "joi";
//Validation "Signup"
export const validateSignup = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(5)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$"
        )
      )
      .messages({
        "string.min": "Le mot de passe doit contenir au moins 5 caractères.",
        "string.pattern.base":
          "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.",
      })
      .required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
//Validation "Event"
export const validateEvent = (req, res, next) => {
  const eventSchema = Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required().greater(Joi.ref("startDate")).messages({
      "date.greater":
        "La date de fin doit être postérieure à la date de début.",
    }),
  });
  const { error } = eventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
