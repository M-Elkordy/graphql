import { Injectable } from '@nestjs/common';
import { usersUrl } from 'src/config/config';
import { SignInUser, SignUpUser, UpdatedUser } from './models/users.model';

@Injectable()
export class UsersService {
    async getUsers(token: string) {
        try {
            const header = {
                ...(token && { Authorization: token }),
                'Content-Type': 'application/json',
            }
            const users = await (await fetch(`${usersUrl}/users`, {
                headers: header,
            })).json();

            if(!users.success) throw new Error(users.message);
            return users;
        } catch (error) {
            return error;
        }
    }

    async getUserById(token: string, id: string) {
        try {
            const header = {
                ...(token && { Authorization: token }),
                'Content-Type': 'application/json'
            }
            const users = await (await fetch(`${usersUrl}/users/${id}`, {
                headers: header,
            })).json();

            if(!users.success) throw new Error(users.message);
            return users;
        } catch (error) {
            return error;
        }
    }

    async updateUser(token: string, id: string, user: UpdatedUser) {
        try {
            const header = {
                ...(token && { Authorization: token })
            }
            const users = await (await fetch(`${usersUrl}/users/${id}`, {
                headers: header,
                method: 'PATCH', // PATCH
                body: JSON.stringify(user)
            })).json();

            if(!users.success) throw new Error(users.message);
            return users;
        } catch (error) {
            return error;
        }
    }

    async deleteUser(token: string, id: string) {
        try {
            const header = {
                ...(token && { Authorization: token })
            }
            const users = await (await fetch(`${usersUrl}/users/${id}`, {
                headers: header,
                method: 'DELETE',
            })).json();

            if(!users.success) throw new Error(users.message);
            return users;
        } catch (error) {
            return error;
        }
    }

    async signIn(user: SignInUser) {
        try {
            const userToken = await (await fetch(`${usersUrl}/users/signin`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(user),
            })).json();
            if(!userToken.success) throw new Error(userToken.message);
            return userToken;
        } catch (error) {
            return error;
        }
    }

    async signUp(user: SignUpUser) {
        try {
            const users = await (await fetch(`${usersUrl}/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(user)
            })).json();

            if(!users.success) throw new Error(users.message);
            return users;
        } catch (error) {
            return error;
        }
    }

    async signOut(token: string) {
        try {
            const header = {
                ...(token && { Authorization: token })
            };
            const returnMessage = await (await fetch(`${usersUrl}/users/signout`, {
                headers: header,
                method: 'POST',
            })).json();

            if(!returnMessage.success) throw new Error(returnMessage.message);
            return returnMessage;
        } catch (error) {
            return error;
        }
    }
}
