export interface CreateGamePayload {
    name: string;
    startTime: string; // ISO строка, например "2025-04-24T09:15:23.919Z"
    endOfRegistration: string; // ISO строка
    maxPlayers: number;
  }

  export interface Game {
    id: string,
    name: string,
    startTime: string, // ISO 8601 format
    endOfRegistration: string, // ISO 8601 format
    maxPlayers: number,
    currentPlayers: number,
    createdAt: string, // ISO 8601 format
    gameRegistrations: null,
    photos: null 
  }