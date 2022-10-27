import { Schema, model, connect } from "mongoose";

interface ICompetitor {
  Name: string;
  lat: string;
  lng: string;
  icon: string;
}

const competitorSchema = new Schema<ICompetitor>({
  Name: { type: String, required: true },
  lat: {type: String, required: true},
  lng: {type: String, required: true},
  icon: {type:String, default: "https://img.icons8.com/color/2x/30/spam.png"}
});

export const Competitor = model<ICompetitor>("Competitor", competitorSchema);
