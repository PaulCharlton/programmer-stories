export type CompanyName =
  | "Apple"
  | "Barclays"
  | "BP"
  | "Cisco"
  | "Carnegie Mellon University"
  | "DeepMind"
  | "D. E. Shaw"
  | "Google"
  | "Hewlett-Packard"
  | "Intuit"
  | "J.P. Morgan"
  | "Microsoft"
  | "Morgan Stanley"
  | "Michigan State University"
  | "Rensselaer Polytechnic Institute"
  | "Stanford University"
  | "Sun Microsystems"
  | "University of Chicago"
  | "United States of America";

export interface Company {
  name: CompanyName;
  file: string;
}

export const Companies: Record<CompanyName, Company> = {
  Apple: { name: "Apple", file: "apple.svg" },
  Barclays: { name: "Barclays", file: "barclays.svg" },
  BP: { name: "BP", file: "bp.svg" },
  Cisco: { name: "Cisco", file: "cisco.svg" },
  "Carnegie Mellon University": {
    name: "Carnegie Mellon University",
    file: "cmu.svg",
  },
  DeepMind: { name: "DeepMind", file: "deepmind.svg" },
  "D. E. Shaw": { name: "D. E. Shaw", file: "deshaw.svg" },
  Google: { name: "Google", file: "google.svg" },
  "Hewlett-Packard": { name: "Hewlett-Packard", file: "hp.png" },
  Intuit: { name: "Intuit", file: "intuit.svg" },
  "J.P. Morgan": { name: "J.P. Morgan", file: "jp.svg" },
  Microsoft: { name: "Microsoft", file: "microsoft.svg" },
  "Morgan Stanley": { name: "Morgan Stanley", file: "morganstanley.svg" },
  "Michigan State University": {
    name: "Michigan State University",
    file: "msu.svg",
  },
  "Rensselaer Polytechnic Institute": {
    name: "Rensselaer Polytechnic Institute",
    file: "rpi.png",
  },
  "Stanford University": { name: "Stanford University", file: "sta.svg" },
  "Sun Microsystems": { name: "Sun Microsystems", file: "sun.svg" },
  "University of Chicago": {
    name: "University of Chicago",
    file: "uchicago.svg",
  },
  "United States of America": {
    name: "United States of America",
    file: "usa.svg",
  },
};
