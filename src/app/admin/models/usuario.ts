export interface Usuario {
    id?: number;
    email: string;
    email_verified_at?: Date;
    password?: string;
    persona_id: number;
    estado?: number;
    remember_token?: string;
    created_at?: Date;
    updated_at?: Date;
}