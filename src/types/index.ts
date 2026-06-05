export type Database = any;

export type UserRole = "super_admin" | "client" | "negotiator";

export type DossierStatus =
  | "nouveau"
  | "pieces_attendues"
  | "analyse_en_cours"
  | "livre"
  | "mediation_en_cours"
  | "conciliation"
  | "relance"
  | "cloture"
  | "archive";

export type DocumentType =
  | "contrat_credit"
  | "releve_bancaire"
  | "fiche_paie"
  | "avis_impot"
  | "courrier_relais"
  | "mise_en_demeure"
  | "preuve_vente"
  | "autre";

export interface Profile {
  id: string;
  email: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  role: UserRole;
  created_at: string;
}

export interface Dossier {
  id: string;
  user_id: string;
  reference: string;
  status: DossierStatus;
  montant_total?: number;
  nb_credits?: number;
  score?: number;
  offre?: "diagnostic" | "mediation";
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  dossier_id: string;
  type: DocumentType;
  nom: string;
  url: string;
  created_at: string;
}

export interface MediationEtape {
  id: string;
  dossier_id: string;
  titre: string;
  description?: string;
  statut: "a_faire" | "en_cours" | "termine";
  ordre: number;
  created_at: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "tel" | "number" | "select" | "radio";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface QuizQuestion {
  name: string;
  label: string;
  invert: boolean;
}

export interface QuizStep {
  title: string;
  fields?: FormField[];
  questions?: QuizQuestion[];
}
