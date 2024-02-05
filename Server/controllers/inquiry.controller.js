import { errorHandler } from './../utils/error.js';
import Inquiry from './../models/inquiry.model.js';
const createInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.create({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    return res.status(201).json(inquiry);
  } catch (error) {
    next(error);
  }
};

const listInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.find({});
    return res.status(200).json(inquiry);
  } catch (error) {
    next(error);
  }
};

const getInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    return res.status(200).json(inquiry);
  } catch (error) {
    next(error);
  }
};

const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return next(errorHandler(404, 'Inquiry Not Found!'));
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json('Inquiry successfully deleted!');
  } catch (error) {
    next(error);
  }
};

export { createInquiry, listInquiry, getInquiry, deleteInquiry };
