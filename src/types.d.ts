export interface Message {
  body: string
  from: string | number
  room: string
}

export interface CollectionRoom {
  name: string
  content: Message[]
}
