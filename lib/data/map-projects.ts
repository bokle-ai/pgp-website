export type ProjectStatus = 'available' | 'few_left' | 'sold_out';

export type MapProject = {
  slug: string;
  name: string;
  corridor: 'papanthangal' | 'perumpallam' | 'cheyyar';
  corridorDisplay: string;
  sizes: string;
  priceInLakhs: number;
  status: ProjectStatus;
  coordinates: { lat: number; lng: number };
  approval: string;
  amenities: string[];
};

export const MAP_PROJECTS: MapProject[] = [
  {
    slug: 'sulaman-nagar',
    name: 'Sulaman Nagar',
    corridor: 'papanthangal',
    corridorDisplay: 'Papanthangal',
    sizes: '1,200 sq ft',
    priceInLakhs: 9,
    status: 'available',
    coordinates: { lat: 13.0200, lng: 80.1010 },
    approval: 'DTCP',
    amenities: ['Ready to Construct'],
  },
  {
    slug: 'vetrivel-nagar',
    name: 'Vetrivel Nagar',
    corridor: 'perumpallam',
    corridorDisplay: 'Perumpallam',
    sizes: '1,150 sq ft',
    priceInLakhs: 15,
    status: 'available',
    coordinates: { lat: 12.6200, lng: 79.9500 },
    approval: 'DTCP',
    amenities: ['Ready to Construct'],
  },
  {
    slug: 'valli-murugan-nagar',
    name: 'Valli Murugan Nagar',
    corridor: 'perumpallam',
    corridorDisplay: 'Perumpallam',
    sizes: '600 sq ft',
    priceInLakhs: 4,
    status: 'available',
    coordinates: { lat: 12.5980, lng: 79.9350 },
    approval: 'DTCP',
    amenities: ['Ready to Construct'],
  },
  {
    slug: 'amma-nagar',
    name: 'Amma Nagar',
    corridor: 'cheyyar',
    corridorDisplay: 'Thavasi, Cheyyar',
    sizes: '2,400 sq ft',
    priceInLakhs: 5,
    status: 'available',
    coordinates: { lat: 12.6710, lng: 79.5500 },
    approval: 'DTCP',
    amenities: ['Ready to Construct'],
  },
  {
    slug: 'brindavanan-nagar-sengadu',
    name: 'Brindavanan Nagar',
    corridor: 'cheyyar',
    corridorDisplay: 'Sengadu, Cheyyar',
    sizes: '1,200 sq ft',
    priceInLakhs: 7.5,
    status: 'available',
    coordinates: { lat: 12.6580, lng: 79.5650 },
    approval: 'DTCP',
    amenities: ['Water Line', 'CCTV', 'Fully Compounded', '24×7 Security'],
  },
  {
    slug: 'brindavanan-nagar-irungal',
    name: 'Brindavanan Nagar',
    corridor: 'cheyyar',
    corridorDisplay: 'Irungal, Cheyyar',
    sizes: '1,000 sq ft',
    priceInLakhs: 7.25,
    status: 'available',
    coordinates: { lat: 12.6450, lng: 79.5750 },
    approval: 'DTCP',
    amenities: ['Water Line', 'CCTV', 'Fully Compounded', '24×7 Security'],
  },
];

export const CORRIDORS = [
  {
    id: 'papanthangal' as const,
    name: 'Papanthangal',
    tagline: "West Chennai's rising address.",
    distance: '15 km from Chennai',
    center: { lat: 13.0200, lng: 80.1010 },
  },
  {
    id: 'perumpallam' as const,
    name: 'Perumpallam',
    tagline: 'Affordable land, lasting value.',
    distance: '50 km from Chennai',
    center: { lat: 12.6090, lng: 79.9420 },
  },
  {
    id: 'cheyyar' as const,
    name: 'Cheyyar',
    tagline: 'Space, security, and peace of mind.',
    distance: '100 km from Chennai',
    center: { lat: 12.6580, lng: 79.5650 },
  },
];

export const CHENNAI_REFERENCE = { lat: 13.0827, lng: 80.2707 };
