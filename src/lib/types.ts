import { Client, Program, Enrollment, User } from '@prisma/client'

export type ClientWithEnrollments = Client & {
  enrollments: (Enrollment & {
    program: Program
  })[]
}

export type ProgramWithEnrollments = Program & {
  enrollments: (Enrollment & {
    client: Client
  })[]
}

export type EnrollmentWithDetails = Enrollment & {
  client: Client
  program: Program
}

export type SafeUser = Omit<User, 'password'>