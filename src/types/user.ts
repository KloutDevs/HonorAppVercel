export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  rank: {
    position: number;
    name: string;
  };
  role?: 'admin' | 'superadmin';
  must_change_password?: boolean;
}