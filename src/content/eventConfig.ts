export interface EventConfig {
  eventName: string;
  seriesTag: string;
  organizer: string;
  creatorName: string;
  creatorUrl: string;
  statusMateri: string;
  eventDatePlaceholder: string;
  venuePlaceholder: string;
  quotaPlaceholder: string;
  categories: {
    id: string;
    name: string;
    distance: string;
    targetQuota: number;
    description: string;
    status: string;
  }[];
  racePackItems: string[];
  contactEmail: string;
  disclaimer: string;
}

export const eventConfig: EventConfig = {
  eventName: "Cianjur Berlari Bupati Series Season 2",
  seriesTag: "Bupati Series 2026 (Usulan Konsep)",
  organizer: "KONI Kabupaten Cianjur",
  creatorName: "Creative Digital Innovation (Creadin.co)",
  creatorUrl: "https://www.creadin.co/",
  statusMateri: "Usulan Konsep & Prototipe Presentasi (Menunggu Konfirmasi Penyelenggara)",
  eventDatePlaceholder: "Menunggu Konfirmasi Penyelenggara",
  venuePlaceholder: "Kawasan Alun-alun / Pendopo Cianjur (Usulan Lokasi)",
  quotaPlaceholder: "2.500 Peserta (Target Usulan)",
  categories: [
    {
      id: "5k-fun",
      name: "5K Fun Run",
      distance: "5 Kilometer",
      targetQuota: 1200,
      description: "Kategori rekreasi untuk pelajar, keluarga, dan pelari pemula.",
      status: "Usulan Kategori",
    },
    {
      id: "10k-open",
      name: "10K Open",
      distance: "10 Kilometer",
      targetQuota: 800,
      description: "Kategori umum bagi komunitas lari dan penggiat kebugaran.",
      status: "Usulan Kategori",
    },
    {
      id: "21k-half",
      name: "21K Half Marathon",
      distance: "21 Kilometer",
      targetQuota: 500,
      description: "Kategori prestasi untuk pelari berpengalaman dan atlet daerah.",
      status: "Usulan Kategori",
    },
  ],
  racePackItems: [
    "Jersey Resmi Acara (Dry-fit)",
    "Nomor BIB dengan Timing Tag Terintegrasi",
    "Tas Serut Eksklusif Peserta",
    "Refreshment Kupon & Merchandise Sponsor",
    "Buku Panduan Keselamatan & Rute Lomba",
  ],
  contactEmail: "info@link-domain-anda.com (Simulasi)",
  disclaimer:
    "Materi dan angka dalam presentasi ini merupakan konsep usulan dan data simulasi untuk peninjauan pemangku kepentingan KONI Cianjur, bukan rilis publik resmi.",
};

