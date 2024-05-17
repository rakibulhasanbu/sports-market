export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
  success: boolean;
  statusCode: number;
  message: string;
};

export type TGenericErrorResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorMessage: string;
    errorDetails: IGenericErrorMessage[];
  };
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

// types.ts

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "superAdmin",
}

export enum UserGender {
  MALE = "male",
  FEMALE = "female",
  TRANSGENDER = "transgender",
  OTHERS = "others",
}

export enum UserStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DENIED = "denied",
}

export enum VerificationOtpType {
  CREATE_USER = "createUser",
  FORGOT_PASSWORD = "forgotPassword",
}

export enum PropertyStatus {
  SOLD = "sold",
  AVAILABLE = "available",
  PENDING = "pending",
  DENIED = "denied",
}

export enum PropertyType {
  LAND = "land",
  SEMI_DETACHED_HOUSE = "semiDetachedHouse",
  DETACHED_HOUSE = "detachedHouse",
  FINISHED = "finished",
  UNFINISHED = "unFinished",
}

export enum OrderStatus {
  PENDING = "pending",
  SUCCESS = "success",
  DENIED = "denied",
}

export enum OrderRefName {
  CROWD_FUND = "crowdFund",
  FLIPPING = "flipping",
  PROPERTY = "property",
}

export enum OrderPaymentType {
  PAYSTACK = "paystack",
  MANUAL = "manual",
}

export enum BankType {
  USD = "usd",
  NAIRA = "naira",
}

export enum ChatGroupType {
  PUBLIC = "public",
  ADMIN = "admin",
  CHAMPION = "champion",
}

export interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
}

export interface VerificationOtp {
  id: string;
  type: VerificationOtpType;
  otp: number;
  createdAt: Date;
  ownById: string;
  ownBy: User;
}

export interface Location {
  _count: unknown;
  id: string;
  name: string;
  imgUrl: string;
  createdAt: Date;
  updatedAt: Date;
  property: Property[];
  crowdFund: CrowdFund[];
}

export interface Property {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  rooms?: number;
  size: string;
  floor?: string;
  price: number;
  streetLocation: string;
  videoUrl: string;
  images: string[];
  locationId: string;
  createdAt: Date;
  status: PropertyStatus;
  updatedAt: Date;
  type: PropertyType;
  location: Location;
  propertyState: PropertyState[];
  order: Order[];
  savedPropertry: SavedProperty[];
}

export interface PropertyState {
  id: string;
  time: Date;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  propertyId: string;
  property: Property;
}

export interface SavedProperty {
  id: string;
  ownById: string;
  ownBy: User;
  propertyId: string;
  property: Property;
}

export interface Order {
  id: string;
  isPaid: boolean;
  amount: number;
  propertyId?: string;
  property?: Property;
  crowdFundId?: string;
  crowdFund?: CrowdFund;
  flippingId?: string;
  flipping?: Flipping;
  refName: OrderRefName;
  bankName?: string;
  bankAccountNumber?: string;
  paymentReceiptUrl?: string;
  paystackId?: string;
  paystackUrl?: string;
  wealthBankId?: string;
  wealthBank?: Bank;
  orderById: string;
  orderBy: User;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  paymentType: OrderPaymentType;
}

export interface Bank {
  id: string;
  name: string;
  accountNumber: string;
  accountName: string;
  createdAt: Date;
  updatedAt: Date;
  typeOfBank: BankType;
  logoOfBank: string;
  propertryOrders: Order[];
}

export interface CrowdFund {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  rooms?: number;
  size: string;
  floor?: string;
  targetFund: number;
  fundRaised: number;
  streetLocation: string;
  videoUrl: string;
  type: PropertyType;
  images: string[];
  locationId: string;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
  location: Location;
  savedCrowdFund: SavedCrowdFund[];
  Orders: Order[];
}

export interface SavedCrowdFund {
  id: string;
  ownById: string;
  ownBy: User;
  crowdFundId: string;
  crowdFund: CrowdFund;
}

export interface Flipping {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  rooms?: number;
  size: string;
  floor?: string;
  price: number;
  streetLocation: string;
  videoUrl: string;
  images: string[];
  type: PropertyType;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
  ownById: string;
  ownBy: User;
  location: string;
  emergencyContact?: string;
  emergencyEmail?: string;
  savedFlipping: SavedFlipping[];
  Orders: Order[];
}

export interface SavedFlipping {
  id: string;
  ownById: string;
  ownBy: User;
  flippingId: string;
  flipping: Flipping;
}

export interface Feedback {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  description: string;
  ownById: string;
  ownBy: User;
}

export interface Promotion {
  id: string;
  title: string;
  date: Date;
  location: string;
  thumbnail: string;
  streetLocation: string;
  description: string;
  interesteds: PromotionInterest[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PromotionInterest {
  id: string;
  ownById: string;
  ownBy: User;
  createdAt: Date;
  updatedAt: Date;
  promotion: Promotion;
  promotionId: string;
}

export interface ChatGroup {
  id: string;
  thumbnail: string;
  name: string;
  type: ChatGroupType;
  createdAt: Date;
  updatedAt: Date;
  messaage: Message[];
  seenMessage: SeenMessage[];
}

export interface Message {
  id: string;
  chatGroupId: string;
  chatGroup: ChatGroup;
  text?: string;
  image?: string;
  replyId?: string;
  reply: Message;
  sendById: string;
  sendBy: User;
  createdAt: Date;
  updatedAt: Date;
  replies: Message[];
}

export interface SeenMessage {
  id: string;
  groupId: string;
  chatGroup: ChatGroup;
  seenById: string;
  seenBy: User;
  createdAt: Date;
  updatedAt: Date;
  lastSeen: Date;
}

export interface Faq {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  question: string;
  ans: string;
}
