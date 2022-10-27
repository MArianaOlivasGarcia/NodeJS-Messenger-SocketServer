import { Schema, model, connect } from "mongoose";

interface IDistro {
  name: string;
  lat: string;
  lng: string;
  icon: string;
}

const distroSchema = new Schema<IDistro>({
  name: { type: String, required: true },
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/color-glass/344/30/shipment-logistic.png"}
});

export const Distro = model<IDistro>("Distro", distroSchema);
