export interface IHotel {
  id: number;
  title: string;
  address: string;
  description: string;
  phone: string;
  picture: string;
  photos: string[];
  weather: { [key: string]: number | string };
  profile: { followers: number; following: number; photo: string };
  stars: number;
  rating: number;
}
