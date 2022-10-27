import { request, response } from "express";
import { Production } from "../entities/prod.entity";

export const getProduction = async (req = request, res = response) => {
  const [total, prods] = await Promise.all([
    Production.countDocuments(),
    Production.find(),
  ]);

  if (!prods) {
    return res.status(400).json({
      status: false,
      msg: "Production Not Founded",
    });
  }

  res.json({
    status: true,
    total,
    prods,
  });
};

export const postProduction = async (req = request, res = response) => {

  const {name,lat,lng} = req.body;

  const prod = new Production({name,lat,lng});

  await prod.save();

  res.json({
    status: true,
    msg:"Prod added succesfully",
    prod
  });
  
};
