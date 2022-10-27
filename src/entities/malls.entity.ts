import { Schema, model, connect } from "mongoose";

interface IMalls {
  name: string;
  lat: string;
  lng: string;
  icon: string;
}

const mallsSchema = new Schema<IMalls>({
  name: { type: String, required: true },
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/plasticine/344/30/city-buildings.png"}
});

export const Mall = model<IMalls>("Mall", mallsSchema);
