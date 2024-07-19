
export interface SessionUser {
    id: string;
    name: string;
    image: string;
    }
  
export interface User {
    id: number;
    created_at: Date;
    name: string;
    image: string;
    is_admin: boolean;
}
  
export interface Hackathon {
    id: number;
    name: string;
    description: string;
    slug: string;
    square_image: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    tracks: object;
    bounties: object;
    schedule: object;
}  