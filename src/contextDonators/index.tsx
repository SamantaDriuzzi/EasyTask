"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllDonations } from '../helpers/donations/get';
import { User } from '@/utils/types/interface-user';
import { IDonation } from '@/utils/types/interface-donation';

interface DonorContextType {
    donors: User[];
}

const DonorContext = createContext<DonorContextType | undefined>(undefined);

export const DonorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [donors, setDonors] = useState<User[]>([]);

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                const data = await getAllDonations();
                const uniqueDonors = data.map((donation: IDonation) => donation.user);
                setDonors(uniqueDonors);
            } catch (error) {
                console.error('Error fetching donors:', error);
            }
        };

        fetchDonors();
    }, []);

    return (
        <DonorContext.Provider value={{ donors }}>
            {children}
        </DonorContext.Provider>
    );
};

export const useDonors = (): DonorContextType => {
    const context = useContext(DonorContext);
    if (!context) {
        throw new Error('useDonors must be used within a DonorProvider');
    }
    return context;
};
