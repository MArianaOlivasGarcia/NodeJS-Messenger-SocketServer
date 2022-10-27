import { Schema, model, connect } from "mongoose";

interface ISchool {
  name: string;
  lat: string;
  lng: string;
  icon: string;
}

const schoolSchema = new Schema<ISchool>({
  name: { type: String, required: true },
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/color/344/30/school-backpack.png"}
});

export const School = model<ISchool>("School", schoolSchema);
