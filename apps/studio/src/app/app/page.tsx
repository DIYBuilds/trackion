import React from 'react';
import { ChartBarIcon } from 'lucide-react';
import { getProperties } from '@/actions/property';
import { PropertyCard } from '@/components/properties/property-card';

export default async function MainApp() {
  const properties = await getProperties();

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-pixel">Your Properties</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.length === 0 ? (
          // Empty state
          <div className="col-span-full flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-border">
            <div className="w-12 h-12 flex items-center justify-center rounded-none border-2 border-border bg-background shadow-pixel">
              <ChartBarIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-1 text-center">
              <h3 className="font-pixel text-lg">No properties yet</h3>
              <p className="text-sm text-muted-foreground font-pixel">
                Add your first property to start tracking
              </p>
            </div>
          </div>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
}
