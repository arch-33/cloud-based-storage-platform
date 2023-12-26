import { StoreApi, UseBoundStore, create } from 'zustand'

// auto generating selectors #https://docs.pmnd.rs/zustand/guides/auto-generating-selectors
type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;
const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
    let store = _store as WithSelectors<typeof _store>
    store.use = {}
    for (let k of Object.keys(store.getState())) {
        ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
    }
    return store
}



type State = {
    folderId: string,
}

type Action = {
    setFolderId: (folderId: State['folderId']) => void,
}


const useCurrentFolderStoreBase = create<State & Action>((set) => ({
    //state    
    folderId: '',

    setFolderId: (folderId) => set(() => ({ folderId })),
}))

const useCurrentFolderStore = createSelectors(useCurrentFolderStoreBase)

export default useCurrentFolderStore;



