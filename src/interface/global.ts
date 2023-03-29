export interface NoteI {
  id: string;
  message: string;
  likes: string[];
  dislikes: string[];
}

export interface UserFormI {
  password: string;
  email: string;
}

export interface UserI {
  name: string,
  secondName: string,
  email: string,
  id: string,
  phone: string,
  img: string,
  wallPosts: NoteI[],
  followers: string[],
  following: string[],
}
