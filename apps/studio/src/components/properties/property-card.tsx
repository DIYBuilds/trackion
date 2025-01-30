'use client';

import { ChartBarIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

type Property = {
  id: string;
  domain: string;
  createdAt: Date;
  updatedAt: Date;
  eventTemplates: number;
};

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group cursor-pointer border-2 border-border bg-background p-4 shadow-pixel hover:translate-y-[2px] hover:shadow-pixel-sm active:translate-y-[4px] active:shadow-none transition-all duration-150">
      <Link href={`/app/${property.domain}`}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-none border-2 border-primary bg-primary/10">
              <ChartBarIcon className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-pixel">{property.domain}</h3>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-pixel text-muted-foreground">
              Last updated: {formatDistanceToNow(property.updatedAt)} ago
            </p>
            <p className="text-xs font-pixel text-muted-foreground">
              {property.eventTemplates} tracked events
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
