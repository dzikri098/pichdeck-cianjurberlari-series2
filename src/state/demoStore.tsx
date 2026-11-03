"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { Participant, initialParticipants } from "@/data/participants";

export interface RegistrationFormData {
  fullName: string;
  nik: string;
  email: string;
  phone: string;
  category: "5K Fun Run" | "10K Open" | "21K Half Marathon";
  tshirtSize: "S" | "M" | "L" | "XL" | "XXL";
  bloodType: "A" | "B" | "AB" | "O";
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface DemoContextType {
  participants: Participant[];
  currentParticipant: Participant;
  lastRegisteredParticipant: Participant | null;
  registerParticipant: (data: RegistrationFormData) => Participant;
  checkNikAvailability: (nik: string) => { isAvailable: boolean; existingParticipant?: Participant };
  claimRacePack: (
    qrToken: string,
    officerName: string,
    proofImagePreview?: string
  ) => { success: boolean; message: string; participant?: Participant };
  lookupParticipantByToken: (token: string) => Participant | null;
  setCurrentParticipantById: (id: string) => void;
  resetDemo: () => void;
  kpis: {
    totalRegistered: number;
    totalClaimed: number;
    totalUnclaimed: number;
    claimRatePercent: number;
    categoryCounts: { [key: string]: number };
  };
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const [currentParticipantId, setCurrentParticipantId] = useState<string>(initialParticipants[0].id);
  const [lastRegisteredParticipant, setLastRegisteredParticipant] = useState<Participant | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const currentParticipant = useMemo(() => {
    return (
      participants.find((p) => p.id === currentParticipantId) ||
      participants[0]
    );
  }, [participants, currentParticipantId]);

  const kpis = useMemo(() => {
    const total = participants.length;
    const claimed = participants.filter((p) => p.racePackStatus === "CLAIMED").length;
    const unclaimed = total - claimed;
    const rate = total > 0 ? Math.round((claimed / total) * 100) : 0;

    const categoryCounts: { [key: string]: number } = {
      "5K Fun Run": 0,
      "10K Open": 0,
      "21K Half Marathon": 0,
    };

    participants.forEach((p) => {
      if (categoryCounts[p.category] !== undefined) {
        categoryCounts[p.category]++;
      }
    });

    return {
      totalRegistered: total,
      totalClaimed: claimed,
      totalUnclaimed: unclaimed,
      claimRatePercent: rate,
      categoryCounts,
    };
  }, [participants]);

  const checkNikAvailability = (nik: string): { isAvailable: boolean; existingParticipant?: Participant } => {
    const cleanNik = nik.replace(/\s+/g, "");
    if (!cleanNik) return { isAvailable: true };
    const found = participants.find((p) => p.nik && p.nik.replace(/\s+/g, "") === cleanNik);
    return {
      isAvailable: !found,
      existingParticipant: found,
    };
  };

  const registerParticipant = (data: RegistrationFormData): Participant => {
    const cleanNik = data.nik.replace(/\s+/g, "");
    const existing = participants.find((p) => p.nik && p.nik.replace(/\s+/g, "") === cleanNik);
    if (existing) {
      throw new Error(
        `Perlindungan 1 Tiket 1 NIK: NIK ${data.nik} telah terdaftar atas nama ${existing.fullName} (BIB ${existing.bibNumber}).`
      );
    }

    const prefix = data.category.startsWith("5K")
      ? "5K"
      : data.category.startsWith("10K")
      ? "10K"
      : "21K";
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CB2-${prefix}-${randNum}`;
    const newBib = `${prefix === "5K" ? "5" : prefix === "10K" ? "1" : "2"}${Math.floor(
      100 + Math.random() * 900
    )}`;
    const newQrToken = `CB2-QR-${prefix}-${randNum}`;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}, ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")} WIB`;

    const newParticipant: Participant = {
      id: newId,
      fullName: data.fullName.trim(),
      nik: cleanNik,
      email: data.email.trim().toLowerCase(),
      phone: data.phone.trim(),
      category: data.category,
      bibNumber: newBib,
      registrationStatus: "VERIFIED",
      racePackStatus: "UNCLAIMED",
      qrToken: newQrToken,
      registrationDate: formattedDate,
      tshirtSize: data.tshirtSize,
      bloodType: data.bloodType,
      emergencyContactName: data.emergencyContactName.trim(),
      emergencyContactPhone: data.emergencyContactPhone.trim(),
    };

    setParticipants((prev) => [newParticipant, ...prev]);
    setCurrentParticipantId(newId);
    setLastRegisteredParticipant(newParticipant);
    return newParticipant;
  };

  const lookupParticipantByToken = (token: string): Participant | null => {
    const cleanToken = token.trim().toUpperCase();
    return (
      participants.find(
        (p) =>
          p.qrToken.toUpperCase() === cleanToken ||
          p.id.toUpperCase() === cleanToken ||
          p.bibNumber === cleanToken
      ) || null
    );
  };

  const claimRacePack = (
    qrToken: string,
    officerName: string,
    proofImagePreview?: string
  ): { success: boolean; message: string; participant?: Participant } => {
    const found = lookupParticipantByToken(qrToken);
    if (!found) {
      return { success: false, message: "Kode QR atau nomor peserta tidak ditemukan dalam sistem." };
    }

    if (found.racePackStatus === "CLAIMED") {
      return {
        success: false,
        message: "Race pack untuk peserta ini sudah pernah diambil sebelumnya.",
        participant: found,
      };
    }

    const now = new Date();
    const formattedTime = `${now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}, ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")} WIB`;

    const updated: Participant = {
      ...found,
      racePackStatus: "CLAIMED",
      claimedAt: formattedTime,
      claimedBy: officerName || "Petugas Meja Utama (Simulasi)",
      proofImagePreview: proofImagePreview || "/mockups/proof-sample.svg",
    };

    setParticipants((prev) => prev.map((p) => (p.id === found.id ? updated : p)));
    return {
      success: true,
      message: "Verifikasi berhasil. Status pengambilan race pack telah diperbarui.",
      participant: updated,
    };
  };

  const setCurrentParticipantById = (id: string) => {
    const target = participants.find((p) => p.id === id);
    if (target) {
      setCurrentParticipantId(id);
    }
  };

  const resetDemo = () => {
    setParticipants(initialParticipants);
    setCurrentParticipantId(initialParticipants[0].id);
    setLastRegisteredParticipant(null);
    setFilterCategory("ALL");
    setFilterStatus("ALL");
  };

  return (
    <DemoContext.Provider
      value={{
        participants,
        currentParticipant,
        lastRegisteredParticipant,
        registerParticipant,
        checkNikAvailability,
        claimRacePack,
        lookupParticipantByToken,
        setCurrentParticipantById,
        resetDemo,
        kpis,
        filterCategory,
        setFilterCategory,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoStore() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemoStore must be used within a DemoProvider");
  }
  return context;
}

