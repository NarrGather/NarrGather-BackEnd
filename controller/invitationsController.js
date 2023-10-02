const { invitations, foryous, stories, wishes, banks } = require("../models");

const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const { Op } = require("sequelize");
const imagekit = require("../lib/imageKits");

async function createInvitations(req, res) {
  try {
    const {
      familyName,
      familyName2,
      groomDad,
      groomMom,
      brideDad,
      brideMom,
      groom,
      bride,
      day,
      date,
      address,
      time,
      place,
      linkMap,
      quotes,
      quoter,
      groomSosmed1,
      groomSosmed2,
      groomSosmed3,
      brideSosmed1,
      brideSosmed2,
      brideSosmed3,
      urlCouple,
      noTemplate,
      user_id,
    } = req.body;

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

    const newInvitations = await invitations.create({
      image: img.url,
      familyName,
      familyName2,
      groomDad,
      groomMom,
      brideDad,
      brideMom,
      groom,
      bride,
      day,
      date,
      address,
      time,
      place,
      linkMap,
      quotes,
      quoter,
      groomSosmed1,
      groomSosmed2,
      groomSosmed3,
      brideSosmed1,
      brideSosmed2,
      brideSosmed3,
      urlCouple,
      noTemplate,
      user_id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newInvitations,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getInvitationsById(req, res) {
  try {
    // Primary Key = PK
    const id = req.params.id;
    const data = await invitations.findByPk(id, {
      include: [
        {
          model: foryous,
        },
        {
          model: stories,
        },
        {
          model: wishes,
        },
        {
          model: banks,
        },
      ],
    });

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

const getAllInvitations = catchAsync(async (req, res) => {
  try {
    const invitationsData = await invitations.findAll({
      include: [
        {
          model: foryous,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        invitations: invitationsData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
});

// update airline
const updateInvitations = catchAsync(async (req, res) => {
  const {
    familyName,
    familyName2,
    groomDad,
    groomMom,
    brideDad,
    brideMom,
    groom,
    bride,
    day,
    date,
    address,
    time,
    place,
    linkMap,
    quotes,
    quoter,
    groomSosmed1,
    groomSosmed2,
    groomSosmed3,
    brideSosmed1,
    brideSosmed2,
    brideSosmed3,
    urlCouple,
    noTemplate,
    user_id,
  } = req.body;
  const id = req.params.id;
  const file = req.file;

  const Invitation = await invitations.findByPk(id);

  if (!Invitation) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Invitation with this id ${id} is not found`
    );
  }

  // Jika ada file gambar yang diunggah, lakukan pembaruan gambar
  if (file) {
    // Validasi format file gambar
    const validFormats = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (!validFormats.includes(file.mimetype)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Wrong Image Format");
    }

    // Dapatkan ekstensi file
    const split = file.originalname.split(".");
    const ext = split[split.length - 1];

    // Upload gambar ke imagekit
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG-${Date.now()}.${ext}`,
    });

    await invitations.update(
      {
        image: img.url,
        familyName,
        familyName2,
        groomDad,
        groomMom,
        brideDad,
        brideMom,
        groom,
        bride,
        day,
        date,
        address,
        time,
        place,
        linkMap,
        quotes,
        quoter,
        groomSosmed1,
        groomSosmed2,
        groomSosmed3,
        brideSosmed1,
        brideSosmed2,
        brideSosmed3,
        urlCouple,
        noTemplate,
        user_id,
      },
      {
        where: {
          id,
        },
      }
    );
  } else {
    // Jika tidak ada file gambar yang diunggah, lakukan pembaruan tanpa gambar
    await invitations.update(
      {
        familyName,
        familyName2,
        groomDad,
        groomMom,
        brideDad,
        brideMom,
        groom,
        bride,
        day,
        date,
        address,
        time,
        place,
        linkMap,
        quotes,
        quoter,
        groomSosmed1,
        groomSosmed2,
        groomSosmed3,
        brideSosmed1,
        brideSosmed2,
        brideSosmed3,
        urlCouple,
        noTemplate,
        user_id,
      },
      {
        where: {
          id,
        },
      }
    );
  }
  res.status(200).json({
    status: "Success",
    data: {
      familyName,
      familyName2,
      groomDad,
      groomMom,
      brideDad,
      brideMom,
      groom,
      bride,
      day,
      date,
      address,
      time,
      place,
      linkMap,
      quotes,
      quoter,
      groomSosmed1,
      groomSosmed2,
      groomSosmed3,
      brideSosmed1,
      brideSosmed2,
      brideSosmed3,
      urlCouple,
      noTemplate,
      user_id,
    },
  });
});

const deleteInvitations = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Dapatkan data Invitation berdasarkan ID
  const invitation = await invitations.findByPk(id, {
    include: [
      {
        model: foryous,
      },
    ],
  });

  if (!invitation) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Invitation with id ${id} is not found`
    );
  }

  // Hapus data terkait dari foryous jika ada
  if (invitation.foryous) {
    for (const foryou of invitation.foryous) {
      await foryou.destroy();
    }
  }

  // Hapus Invitation dan data terkait dari foryous
  await invitation.destroy();

  res.status(200).json({
    status: "Success",
    message: `Invitation with id ${id} and related foryous data were successfully deleted`,
  });
});

async function getInvitationByUrlCouple(req, res) {
  try {
    // const { urlCouple } = req.body; // Ambil urlCouple dari body permintaan

    // const invitation = await invitations.findOne({
    //   where: {
    //     urlCouple: urlCouple, // Cari undangan berdasarkan urlCouple yang sesuai
    //   },
    // });

    const urlCouple = req.params.urlCouple;

    const invitation = await invitations.findOne({
      where: {
        urlCouple: {
          [Op.iLike]: urlCouple,
        },
      },
      include: [
        {
          model: banks,
          as: "banks", // Ganti 'banks' sesuai dengan nama relasi di model invitations
        },
        {
          model: stories,
          as: "stories", // Ganti 'stories' sesuai dengan nama relasi di model invitations
        },
        {
          model: wishes,
          as: "wishes", // Ganti 'wishes' sesuai dengan nama relasi di model invitations
        },
      ],
    });

    if (!invitation) {
      return res.status(404).json({
        status: "failed",
        message: "Undangan tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        invitation,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
}

module.exports = {
  createInvitations,
  getInvitationsById,
  getAllInvitations,
  updateInvitations,
  deleteInvitations,
  getInvitationByUrlCouple,

  //   getFlightByAirport,

  //   getFlightByAirport,
};
