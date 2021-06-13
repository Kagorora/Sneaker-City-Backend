import joi from 'joi';

export const sneakersSchema = joi.object().keys({
  brandName: joi.string().min(2).required(),
  model: joi.string().min(2).required(),
  price: joi.number().required(),
  picture: joi.array(),
  releaseDate: joi.date().required(),
});
