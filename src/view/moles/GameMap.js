import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";
import MapUpdater from "./MapUpdater";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export default function GameMap({
  position,
  currentCity,
  isGuessed,
  onMapMove,
}) {
  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.png"
          minZoom={7}
          maxZoom={10}
        />
        {isGuessed && currentCity && (
          <Marker position={currentCity.lat_lng}>
            <Popup>{currentCity.name}</Popup>
          </Marker>
        )}
        <MapUpdater onMapMove={onMapMove} isGuessed={isGuessed} />
      </MapContainer>
    </MapWrapper>
  );
}
