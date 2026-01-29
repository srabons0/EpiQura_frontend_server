import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import './style.css';
// Default center of Dhaka
const dhakaCenter = [23.8104, 90.4010]; // Dhaka city center

// Optional custom icon
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Helper component to fly to selected coordinates
function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 14, { duration: 1.5 });
    }
    return null;
}


const BangladeshMap = ({ serviceCenters }) => {
    const [searchText, setSearchText] = useState('');
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const district = serviceCenters.find(d =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        );
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district);
        }
    };

    return (
        <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg relative">
            <MapContainer center={dhakaCenter} zoom={12} scrollWheelZoom={false} className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FlyToDistrict coords={activeCoords} />

                {serviceCenters.map((center, index) => (
                    <Marker
                        key={index}
                        position={[center.latitude, center.longitude]}
                        icon={customIcon}
                    >
                        <Popup>
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg">{center.district}</h3>
                                <p><strong>City:</strong> {center.city}</p>
                                <p><strong>Status:</strong> {center.status}</p>
                                <p><strong>Landmarks:</strong> {center.landmarks.join(', ')}</p>
                                <p><strong>Covered Areas:</strong></p>
                                <ul className="list-disc list-inside ml-2">
                                    {center.covered_area.map((area, i) => (
                                        <li key={i}>
                                            Sector: {area.Sector}, Road: {area.Road}, Block: {area.Block}
                                        </li>
                                    ))}
                                </ul>
                                
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default BangladeshMap;
