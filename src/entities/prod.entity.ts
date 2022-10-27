import { Schema, model, connect } from "mongoose";

interface IProd {
  name: string;
  lat: string;
  lng: string;
  icon: string;
}

const prodSchema = new Schema<IProd>({
  name: { type: String, required: true },
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/color/344/30/factory.png"}
});

export const Production = model<IProd>("Production", prodSchema);
