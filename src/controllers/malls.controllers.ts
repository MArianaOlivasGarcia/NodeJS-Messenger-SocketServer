import { request, response } from "express";
import {Mall} from '../entities/malls.entity'

export const getMall = async (req = request, res = response) => {
  const [total, malls] = await Promise.all([
    Mall.countDocuments(),
    Mall.find(),
  ]);

  if (!malls) {
    return res.status(400).json({
      status: false,
      msg: "Mall Not Founded",
    });
  }

  res.json({
    status: true,
    total,
    malls,
  });
};

export const postMall = async (req = request, res = response) => {

  const {name,lat,lng} = req.body;

  const mall = new Mall({name,lat,lng});

  await mall.save();

  res.json({
    status: true,
    mall
  });
  
};
