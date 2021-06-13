import joi from 'joi';

export const sizesSchema = joi.object().keys({
  size: joi.number().required(),
  available: joi.boolean().required(),
  quantity: joi.number().required(),
});
