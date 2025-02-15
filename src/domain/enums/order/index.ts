export enum OrderStatus {
  OPENING = 'OPENING',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_THE_WAY = 'ON_THE_WAY',
  FINISHED = 'FINISHED',
  CANCELED_BY_RESTAURANT = 'CANCELED_BY_RESTAURANT',
  CANCELED_BY_CLIENT = 'CANCELED_BY_CLIENT'
}

export enum OrderType {
  RESTAURANT = 'RESTAURANT',
  DELIVERY = 'DELIVERY'
}
