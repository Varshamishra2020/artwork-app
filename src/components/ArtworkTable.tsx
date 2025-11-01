import React, { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import type { PaginatorPageChangeEvent } from "primereact/paginator";
import type { Artwork, ArtworkApiResponse } from "../types/artwork";
import { SelectionManager } from "../utils/selectionManager";

const ArtworkTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(12);

  const selectionManager = useRef(new SelectionManager());
  const [selectedCount, setSelectedCount] = useState<number>(0);

  /** Fetch artworks */
  const fetchArtworks = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page}&limit=${limit}`
      );
      const data: ArtworkApiResponse = await response.json();

      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
      setCurrentPage(data.pagination.current_page);
    } catch (err) {
      console.error("Error fetching artworks:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /** Fetch on page or rows change */
  useEffect(() => {
    fetchArtworks(currentPage, rows);
  }, [currentPage, rows, fetchArtworks]);

  /** Handle paginator change */
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    const newPage = Math.floor(event.first / event.rows) + 1;
    setFirst(event.first);
    setRows(event.rows);
    setCurrentPage(newPage);
  };

  /** Selection logic */
  const onSelectionChange = useCallback(
    (artworkId: number, selected: boolean) => {
      selectionManager.current.setSelection(currentPage, artworkId, selected);
      setSelectedCount(selectionManager.current.getSelectedCount());
    },
    [currentPage]
  );

  const isRowSelected = useCallback(
    (artworkId: number): boolean =>
      selectionManager.current.getSelection(currentPage, artworkId),
    [currentPage]
  );

  const selectAllOnCurrentPage = useCallback(
    (selected: boolean) => {
      artworks.forEach((art) =>
        selectionManager.current.setSelection(currentPage, art.id, selected)
      );
      setSelectedCount(selectionManager.current.getSelectedCount());
    },
    [artworks, currentPage]
  );

  const clearAllSelections = useCallback(() => {
    selectionManager.current.clearSelections();
    setSelectedCount(0);
  }, []);

  /** Header checkbox (using tristate for proper typing) */
  const selectionHeaderTemplate = useCallback(() => {
    const allSelected =
      artworks.length > 0 && artworks.every((art) => isRowSelected(art.id));
    const someSelected =
      artworks.some((art) => isRowSelected(art.id)) && !allSelected;

    return (
      <Checkbox
        onChange={(e) => selectAllOnCurrentPage(Boolean(e.checked))}
        checked={allSelected}
        tristate={true}
        value={someSelected ? null : allSelected}
      />
    );
  }, [artworks, isRowSelected, selectAllOnCurrentPage]);

  /** Row checkbox */
  const selectionBodyTemplate = useCallback(
    (rowData: Artwork) => (
      <Checkbox
        checked={isRowSelected(rowData.id)}
        onChange={(e) => onSelectionChange(rowData.id, Boolean(e.checked))}
      />
    ),
    [isRowSelected, onSelectionChange]
  );

  /** Render helpers */
  const titleBodyTemplate = (rowData: Artwork) => (
    <span>{rowData.title || "Untitled"}</span>
  );
  const originBodyTemplate = (rowData: Artwork) => (
    <span>{rowData.place_of_origin || "Unknown"}</span>
  );
  const artistBodyTemplate = (rowData: Artwork) => (
    <span>{rowData.artist_display || "Unknown"}</span>
  );
  const inscriptionsBodyTemplate = (rowData: Artwork) => (
    <span>{rowData.inscriptions || "None"}</span>
  );
  const dateBodyTemplate = (rowData: Artwork) => {
    const { date_start: start, date_end: end } = rowData;
    if (start && end) {
      return <span>{start === end ? start : `${start} - ${end}`}</span>;
    }
    return <span>{start ?? end ?? "Unknown"}</span>;
  };

  /** Top selection summary */
  const selectionPanelTemplate = () => (
    <div className="flex align-items-center justify-content-between p-3 surface-ground border-round mb-3">
      <span className="text-lg font-semibold">Selected: {selectedCount}</span>
      <Button
        label="Clear All"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={clearAllSelections}
        disabled={selectedCount === 0}
      />
    </div>
  );

  return (
    <div className="card">
      <h1>Art Institute of Chicago - Artworks</h1>

      {selectionPanelTemplate()}

      <DataTable
        value={artworks}
        loading={loading}
        size="small"
        scrollable
        style={{ minWidth: "50rem" }}
      >
        <Column
          header={selectionHeaderTemplate}
          body={selectionBodyTemplate}
          style={{ width: "3rem" }}
        />
        <Column field="title" header="Title" body={titleBodyTemplate} />
        <Column
          field="place_of_origin"
          header="Origin"
          body={originBodyTemplate}
        />
        <Column
          field="artist_display"
          header="Artist"
          body={artistBodyTemplate}
        />
        <Column
          field="inscriptions"
          header="Inscriptions"
          body={inscriptionsBodyTemplate}
        />
        <Column header="Date" body={dateBodyTemplate} />
      </DataTable>

      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} artworks"
      />
    </div>
  );
};

export default ArtworkTable;
