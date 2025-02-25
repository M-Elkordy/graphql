import { Injectable } from '@nestjs/common';
import { merchantsUrl } from 'src/config/config';
import { MerchantInput } from './models/createMerchant.model';
import { UpdateMerchant } from './models/updateMerchant.model';

@Injectable()
export class MerchantService {
    async getMerchants(jwtToken: string) {
        try {
            const header = {
                ...(jwtToken && { Authorization: jwtToken }),
            };
            const merchants = await (await fetch(`${merchantsUrl}/merchants`, {
                headers: header,
            })).json();
            if(!merchants.success) throw new Error(merchants.message);
            return merchants;
        } catch (error) {
            return error;
        }
    }

    async addMerchant(data: MerchantInput, jwtToken: string) {
        try {
            const header = {
                'Content-Type': 'application/json',
                ...(jwtToken && { Authorization: jwtToken }),
            };
            const merchant = await ( await fetch(`${merchantsUrl}/merchants`, { 
                method: 'POST', 
                headers: header,
                body: JSON.stringify(data), 
            }) ).json();

            if(!merchant.success) throw new Error(merchant.message);
            return merchant;
        } catch (error) {
            return error;
        }
    }

    async updateMerchant(data: UpdateMerchant, cif: string, jwtToken: string) {
        try {
            const header = {
                'Content-Type': 'application/json',
                ...(jwtToken && { Authorization: jwtToken }),
            };
            const merchants = await ( await fetch(`${merchantsUrl}/merchants/${cif}`, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data),
            }) ).json();

            if(!merchants.success) throw new Error(merchants.message);
            return merchants;
        } catch (error) {
            return error;
        }
    }

    async deleteMerchant(cif: string, jwtToken: string) {
        try {
            const header = {
                ...(jwtToken && { Authorization: jwtToken }),
            };
            const merchant = await ( await fetch(`${merchantsUrl}/merchants?cif=${cif}`, {
                method: 'DELETE',
                headers: header,
            }) ).json();
            if(!merchant.success) throw new Error(merchant.message);
            return merchant;
        } catch (error) {
            return error;
        }
    }
}
