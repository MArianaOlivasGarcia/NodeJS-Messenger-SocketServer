import { Schema, model, connect } from "mongoose";

interface IAvLocations {
  name: string;
  address: string;
  desc: string;
  img: string;
  lat: string;
  lng: string;
  icon: string;
}

const avlocationsSchema = new Schema<IAvLocations>({
  name: { type: String, required: true },
  address: { type: String },
  desc: { type: String, default: "Rento Local Para Comercio U Oficina en Zona Centro de Monterry. Local nuevo con 4 cajones de estacionamiento, 245 mts. Para área comercial abierta, 10 mts para oficina o bodega, dos medios baños, pisos de interceramic, amplios ventanales para exhibición e iluminación natural y luz led de energía eléctrica, ubicado en una de las zonas y avenidas más comerciales de la ciudad, cerca de clínicas, hospitales, escuelas y fraccionamientos, ideal para cualquier tipo de negocio." },
  img: {
    type: String,
    default:
      "https://www.bienesonline.com/mexico/photos/local-comercial-en-renta-en-zona-centro-durango-LOR2836941599085314-907.jpg",
  },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  icon: {
    type: String,
    default: "https://img.icons8.com/color/344/30/sale--v1.png",
  },
});

export const AvLocation = model<IAvLocations>("AvLocation", avlocationsSchema);
