export type Language = 'ar' | 'en';

export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number; // in AED/SAR
  image: string;
  category: 'traditional' | 'bakery' | 'chocolates' | 'gifts';
  rating: number;
  isPopular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  nameAr: string;
  nameEn: string;
  rating: number;
  textAr: string;
  textEn: string;
  dateAr: string;
  dateEn: string;
  avatar: string;
  isCustom?: boolean;
}

export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  titleAr: string;
  titleEn: string;
  category: 'sweets' | 'cakes' | 'gifts' | 'bakery';
}
