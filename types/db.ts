export interface Room {
    id: string
    user_id: string
    created_at: string
}

export interface RoomMovie {
    id: string
    room_id: string
    user_id: string
    movie_id: number
    created_at: string
}
