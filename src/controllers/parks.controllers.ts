import { request, response } from "express";
import {Park} from '../entities/parks.entity'

export const getPark = async (req = request, res = response) => {
  const [total, parks] = await Promise.all([
    Park.countDocuments(),
    Park.find(),
  ]);

  if (!parks) {
    return res.status(400).json({
      status: false,
      msg: "Park Not Founded",
    });
  }

  res.json({
    status: true,
    total,
    parks,
  });
};

export const postPark = async (req = request, res = response) => {

  const {name,lat,lng} = req.body;

  const park = new Park({name,lat,lng});

  await park.save();

  res.json({
    status: true,
    park
  });
  
};
