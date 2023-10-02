const { wishes } = require("../models");

const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const { Op } = require("sequelize");

async function createWishes(req, res) {
  try {
    const { name, wish, invitation_id } = req.body;
    const newWishes = await wishes.create({
      name,
      wish,
      invitation_id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newWishes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getWishesById(req, res) {
  try {
    // Primary Key = PK
    const id = req.params.id;
    const data = await wishes.findByPk(id);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

const getAllWishes = catchAsync(async (req, res) => {
  const wishesData = await wishes.findAll();
  res.status(200).json({
    status: "success",
    data: {
      foryous: wishesData,
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

const deleteWishes = catchAsync(async (req, res) => {
  const id = req.params.id;

  const Wishes = wishes.findByPk(id);

  if (!Wishes) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Wishes with id ${id} is not found`
    );
  }

  await wishes.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Wishes with id ${id} was successfully deleted`,
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
  createWishes,
  getWishesById,
  getAllWishes,
  //   updateForYous,
  deleteWishes,
  //   getForYousByName,

  //   getFlightByAirport,

  //   getFlightByAirport,
};
