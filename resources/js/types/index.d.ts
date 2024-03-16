export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
}

export interface FileDataType {
    id: number;
    uuid: string;
    name: string;
    is_folder: boolean;
    parent_id?: number;
    mime_type?: string | null;
    size: string;
    owner: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    deleted_at?: null;
}

export type FileActions = "Share" | "Download" | "Move To Trash" | "Delete" | "Restore" /*from trash*/;

export type FileManagerRoutes = {
    home: string,
    neested?: string
    download?: string,
    delete?: string,
    restore?: string,
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
