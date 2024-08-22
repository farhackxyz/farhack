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

  export interface Ticket {
    id: number;
    user_id: number;
    user_address: string;
    hackathon_id: number;
    txn_hash: string;
    ticket_type: string; // 'priority' | 'day'
    created_at: Date;
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

  export interface Invite {
    id: number;
    token: string;
    created_at: Date;
    expires_at: Date;
    user_id: number;
    accepted_at?: Date;
    accepted_by: number;
    team_id: number;
  }

  export type State = {
    count: number;
  };
  