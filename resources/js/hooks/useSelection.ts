import { useCallback, useEffect, useMemo, useState } from "react";

export interface Item {
    id: string;
}

function useSelection<T extends Item>(data: T[], defaultSelection: string[] = []) {

    const [selection, setSelection] = useState<Set<string>>(
        new Set<string>(defaultSelection)
    );

    const isSelected = useCallback((id: string) => selection.has(id), [
        selection,
    ]);

    const toggleSelection = useCallback((id: string, value: boolean) => {
        setSelection((selection) => {
            const newSelection = new Set(selection);
            if (value) {
                newSelection.delete(id);
            } else {
                newSelection.add(id);
            }
            return newSelection;
        });
    }, []);

    const toggleSelectionAll = useCallback((value: boolean) => {
        setSelection((selection) => {
            // const areAllSelected = selection.size === data.length;
            let newSelection = new Set<string>();
            if (!value) {
                newSelection = new Set(data.map((i) => i.id));
            }
            return newSelection;
        });
    }, [data]);

    const isAllSelected = useMemo(() => {
        return selection.size !== 0 && selection.size === data.length;
    }, [data, selection]);

    const isSomeSelected = useMemo(() => {
        return selection.size < data.length && selection.size > 0;
    }, [data, selection])

    useEffect(() => {
        // check if items and current selection are in sync
        // for example when removing item
        const dataIds = data.map((d) => d.id);
        setSelection((selection) => {
            const newSelection = new Set(selection);
            selection.forEach((item) => {
                if (!dataIds.includes(item)) {
                    newSelection.delete(item);
                }
            });
            return newSelection;
        });
    }, [data]);

    const clearSelection = useCallback(() => {
        setSelection(new Set<string>());
    }, []);

    const selectedItems = useMemo(() => {
        const selectedItems: T[] = [];
        selection.forEach((id) => {
            const findItem = data.find((d) => d.id === id);
            if (findItem) {
                selectedItems.push(findItem);
            }
        });
        return selectedItems;
    }, [selection, data]);

    const setSelected = useCallback(
        (selectionOrCallback: string[] | ((selection: string[]) => string[])) => {
            if (Array.isArray(selectionOrCallback)) {
                setSelection(new Set(selectionOrCallback));
            } else {
                setSelection(
                    (currentSelection) =>
                        new Set(selectionOrCallback(Array.from(currentSelection)))
                );
            }
        },
        []
    );

    return {
        selection: Array.from(selection),
        isSelected,
        isSomeSelected,
        toggleSelection,
        toggleSelectionAll,
        isAllSelected,
        clearSelection,
        selectedItems,
        totalSelected: selection.size,
        setSelected,
        data,
    };
}

export default useSelection;
export { useSelection };
