import joi from 'joi';

export const orderSchema = joi.object().keys({
  size: joi.number().required(),
});
