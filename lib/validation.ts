import { z } from "zod";

const VehicleTypeEnum = z.enum([
  "Car",
  "Bike",
  "Micro-Bus",
  "Bus",
  "Truck",
  "CNG",
  "Ship",
  "Tractor",
  "Others",
]);

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid Email Address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is required." })
    .max(100, { message: "Title cannot exceed 100 characters." }),

  content: z.string().min(1, { message: "Body is required." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag is required." })
        .max(30, { message: "Tag cannot exceed 30 characters." })
    )
    .min(1, { message: "At least one tag is required." })
    .max(3, { message: "Cannot add more than 3 tags." }),
});

export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  bio: z.string().optional(),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  location: z.string().optional(),
  portfolio: z
    .string()
    .url({ message: "Please provide a valid URL." })
    .optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),
  provider: z.string().min(1, { message: "Provider is required." }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
});

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    email: z
      .string()
      .email({ message: "Please provide a valid email address." }),
    image: z.string().url("Invalid image URL").optional(),
  }),
});

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const GetQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const PaginatedBaseParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  sort: z.string().optional(),
});

export const PaginatedSearchParamsSchema = PaginatedBaseParamsSchema.extend({
  filter: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, { message: "Tag ID is required." }),
});

export const ModelSchema = z.object({
  name: z.string().min(1, { message: "Model Name is required." }),
  supplierName: z.string().min(1, { message: "Supplier Name is required." }),
});

export const GetModelSchema = z.object({
  modelId: z.string().min(1, { message: "Model ID is required." }),
});

export const GetReferenceSchema = z.object({
  referenceId: z.string().min(1, { message: "Reference ID is required." }),
});

export const EditModelSchema = ModelSchema.extend({
  modelId: z.string().min(1, { message: "Question ID is required." }),
});

export const ReferenceSchema = z.object({
  name: z.string().min(1, { message: "Reference Name is required." }),
  contact: z
    .string()
    .min(1, { message: "Reference Contact is required." })
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Invalid Bangladeshi mobile number"
    ),
  address: z.string().min(5, {
    message: "Reference Address is required and minimum 5 character length",
  }),
});

export const EditReferenceSchema = ReferenceSchema.extend({
  referenceId: z.string().min(1, { message: "Reference ID is required." }),
});

export const GetBaseSchema = z.object({
  _id: z.string().min(1, { message: "ID is required." }),
});

// id: string;
//   deviceSimNumber: string;
//   registrationNumber: string;
//   ?: string;
//   ?: string;
//   ?: string;
//   ?: string;
//   code?: string;
//   centerNumber?: string;
//   vehicleType?:
//     | "Car"
//     | "Bike"
//     | "Micro-Bus"
//     | "Bus"
//     | "Truck"
//     | "CNG"
//     | "Ship"
//     | "Tractor"
//     | "Others";
//   mileage?: number;
//   congestionConsumption?: number;
//   serviceCharge?: number;
//   speedLimit?: number;
//   maxTemp?: number;
//   minTemp?: number;
//   deviceModel?: string;
//   reference?: string;
//   user?: string;

export const CreateDeviceSchema = z.object({
  id: z.string().min(10, {
    message: "Device ID is required and minimum 10 character long",
  }),

  deviceSimNumber: z
    .string()
    .min(1, { message: "Reference Contact is required." })
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Invalid Bangladeshi mobile number"
    ),

  registrationNumber: z.string().min(5, {
    message: "Registration Number is required and minimum 5 character long",
  }),

  vehicleModel: z.string().optional(),

  centerNumber: z
    .string()
    .optional()
    .refine((value) => !value || /^(?:\+8801|01)[3-9]\d{8}$/.test(value), {
      message: "Invalid Bangladeshi mobile number",
    }),

  vehicleType: VehicleTypeEnum.default("Car"), // Must match the enum if provided
  mileage: z.number().nonnegative("Mileage must be non-negative").optional(),
  congestionConsumption: z
    .number()
    .nonnegative("Congestion consumption must be non-negative")
    .optional(),
  serviceCharge: z
    .number()
    .nonnegative("Service charge must be non-negative")
    .min(200, { message: "Service Charge Greater than 200" })
    .default(300),
  deviceModel: z.string().min(1, {
    message: "Vehicle Model is Required",
  }),
  reference: z.string().min(1, {
    message: "Reference is Required",
  }),
});

export const DeviceSchema = CreateDeviceSchema.extend({
  driverName: z.string().optional(),
  driverPhone: z
    .string()
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Invalid Bangladeshi mobile number"
    )
    .optional(),
  driverPhoto: z.string().optional(),
  code: z.string().optional(),
  speedLimit: z.number().positive("Speed limit must be positive").optional(),
  maxTemp: z.number().optional(),
  minTemp: z.number().optional(),
  user: z.string().optional(),
});

export const EditDeviceSchema = CreateDeviceSchema.extend({
  _id: z.string().min(1, { message: "ID is required." }),
});

export const DeleteDeviceSchema = z.object({
  id: z.string().min(1, { message: "ID is required." }),
});

export const AssignDeviceSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  deviceId: z.string().min(1, { message: "Device ID is required." }),
});
