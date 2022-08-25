let ws: WebSocket
let subscribers = [] as Array<SubscriberType>

export type ChatMessageType = {
  userId: number
  userName: string
  message: string
  photo: string
}

type SubscriberType = (messages: Array<ChatMessageType>) => void

const closeHandler = (e: any) => {
  console.log('WS connection closed')
  console.log(e)
}

const messageHandler = (e: MessageEvent) => {
  const data = JSON.parse(e.data)
  subscribers.forEach(s => s(data))
}

const closeChannel = () => {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  // ws?.close()
}

const createChannel = () => {
  closeChannel()

  ws = new WebSocket(
    'wss://token:5fd6286d-f0d9-4683-b3a9-4cdeb04d51f6@social-network.samuraijs.com/handlers/ChatHandler.ashx',
  )
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', (e) => {
    console.log('WS opened')
    // ws.send('5fd6286d-f0d9-4683-b3a9-4cdeb04d51f6')
    console.log(e)
  })
  ws.addEventListener('error', (e) => {
    console.log('WS error')
    console.log(e)
  })
}

export const chatAPI = {
  start: () => {
    createChannel()
  },

  stop: () => {
    closeChannel()
  },

  subscribe: (callback: SubscriberType) => {
    subscribers.push(callback)
  },

  unsubscribe: (callback: SubscriberType) => {
    subscribers.filter(s => s !== callback)
  },

  sendMessage: (message: string) => {
    ws?.send(message)
  },
}
