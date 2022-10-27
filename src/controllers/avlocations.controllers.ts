import { request, response } from "express";
import { AvLocation } from "../entities/avlocations.entity";

export const getAvLocation = async (req = request, res = response) => {
  const [total, avlocations] = await Promise.all([
    AvLocation.countDocuments(),
    AvLocation.find(),
  ]);

  if (!avlocations) {
    return res.status(400).json({
      status: false,
      msg: "AvLocation Not Founded",
    });
  }

  res.json({
    status: true,
    total,
    avlocations,
  });
};

export const postAvLocation = async (req = request, res = response) => {

  const {name,lat,lng,address,desc,img} = req.body;

  const avlocation = new AvLocation({name,lat,lng,address,desc,img});

  await avlocation.save();

  res.json({
    status: true,
    avlocation
  });
  
};
