// Table 1 of the paper: share of histopathology request forms with each field filled in,
// before (6,869 forms) and after (1,527 forms) the orientation program.
// `sig` marks a statistically significant change at the 95% confidence level.
export const GROUPS = [
  {
    name: 'Patient information',
    fields: [
      { label: 'Patient name', before: 100.0, after: 100.0, sig: false },
      { label: 'Age', before: 99.88, after: 100.0, sig: false },
      { label: 'Ward', before: 98.68, after: 95.15, sig: true },
      { label: 'Contact number', before: 67.64, after: 99.08, sig: true },
      { label: 'Gender', before: 95.17, after: 99.48, sig: true },
      { label: 'Bed head ticket number', before: 99.59, after: 99.87, sig: false },
    ],
  },
  {
    name: 'Clinical information',
    fields: [
      { label: 'Specimen type and size', before: 99.88, after: 100.0, sig: false },
      { label: 'Relevant clinical history', before: 97.0, after: 96.79, sig: false },
      { label: 'Probable or differential diagnosis', before: 68.26, after: 88.47, sig: true },
      { label: 'Relevant radiological findings', before: 83.71, after: 54.62, sig: true },
      { label: 'Details of a previous biopsy', before: 73.48, after: 96.99, sig: true },
      { label: 'Neoadjuvant therapy given or not', before: 62.98, after: 97.58, sig: true },
      { label: 'Operative or endoscopic findings', before: 69.82, after: 97.31, sig: true },
      { label: 'Specimen orientation', before: 54.88, after: 98.04, sig: true },
    ],
  },
  {
    name: 'Administrative information',
    fields: [
      { label: 'Date', before: 97.13, after: 98.69, sig: true },
      { label: 'Name of the doctor', before: 72.98, after: 86.38, sig: true },
      { label: 'Designation', before: 67.71, after: 75.44, sig: true },
      { label: "Consultant's seal", before: 38.58, after: 24.43, sig: true },
      { label: 'Signature', before: 88.11, after: 98.95, sig: true },
      { label: 'Name of the consultant', before: 97.44, after: 99.35, sig: true },
    ],
  },
];

export const FIELDS = GROUPS.flatMap((g) => g.fields.map((f) => ({ ...f, group: g.name })));

export const average = (key) => FIELDS.reduce((sum, f) => sum + f[key], 0) / FIELDS.length;
