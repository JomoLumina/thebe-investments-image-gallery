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
  color: string;
  likes: number;
  links:{
    download: string;
  }
  user: {
    name: string;
    links: {
      html: string;
    }
    profile_image: {
      large: string;
      medium: string;
      small: string;
    }
    profile_url: string;
  };
};
