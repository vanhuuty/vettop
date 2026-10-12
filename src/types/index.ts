export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  role?: string;
  userType?: 'owner' | 'vet';
  clinicName?: string;
  clinicAddress?: string;
  clinicLogo?: string;
  specialty?: string;
  phone?: string;
  licenseNumber?: string;
  bio?: string;
  location?: string;
  petsCount?: number;
  mutualFriends?: number;
  isFriend?: boolean;
  friendRequestSent?: boolean;
}

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  gender: 'male' | 'female';
  avatar: string;
  weight?: string;
  vaccinated: boolean;
  neutered: boolean;
  notes?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface AdoptionDetails {
  petName: string;
  species: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  gender: 'male' | 'female';
  city: string;
  vaccinated: boolean;
  neutered: boolean;
  urgent?: boolean;
  adoptionFee?: string;
  contactPhone: string;
  story: string;
  healthStatus: string;
  adoptionStatus: 'available' | 'pending' | 'adopted';
  ownerId: string;
  ownerName: string;
  photoUrl: string;
}

export interface ClinicReview {
  clinicName: string;
  rating: number;
  reviewsCount: number;
  city: string;
  category: string;
  address?: string;
  clinicLogo?: string;
  email?: string;
  phone?: string;
  doctorName?: string;
}

export interface Post {
  id: string;
  author: User;
  createdAt: string;
  content: string;
  type: 'general' | 'experience' | 'adoption' | 'review' | 'qa';
  groupName?: string;
  location?: string;
  images?: string[];
  clinicReview?: ClinicReview;
  adoption?: AdoptionDetails;
  likes: number;
  isLiked?: boolean;
  comments: Comment[];
  shares: number;
  isSaved?: boolean;
}

export interface AdoptionApplication {
  id: string;
  petName: string;
  ownerId: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  applicantCity: string;
  experienceYears: string;
  housingType: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface GuideArticle {
  id: string;
  title: string;
  category: 'stress' | 'nutrition' | 'kitten' | 'training' | 'health';
  categoryLabel: string;
  views: string;
  readTime: string;
  author: string;
  authorRole: string;
  summary: string;
  content: string[];
  imageUrl?: string;
}

export interface ToplistPlace {
  id: string;
  name: string;
  category: 'clinic' | 'petshop' | 'spa' | 'hotel';
  rating: number;
  reviewsCount: number;
  city: string;
  address: string;
  phone: string;
  email?: string;
  doctorName?: string;
  logoUrl?: string;
  isOpen: boolean;
  isSaved?: boolean;
  imageUrl?: string;
  services?: string[];
  priceRange?: string;
  description?: string;
}

export interface AppointmentBooking {
  id: string;
  clinicId: string;
  clinicName: string;
  clinicLogo?: string;
  doctorName?: string;
  doctorEmail: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  petName: string;
  petSpecies: string;
  serviceType: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  coverImage: string;
  category: string;
  membersCount: number;
  postsCountDaily: number;
  description: string;
  isJoined?: boolean;
  adminName: string;
  rules: string[];
}
