import React from 'react';

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ property_domain: string }>;
}) {
  const { property_domain } = await params;

  return <div>PropertyPage : {property_domain}</div>;
}
