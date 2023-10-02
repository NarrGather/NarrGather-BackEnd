const { banks } = require("../models");

const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const { Op } = require("sequelize");
const imagekit = require("../lib/imageKits");

const createBanks = catchAsync(async (req, res) => {
  const { nameBank, bankOwner, noRek, invitation_id } = req.body;
  const file = req.file;

  // validasi utk format file image
  const validFormat =
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif";
  if (!validFormat) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Image Format");
  }

  // untuk dapat extension file nya
  const split = file.originalname.split(".");
  const ext = split[split.length - 1];

  // upload file ke imagekit
  const img = await imagekit.upload({
    file: file.buffer, //required
    fileName: `IMG-${Date.now()}.${ext}`, //required
  });

  const newBanks = await banks.create({
    nameBank,
    bankOwner,
    noRek,
    invitation_id,
    imageQR: img.url,
  });

  res.status(201).json({
    status: "Success",
    data: {
      newBanks,
    },
  });
});

// async function getForYousById(req, res) {
//   try {
//     // Primary Key = PK
//     const id = req.params.id;
//     const data = await foryous.findByPk(id);

//     res.status(200).json({
//       status: "success",
//       data,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// }

const getAllBanks = catchAsync(async (req, res) => {
  const banksData = await banks.findAll();
  res.status(200).json({
    status: "success",
    data: {
      banks: banksData,
    },
  });
});

// const updateForYous = catchAsync(async (req, res) => {
//   const { name, invitation_id } = req.body;
//   const id = req.params.id;

//   const ForYou = await foryous.findByPk(id);

//   if (!ForYou) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       `ForYou with this id ${id} is not found`
//     );
//   }

//   await foryous.update(
//     {
//       name,
//       invitation_id,
//     },
//     {
//       where: {
//         id,
//       },
//     }
//   );
//   res.status(200).json({
//     status: "Success",
//     data: {
//       name,
//       invitation_id,
//     },
//   });
// });

const deleteBanks = catchAsync(async (req, res) => {
  const id = req.params.id;

  const Bank = banks.findByPk(id);

  if (!Bank) {
    throw new ApiError(httpStatus.NOT_FOUND, `Bank with id ${id} is not found`);
  }

  await banks.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Bank with id ${id} was successfully deleted`,
  });
});

// async function getForYousByName(req, res) {
//   try {
//     const name = req.params.name; // Assuming you are passing the name in the request parameters

//     const data = await foryous.findOne({
//       where: {
//         name: {
//           [Op.iLike]: name, // This will perform a case-insensitive search for the name
//         },
//       },
//     });

//     if (!data) {
//       return res.status(404).json({
//         status: "failed",
//         message: "Data not found with the provided name",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       data,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// }

module.exports = {
  createBanks,
  //   getForYousById,
  getAllBanks,
  //   updateForYous,
  deleteBanks,
  //   getForYousByName,

  //   getFlightByAirport,

  //   getFlightByAirport,
};
