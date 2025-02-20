export type Client = {
    name: string;
    email: string;
    phoneNumber: number;
    salary: number;
    status: 'hired' | 'fired';
    joinDate: Date;
  };

  export interface ClientWithId extends Client {
    _id: string
  }
  