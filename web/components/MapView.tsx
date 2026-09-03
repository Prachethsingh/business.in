"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Props = {
  lat: number;
  lng: number;
  radiusKm: number;
  onPinMove: (lat: number, lng: number) => void;
};

function RecenterController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    try {
      if (map && typeof map.flyTo === "function" && map.getContainer() && map.getPane("mapPane")) {
        map.flyTo([lat, lng], 14, {
          duration: 1.2,
          easeLinearity: 0.25,
        });
      }
    } catch {
      try {
        map.setView([lat, lng], 14);
      } catch {}
    }
  }, [lat, lng, map]);
  return null;
}

export default function MapView({ lat, lng, radiusKm, onPinMove }: Props) {
  
  
  const center: LatLngExpression = [lat, lng];

  return (
    <div style={{ borderRadius: "var(--radius)", overflow: "hidden", height: "100%", width: "100%" }}>
      <MapContainer center={center} zoom={14} style={{ width: "100%", height: "100%" }}>
        <RecenterController lat={lat} lng={lng} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={center}
          icon={markerIcon}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const pos = marker.getLatLng();
              onPinMove(pos.lat, pos.lng);
            },
          }}
        />
        <Circle center={center} radius={radiusKm * 1000} pathOptions={{ color: "#1E90FF", opacity: 0.5, fillOpacity: 0.1, dashArray: "6 6" }} />
      </MapContainer>
    </div>
  );
}
