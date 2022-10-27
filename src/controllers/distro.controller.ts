import { request, response } from "express";
import { Distro } from "../entities/distro.entity";

export const getDistros = async (req = request, res = response) => {
  const [total, distros] = await Promise.all([
    Distro.countDocuments(),
    Distro.find(),
  ]);

  if (!distros) {
    return res.status(400).json({
      status: false,
      msg: "Locations Not Founded",
    });
  }

  res.json({
    status: true,
    total,
    distros,
  });
};

export const postDistros = async (req = request, res = response) => {
  const { name, lat, lng } = req.body;
  const distro = new Distro({ name, lat, lng });

  try {
    await distro.save();

    res.json({
      msg: "Distro added succesfully",
      distro,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error,
    });
  }
};
