export type User = {
  id: string,
  name: string,
  nickname: string,
  profile: string,
  avatarURL: string,
  uid: string
  reactions:Array<{post:string,reaction:string}>
}