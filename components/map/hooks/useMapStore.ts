'use client';

import { create } from 'zustand';
import type { MapProject } from '@/lib/data/map-projects';

type CorridorFilter = 'all' | 'papanthangal' | 'perumpallam' | 'cheyyar';

interface MapState {
  activeFilter: CorridorFilter;
  selectedProject: MapProject | null;
  hoveredProject: MapProject | null;
  drawerOpen: boolean;
  isInteracting: boolean;

  setFilter: (f: CorridorFilter) => void;
  selectProject: (p: MapProject | null) => void;
  hoverProject: (p: MapProject | null) => void;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  setInteracting: (v: boolean) => void;
  reset: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  activeFilter: 'all',
  selectedProject: null,
  hoveredProject: null,
  drawerOpen: false,
  isInteracting: false,

  setFilter: (f) => set({ activeFilter: f, selectedProject: null }),
  selectProject: (p) => set({ selectedProject: p, isInteracting: p !== null }),
  hoverProject: (p) => set({ hoveredProject: p }),
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  setDrawerOpen: (open) => set({ drawerOpen: open }),
  setInteracting: (v) => set({ isInteracting: v }),
  reset: () =>
    set({
      activeFilter: 'all',
      selectedProject: null,
      hoveredProject: null,
      drawerOpen: false,
      isInteracting: false,
    }),
}));
