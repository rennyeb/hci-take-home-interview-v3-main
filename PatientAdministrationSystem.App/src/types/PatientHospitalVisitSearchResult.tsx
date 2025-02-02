type PatientHospitalVisitSearchResult = {
  visitId: string;
  patientFirstName: string;
  patientLastName: string;
  hospitalName: string;
  visitDateString: string;
  visitDate: Date;
};

export default PatientHospitalVisitSearchResult;
