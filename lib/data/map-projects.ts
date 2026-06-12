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

// All 6 projects are villages within Cheyyar Taluk, Tiruvannamalai district ,
// ~95-105 km SW of Chennai. Coordinates are micro-offsets around Cheyyar town
// (12.662 N, 79.543 E) so beacons fan out instead of stacking on the same pin.
export const MAP_PROJECTS: MapProject[] = [
  {
    slug: 'sulaman-nagar',
    name: 'Sulaman Nagar',
    corridor: 'papanthangal',
    corridorDisplay: 'Papanthangal, Cheyyar',
    sizes: '1,200 sq ft',
    priceInLakhs: 9,
    status: 'available',
    coordinates: { lat: 12.6850, lng: 79.5200 },
    approval: 'DTCP',
    amenities: ['Ready to Construct'],
  },
  {
    slug: 'vetrivel-nagar',
    name: 'Vetrivel Nagar',
    corridor: 'perumpallam',
    corridorDisplay: 'Perumpallam, Cheyyar',
    sizes: '1,150 sq ft',
    priceInLakhs: 15,
    status: 'available',
    coordinates: { lat: 12.6500, lng: 79.5600 },
    approval: 'DTCP',
    amenities: ['Ready to Construct'],
  },
  {
    slug: 'valli-murugan-nagar',
    name: 'Valli Murugan Nagar',
    corridor: 'perumpallam',
    corridorDisplay: 'Perumpallam, Cheyyar',
    sizes: '600 sq ft',
    priceInLakhs: 4,
    status: 'available',
    coordinates: { lat: 12.6480, lng: 79.5620 },
    approval: 'DTCP',
    amenities: ['Ready to Construct'],
  },
  {
    slug: 'brindavanan-nagar-sengathankudi',
    name: 'Brindavanan Nagar (Sengathankudi)',
    corridor: 'cheyyar',
    corridorDisplay: 'Sengathankudi, Cheyyar',
    sizes: '1,200 sq ft',
    priceInLakhs: 7.5,
    status: 'available',
    coordinates: { lat: 12.6400, lng: 79.5200 },
    approval: 'DTCP',
    amenities: ['Water Line', 'CCTV', 'Fully Compounded', '24×7 Security'],
  },
  {
    slug: 'brindavanan-nagar-irungal',
    name: 'Brindavanan Nagar (Irungal)',
    corridor: 'cheyyar',
    corridorDisplay: 'Irungal, Cheyyar',
    sizes: '1,000 sq ft',
    priceInLakhs: 7.25,
    status: 'available',
    coordinates: { lat: 12.6250, lng: 79.5350 },
    approval: 'DTCP',
    amenities: ['Water Line', 'CCTV', 'Fully Compounded', '24×7 Security'],
  },
  {
    slug: 'sks-nagar',
    name: 'SKS Nagar',
    corridor: 'cheyyar',
    corridorDisplay: 'Sengadu, Cheyyar',
    sizes: '1,200 sq ft',
    priceInLakhs: 3,
    status: 'available',
    coordinates: { lat: 12.6680, lng: 79.5480 },
    approval: 'DTCP',
    amenities: ['DTCP Approved'],
  },
  {
    slug: 'mahalakshmi-nagar',
    name: 'Mahalakshmi Nagar',
    corridor: 'cheyyar',
    corridorDisplay: 'Cheyyar Town',
    sizes: '1,200 sq ft',
    priceInLakhs: 30,
    status: 'available',
    coordinates: { lat: 12.6620, lng: 79.5430 },
    approval: '',
    amenities: ['Blacktop Road', 'Main City Road in Town'],
  },
  {
    slug: 'arunachalam-nagar',
    name: 'Arunachalam Nagar',
    corridor: 'cheyyar',
    corridorDisplay: 'Puliyarambakkam, Cheyyar',
    sizes: '1,200 sq ft',
    priceInLakhs: 6.5,
    status: 'available',
    coordinates: { lat: 12.6750, lng: 79.5380 },
    approval: '',
    amenities: ['Fully Surrendered by Owner', 'Blacktop Road'],
  },
  {
    slug: 'rich-india',
    name: 'Rich India',
    corridor: 'cheyyar',
    corridorDisplay: 'Meranam, Cheyyar',
    sizes: '1,200 sq ft',
    priceInLakhs: 5.4,
    status: 'available',
    coordinates: { lat: 12.6550, lng: 79.5300 },
    approval: 'DTCP',
    amenities: ['Blacktop Road', 'DTCP Approved'],
  },
];

export const CORRIDORS = [
  {
    id: 'papanthangal' as const,
    name: 'Papanthangal',
    tagline: 'Quiet village pocket inside Cheyyar.',
    distance: '~100 km from Chennai',
    center: { lat: 12.6850, lng: 79.5200 },
  },
  {
    id: 'perumpallam' as const,
    name: 'Perumpallam',
    tagline: 'Affordable land, 2 km from Cheyyar town.',
    distance: '~100 km from Chennai',
    center: { lat: 12.6490, lng: 79.5610 },
  },
  {
    id: 'cheyyar' as const,
    name: 'Cheyyar',
    tagline: 'Space, security, and peace of mind.',
    distance: '~100 km from Chennai',
    center: { lat: 12.6620, lng: 79.5430 },
  },
];

// Geographic centre of the project cluster, used to draw a single
// distance arc from Chennai to the area.
export const CLUSTER_CENTER = { lat: 12.658, lng: 79.540 };

export const CHENNAI_REFERENCE = { lat: 13.0827, lng: 80.2707 };
