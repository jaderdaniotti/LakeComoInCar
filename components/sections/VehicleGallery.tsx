import { Car, Users, Star } from 'lucide-react';

interface Vehicle {
  id: number;
  name: string;
  category: string;
  passengers: string;
  luggage: string;
  features: string[];
  ideal: string;
}

interface VehicleGalleryProps {
  vehicles: Vehicle[];
  variant?: 'full' | 'preview';
}

export default function VehicleGallery({ vehicles, variant = 'full' }: VehicleGalleryProps) {
  const displayVehicles = variant === 'preview' ? vehicles.slice(0, 3) : vehicles;

  return (
    <div className="space-y-8">
      {displayVehicles.map((vehicle, index) => (
        <div 
          key={vehicle.id}
          className="border-2 border-black p-1 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="border-2 border-black p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Immagine */}
              <div className="relative w-full h-64 bg-gray-100 border-2 border-black flex items-center justify-center">
                <span className="text-gray-400 uppercase text-sm">
                  Immagine {vehicle.name}
                </span>
              </div>

              {/* Dettagli */}
              <div className="flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-sm uppercase tracking-wider mb-2 text-gray-600">
                    {vehicle.category}
                  </p>
                  <h3 className="text-3xl font-bold mb-2 uppercase">
                    {vehicle.name}
                  </h3>
                </div>

                {/* Info Capacità */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border-2 border-black p-3">
                    <Users className="w-6 h-6 mb-1" />
                    <p className="text-xs uppercase mb-1">Passeggeri</p>
                    <p className="text-xl font-bold">{vehicle.passengers}</p>
                  </div>
                  <div className="border-2 border-black p-3">
                    <Car className="w-6 h-6 mb-1" />
                    <p className="text-xs uppercase mb-1">Bagagli</p>
                    <p className="text-xl font-bold">{vehicle.luggage}</p>
                  </div>
                </div>

                {/* Caratteristiche */}
                {variant === 'full' && (
                  <>
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-2 uppercase">Caratteristiche</h4>
                      <div className="space-y-1">
                        {vehicle.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Star size={14} />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ideale per */}
                    <div>
                      <h4 className="text-sm font-bold mb-1 uppercase">Ideale per</h4>
                      <p className="text-sm text-gray-700">{vehicle.ideal}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
