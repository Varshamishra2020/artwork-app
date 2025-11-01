import type { SelectionState } from "../types/artwork";

export class SelectionManager {
  private selections: SelectionState = {};

  setSelection(page: number, id: number, selected: boolean): void {
    if (!this.selections[page]) {
      this.selections[page] = {};
    }
    this.selections[page][id] = selected;
  }

  getSelection(page: number, id: number): boolean {
    return this.selections[page]?.[id] || false;
  }

  getSelectedCount(): number {
    let count = 0;
    for (const page in this.selections) {
      count += Object.values(this.selections[page]).filter(Boolean).length;
    }
    return count;
  }

  getAllSelectedIds(): number[] {
    const selectedIds: number[] = [];
    for (const page in this.selections) {
      for (const id in this.selections[page]) {
        if (this.selections[page][id]) {
          selectedIds.push(parseInt(id));
        }
      }
    }
    return selectedIds;
  }

  clearSelections(): void {
    this.selections = {};
  }
}
