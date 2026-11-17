export type Language = 'ar' | 'en';

export interface ServiceItem {
  id: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  iconType: 'pen' | 'ad' | 'video' | 'globe';
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
}

export interface CarouselSlideData {
  id: number;
  badge: string;
  badgeEn: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  subContent?: string;
  subContentEn?: string;
}

export interface BrandingPackage {
  id: string;
  name: string;
  nameEn: string;
  badge?: string;
  badgeEn?: string;
  subtitle: string;
  subtitleEn: string;
  priceJod: number;
  popular?: boolean;
  timeline: string;
  timelineEn: string;
  features: string[];
  featuresEn: string[];
}

export interface TestimonialStory {
  id: string;
  clientName: string;
  clientNameEn: string;
  businessType: string;
  businessTypeEn: string;
  location: string;
  locationEn: string;
  quote: string;
  quoteEn: string;
  metric: string;
  metricEn: string;
  metricLabel: string;
  metricLabelEn: string;
  serviceDelivered: string;
  serviceDeliveredEn: string;
  verified: boolean;
  rating: number;
}

