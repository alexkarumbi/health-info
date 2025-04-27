import { z } from 'zod'

export const clientSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
})

export const programSchema = z.object({
  name: z.string().min(1, 'Program name is required'),
  description: z.string().optional(),
})

export const enrollmentSchema = z.object({
  clientId: z.string().min(1, 'Client ID is required'),
  programId: z.string().min(1, 'Program ID is required'),
  notes: z.string().optional(),
})

export const userSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
})