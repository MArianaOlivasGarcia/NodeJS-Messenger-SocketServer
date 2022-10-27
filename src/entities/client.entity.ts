import { Schema, model, connect } from "mongoose";

interface IClient {
  name: string;
  type: string;
  lat: string;
  lng: string;
  icon: string;
}

const clientSchema = new Schema<IClient>({
  name: { type: String, required: true },
  type: {type: String, required: true},
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/color-glass/344/30/shipment-logistic.png"}
});

export const Client = model<IClient>("Client", clientSchema);
