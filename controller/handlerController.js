const { options } = require("../middleware/app");
const AppError = require("../utility/AppError");
const catchErrAsync = require("../utility/catchErrorAsync");

const responseFunction = (res, statusCode, data) => {
  if (Array.isArray(data)) {
    res.status(statusCode).json({
      status: "success",
      results: data.length,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      status: "success",
      data: data,
    });
  }
};

const getAll = catchErrAsync(
  async (req, res, next, Model, options1, options2, options3) => {
    let data;
    if (options3) {
      data = await Model.find()
        .populate(options1)
        .populate(options2)
        .populate(options3);
    } else if (options2) {
      data = await Model.find().populate(options1).populate(options2);
    } else if (options1) {
      data = await Model.find().populate(options1);
    } else {
      data = await Model.find();
    }
    responseFunction(res, 200, data);
  }
);
const getOne = catchErrAsync(
  async (req, res, next, Model, options1, options2, options3) => {
    let data;
    if (options3) {
      data = await Model.find()
        .populate(options1)
        .populate(options2)
        .populate(options3);
    } else if (options2) {
      data = await Model.findById(req.params.id)
        .populate(options1)
        .populate(options2);
    } else if (options1) {
      data = await Model.findById(req.params.id).populate(options1);
    } else {
      data = await Model.findById(req.params.id);
    }
    responseFunction(res, 200, data);
  }
);
const add = catchErrAsync(async (req, res, next, Model) => {
  const datas = await Model.create(req.body);
  responseFunction(res, 201, datas);
});

const update = catchErrAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    validator: true,
  });
  responseFunction(res, 201, data);
});

const deleteData = catchErrAsync(async (req, res, next, Model) => {
  const data = await Model.findByIdAndDelete(req.params.id);
  responseFunction(res, 201, data);
});

module.exports = { getAll, getOne, add, update, deleteData };
