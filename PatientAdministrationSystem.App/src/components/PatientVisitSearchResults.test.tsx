import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import PatientVisitSearchResults from './PatientVisitSearchResults';
import PatientHospitalVisitSearchResult from '../types/PatientHospitalVisitSearchResult';

/**
 * Tests for the PatientVisitSearchResults component.
 */
describe('Patient Visit Search Results Component', () => {
  it('renders when search results are empty', () => {

    // Arrange: Render the component with an empty list of search results
    const searchResults: PatientHospitalVisitSearchResult[] = [];
    render(<PatientVisitSearchResults searchResults={searchResults} />);

    // Act: Query the rendered content
    const searchResultsTableElement = screen.queryByTestId('SearchResultsTable');
    const noResultsFoundDivElement = screen.queryByTestId('NoResultsFound');


    // Assert: Check if the "no results found" div is in the document but the search results table is not
    expect(searchResultsTableElement).not.toBeInTheDocument();
    expect(noResultsFoundDivElement).toBeInTheDocument();

  });

  it('renders for a single search result', () => {

    // Arrange: Render the component with a list of search results with a single entry
    const searchResults: PatientHospitalVisitSearchResult[] = [{
      visitId: 'Visit0',
      patientFirstName: '',
      patientLastName: '',
      hospitalName: '',
      visitDateString: '',
      visitDate: new Date(0)
    }];
    render(<PatientVisitSearchResults searchResults={searchResults} />);

    // Act: Query the rendered content
    const searchResultsTableElement = screen.queryByTestId('SearchResultsTable');
    const noResultsFoundDivElement = screen.queryByTestId('NoResultsFound');

    // Assert: Check if the "no results found" div is not in the document but the search results table is 
    expect(searchResultsTableElement).toBeInTheDocument();
    expect(noResultsFoundDivElement).not.toBeInTheDocument();

    if (searchResultsTableElement) {
      //NB searchResultsTableElement is always popluated if the  expect(searchResultsTableElement).toBeInTheDocument(); has executed ok
      const tableRows = within(searchResultsTableElement).getAllByRole('row');
      //1 header row and 1 body row in the table
      expect(tableRows.length).toBe(2);
    }

  });

  it('renders for multiple search results', () => {

    // Arrange: Render the component with list of multiple search search results
    const searchResults: PatientHospitalVisitSearchResult[] = [{
      visitId: 'Visit0',
      patientFirstName: '',
      patientLastName: '',
      hospitalName: '',
      visitDateString: '',
      visitDate: new Date(0)
    }, {
      visitId: 'Visit1',
      patientFirstName: '',
      patientLastName: '',
      hospitalName: '',
      visitDateString: '',
      visitDate: new Date(0)
    }, {
      visitId: 'Visit2',
      patientFirstName: '',
      patientLastName: '',
      hospitalName: '',
      visitDateString: '',
      visitDate: new Date(0)
    }, {
      visitId: 'Visit3',
      patientFirstName: '',
      patientLastName: '',
      hospitalName: '',
      visitDateString: '',
      visitDate: new Date(0)
    }];

    render(<PatientVisitSearchResults searchResults={searchResults} />);

    // Act: Query the rendered content
    const searchResultsTableElement = screen.queryByTestId('SearchResultsTable');
    const noResultsFoundDivElement = screen.queryByTestId('NoResultsFound');

    // Assert: Check if the "no results found" div is not in the document but the search results table is 
    expect(searchResultsTableElement).toBeInTheDocument();
    expect(noResultsFoundDivElement).not.toBeInTheDocument();

    if (searchResultsTableElement) {
      //NB searchResultsTableElement is always popluated if the  expect(searchResultsTableElement).toBeInTheDocument(); has executed ok
      const tableRows = within(searchResultsTableElement).getAllByRole('row');
      //1 header row and 4 body rows in the table
      expect(tableRows.length).toBe(5);
    }

  });



});
