import { Schema, model, connect } from "mongoose";

interface ILocation {
  Name: string;
  lat: string;
  lng: string;
  icon: string;
}

const locationSchema = new Schema<ILocation>({
  Name: { type: String, required: true },
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/cotton/344/30/online-store.png"}
});

export const Location = model<ILocation>("Location", locationSchema);
