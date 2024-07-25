import { BASE_URL } from "./utils";

export const getHackathon = async(slug: string) => {
    const req = await fetch(`${BASE_URL}/api/hackathons?slug=${slug}`);
    const res = await req.json();
    return res;
}

export const getTeam = async(id: string) => {
    const req = await fetch(`${BASE_URL}/api/hackathons/teams?id=${id}`);
    const res = await req.json();
    return res;
}

export const getTeams = async() => {
    const req = await fetch(`${BASE_URL}/api/hackathons/teams`);
    const res = await req.json();
    return res;
}