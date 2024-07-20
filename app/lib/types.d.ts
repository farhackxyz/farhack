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
    tracks: Track[];
    bounties: Bounty[];
    schedule: ScheduleItem[];
  }
  
  export interface Track {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Bounty {
    id: number;
    name: string;
    description: string;
  }
  
  export interface ScheduleItem {
    id: number;
    name: string;
    date: Date;
    url: string;
  }
  
  export interface Team {
    id: number;
    fids: number[];
    name: string;
    description: string;
    hackathon_id: number;
    submitted_at: Date;
  }
  