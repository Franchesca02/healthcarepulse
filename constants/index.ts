export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/public/assets/images/dr-green.png",
    name: "John Green",
  },
  {
    image: "/public/assets/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/public/assets/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/public/assets/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/public/assets/images/dr-powell.png",
    name: "Jane Powell",
  },
  {
    image: "/public/assets/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/public/assets/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/public/assets/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/public/assets/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/public/assets/icons/check.svg",
  pending: "/public/assets/icons/pending.svg",
  cancelled: "/public/assets/icons/cancelled.svg",
};