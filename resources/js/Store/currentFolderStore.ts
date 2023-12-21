import { create } from 'zustand'

type State = {
    folderId: string,
    baseUrl: string
}

type Action = {
    setFolderId: (folderId: State['folderId']) => void,
    setBaseUrl: (baseUrl: State['baseUrl']) => void,
}


const useCurrentFolderStore = create<State & Action>((set, get) => ({
    //state    
    folderId: '',
    baseUrl: '',
    // actions
    setFolderId: (folderId) => set(() => ({ folderId })),
    setBaseUrl: (baseUrl) => set(() => ({ baseUrl })),
}))

export default useCurrentFolderStore