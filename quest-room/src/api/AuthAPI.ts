import { useMutation } from '@tanstack/react-query'
const API_URL = 'http://localhost:3000'

export interface User {
  id: number    
  email: string
  name: string
  surname: string
  password: string
  phone: string
  role: 'user' | 'admin'
}

export interface RegisterDto {
    email: string
    password: string
    name: string
    surname: string
    phone: string
    agree: boolean
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterDto) => {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json().catch(() => null);

            if (!response.ok) {
               const message = result?.message || 'Ошибка при регистрации';
               throw new Error(message);
            }

            return result;
        }
    });
};

