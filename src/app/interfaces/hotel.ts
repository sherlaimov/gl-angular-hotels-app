export interface IHotel {
  id: number;
  title: string;
  address: string;
  description: string;
  phone: string;
  picture: string;
  photos: string[];
  weather: { [key: string]: number | string };
  profile: { [key: string]: number | string };
  stars: number;
  rating: number;
}
