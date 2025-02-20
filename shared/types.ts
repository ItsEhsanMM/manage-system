export type Client = {
  name: string;
  email: string;
  phoneNumber: string; // Prisma stores as a string
  salary: number;
  status: 'HIRED' | 'FIRED';
  joinDate: Date;
};

export interface ClientWithId extends Client {
  id: string; // Prisma uses `id` instead of `_id`
}
