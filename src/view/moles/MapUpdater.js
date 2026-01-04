import { useMapEvents } from "react-leaflet";

export default function MapUpdater({ onMapMove, isGuessed }) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      const lat = center.lat.toFixed(4);
      const lng = center.lng.toFixed(4);
      document.title = `${lat}°N, ${lng}°E`;

      if (!isGuessed) {
        onMapMove(center.lat, center.lng);
      }
    },
    click: (e) => {
      if (!isGuessed) {
        onMapMove(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}
