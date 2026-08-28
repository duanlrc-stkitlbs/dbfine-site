export type ProductCategory =
  | 'fine-chemicals'
  | 'solvents'
  | 'api'
  | 'reagents';

export type ChemicalGrade =
  | 'USP/BP/EP'
  | 'HPLC'
  | 'LC-MS'
  | 'AR (Analytical Reagent)'
  | 'Spectrophotometric'
  | 'Technical Grade';

export type HazardClass =
  | 'Flammable Liquid (Class 3)'
  | 'Corrosive (Class 8)'
  | 'Toxic / Harmful (Class 6.1)'
  | 'Oxidizer (Class 5.1)'
  | 'Non-Hazardous / GHS Compliant'
  | 'Irritant / Target Organ (Class 9)';

export interface PackagingOption {
  size: string;
  unit: string;
  type: string; // e.g. 'Amber Glass Bottle', 'HDPE Drum', 'Steel Drum', 'IBC Tote', 'Bulk Tanker'
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  casNumber: string;
  category: ProductCategory;
  grade: ChemicalGrade;
  purity: string;
  molecularFormula?: string;
  molecularWeight?: string;
  appearance?: string;
  assay?: string;
  hazardClass: HazardClass;
  ghsPictograms: string[]; // e.g. ['flame', 'corrosion', 'health-hazard', 'exclamation']
  description: string;
  applications: string[];
  packagingOptions: PackagingOption[];
  minOrderQty: number;
  unit: string;
  leadTime: string;
  inStockGauteng: boolean;
  sahpraRegulated: boolean;
  sahpraSchedule?: string;
  synonyms?: string[];
}

export interface ComplianceDocument {
  id: string;
  productId: string;
  productName: string;
  casNumber: string;
  batchNumber: string;
  docType: 'COA' | 'SDS' | 'SPEC';
  title: string;
  issueDate: string;
  expiryDate?: string;
  r2Key: string;
  fileSize: string;
  parameters?: Array<{
    parameter: string;
    specification: string;
    actualResult: string;
    status: 'PASS' | 'CONFORMS';
  }>;
  ghsClassification?: {
    signalWord: 'DANGER' | 'WARNING';
    hazardStatements: string[];
    precautionaryStatements: string[];
    sansClassification: string;
  };
}

export interface RfqItem {
  productId: string;
  productName: string;
  casNumber: string;
  grade: ChemicalGrade;
  purity: string;
  packagingFormat: string;
  quantity: number;
  unit: string;
  requestSample: boolean;
}

export interface RfqSubmission {
  id?: string;
  referenceCode?: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  deliveryAddress: string;
  sahpraLicenseNumber?: string;
  sahpraLicenseStatus?: 'verified' | 'pending' | 'not_applicable';
  destinationFacilityType: 'manufacturing_plant' | 'pharma_compounder' | 'qa_qc_lab' | 'academic_rnd' | 'wholesale_distributor';
  requiredDeliveryDate?: string;
  items: RfqItem[];
  notes?: string;
  specialHandlingNotes?: string;
  includeSampleKit: boolean;
  sampleKitDetails?: string;
  status?: 'PENDING' | 'DISPATCHED' | 'QUOTED';
  createdAt?: string;
}

export interface SampleRequest {
  id?: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  deliveryAddress: string;
  targetChemical: string;
  casNumber?: string;
  grade: string;
  trialApplication: string;
  estimatedCommercialVolume: string;
  trackingNumber?: string;
  status?: 'RECEIVED' | 'PREPARING' | 'DISPATCHED';
  createdAt?: string;
}
