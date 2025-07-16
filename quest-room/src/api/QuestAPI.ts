import axios from 'axios'

const API_URL = 'http://localhost:3000'

export interface Quest {
    id: number
    title: string
    description: string
    category: string
    duration: number
    players: string
    level: string
    image: string
}

export const getQuests = async (): Promise<Quest[]> => {
    const response = await axios.get<Quest[]>(`${API_URL}/quests`)
    return response.data
}