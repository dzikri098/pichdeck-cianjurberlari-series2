export interface Participant {
  id: string;
  fullName: string;
  nik: string;
  email: string;
  phone: string;
  category: "5K Fun Run" | "10K Open" | "21K Half Marathon";
  bibNumber: string;
  registrationStatus: "VERIFIED" | "PENDING";
  racePackStatus: "UNCLAIMED" | "CLAIMED";
  qrToken: string;
  registrationDate: string;
  tshirtSize: "S" | "M" | "L" | "XL" | "XXL";
  bloodType: "A" | "B" | "AB" | "O";
  emergencyContactName: string;
  emergencyContactPhone: string;
  claimedAt?: string;
  claimedBy?: string;
  proofImagePreview?: string;
}

export const initialParticipants: Participant[] = [
  {
    id: "CB2-5K-0104",
    fullName: "Rian Hidayat",
    nik: "3203011205940001",
    email: "rian.hidayat@example.com",
    phone: "0812-3456-7890",
    category: "5K Fun Run",
    bibNumber: "5104",
    registrationStatus: "VERIFIED",
    racePackStatus: "UNCLAIMED",
    qrToken: "CB2-QR-5K-0104",
    registrationDate: "12 Oktober 2026, 09:15 WIB",
    tshirtSize: "L",
    bloodType: "O",
    emergencyContactName: "Siti Rahma (Istri)",
    emergencyContactPhone: "0812-9988-7766",
  },
  {
    id: "CB2-10K-0042",
    fullName: "Nadia Safitri",
    nik: "3203024508980002",
    email: "nadia.safitri@example.com",
    phone: "0813-9876-5432",
    category: "10K Open",
    bibNumber: "1042",
    registrationStatus: "VERIFIED",
    racePackStatus: "CLAIMED",
    qrToken: "CB2-QR-10K-0042",
    registrationDate: "10 Oktober 2026, 14:30 WIB",
    tshirtSize: "M",
    bloodType: "A",
    emergencyContactName: "Bambang Safitri (Ayah)",
    emergencyContactPhone: "0813-2233-4455",
    claimedAt: "24 Oktober 2026, 10:14 WIB",
    claimedBy: "Petugas Meja 3 (Ahmad Fauzi)",
    proofImagePreview: "/mockups/proof-sample.svg",
  },
  {
    id: "CB2-21K-0018",
    fullName: "Dimas Prasetyo",
    nik: "3203031011920003",
    email: "dimas.prasetyo@example.com",
    phone: "0856-7890-1234",
    category: "21K Half Marathon",
    bibNumber: "2018",
    registrationStatus: "VERIFIED",
    racePackStatus: "UNCLAIMED",
    qrToken: "CB2-QR-21K-0018",
    registrationDate: "14 Oktober 2026, 11:05 WIB",
    tshirtSize: "XL",
    bloodType: "B",
    emergencyContactName: "Dewi Lestari (Keluarga)",
    emergencyContactPhone: "0856-1122-3344",
  },
  {
    id: "CB2-5K-0215",
    fullName: "Dewi Anggraini",
    nik: "3203046003960004",
    email: "dewi.anggraini@example.com",
    phone: "0877-6543-2109",
    category: "5K Fun Run",
    bibNumber: "5215",
    registrationStatus: "VERIFIED",
    racePackStatus: "UNCLAIMED",
    qrToken: "CB2-QR-5K-0215",
    registrationDate: "15 Oktober 2026, 16:40 WIB",
    tshirtSize: "S",
    bloodType: "AB",
    emergencyContactName: "Agus Pratama (Suami)",
    emergencyContactPhone: "0877-9900-1122",
  },
  {
    id: "CB2-10K-0089",
    fullName: "Fajar Nugraha",
    nik: "3203051407950005",
    email: "fajar.nugraha@example.com",
    phone: "0819-0123-4567",
    category: "10K Open",
    bibNumber: "1089",
    registrationStatus: "VERIFIED",
    racePackStatus: "UNCLAIMED",
    qrToken: "CB2-QR-10K-0089",
    registrationDate: "16 Oktober 2026, 08:20 WIB",
    tshirtSize: "M",
    bloodType: "O",
    emergencyContactName: "Hendra Nugraha (Saudara)",
    emergencyContactPhone: "0819-3344-5566",
  },
  {
    id: "CB2-21K-0055",
    fullName: "Kartika Putri",
    nik: "3203065209970006",
    email: "kartika.putri@example.com",
    phone: "0821-4567-8901",
    category: "21K Half Marathon",
    bibNumber: "2055",
    registrationStatus: "VERIFIED",
    racePackStatus: "CLAIMED",
    qrToken: "CB2-QR-21K-0055",
    registrationDate: "11 Oktober 2026, 13:10 WIB",
    tshirtSize: "M",
    bloodType: "A",
    emergencyContactName: "Putri Rahayu (Ibu)",
    emergencyContactPhone: "0821-7788-9900",
    claimedAt: "24 Oktober 2026, 11:42 WIB",
    claimedBy: "Petugas Meja 1 (Nurul Indah)",
    proofImagePreview: "/mockups/proof-sample.svg",
  },
];

