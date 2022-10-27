import { request, response } from "express";
import { Client } from "../entities/client.entity";

export const getClients = async (req = request, res = response) => {
  const [total, clients] = await Promise.all([
    Client.countDocuments(),
    Client.find(),
  ]);

  if (!clients) {
    return res.status(400).json({
      status: false,
      msg: "Locations Not Founded",
    });
  }

  res.json({
    status: true,
    total,
    clients,
  });
};

export const postClients = async (req = request, res = response) => {
  const { name, lat, lng } = req.body;
  const client = new Client(req.body);

  try {
    await client.save();

    res.json({
      msg: "Client added succesfully",
      client,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error,
    });
  }
};
