import { Schema, model, connect } from "mongoose";

interface IParks {
  name: string;
  lat: string;
  lng: string;
  icon: string;
}

const parksSchema = new Schema<IParks>({
  name: { type: String, required: true },
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/fluency/344/30/park-bench.png"}
});

export const Park = model<IParks>("Park", parksSchema);
