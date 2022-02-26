export interface Photo {
  id: number;
  width: number;
  height: number;
  urls: { 
    large: string; 
    regular: string; 
    raw: string; 
    small: string;
    thumb: string;
    full: string;
  };
  alt_description: string,
  description: string;
  user: {
    username: string;
    name: string;
  };
};
