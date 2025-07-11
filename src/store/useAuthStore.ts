// src/store/useAuthStore.js
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from "zustand/middleware";

export interface Shipment {
    id: string,
    awbNumber: string,
    status: string,
    sender: string,
    receiver: string,
    fromAddress: string,
    toAddress: string,
    isSelected: boolean,
    callNumber: string,
    whatsappNumber: string
}

const shipments: Shipment[] = [
    {
        "id": "awb_001",
        "awbNumber": "98765432101",
        "status": "Received",
        "sender": "Cairo",
        "receiver": "Alexandria",
        "fromAddress": "Nasr City, 15 El Tahrir St.",
        "toAddress": "Gleem, 44 Seaside Ave",
        "isSelected": false,
        "callNumber": "+201111111111",
        "whatsappNumber": "+201111111111"
    },
    {
        "id": "awb_002",
        "awbNumber": "87654321092",
        "status": "Received",
        "sender": "Giza",
        "receiver": "Port Said",
        "fromAddress": "Faisal St., 100 Bldg",
        "toAddress": "Downtown, 5 Canal Rd",
        "isSelected": false,
        "callNumber": "+202222222222",
        "whatsappNumber": "+202222222222"
    },
    {
        "id": "awb_003",
        "awbNumber": "76543210983",
        "status": "Delivered",
        "sender": "Tanta",
        "receiver": "Aswan",
        "fromAddress": "Mahalla Rd, 200 Nile St",
        "toAddress": "Korniche, 50 Lotus Tower",
        "isSelected": false,
        "callNumber": "+203333333333",
        "whatsappNumber": "+203333333333"
    },
    {
        "id": "awb_004",
        "awbNumber": "65432109874",
        "status": "Canceled",
        "sender": "Alexandria",
        "receiver": "Mansoura",
        "fromAddress": "Sidi Gaber, 99 Main St",
        "toAddress": "Talkha, 33 Palm St",
        "isSelected": false,
        "callNumber": "+204444444444",
        "whatsappNumber": "+204444444444"
    },
    {
        "id": "awb_005",
        "awbNumber": "54321098765",
        "status": "Rejected",
        "sender": "Zagazig",
        "receiver": "Banha",
        "fromAddress": "El Salam St., Bldg 8",
        "toAddress": "Ring Rd, House 3",
        "isSelected": false,
        "callNumber": "+205555555555",
        "whatsappNumber": "+205555555555"
    },
    {
        "id": "awb_006",
        "awbNumber": "43210987656",
        "status": "Lost",
        "sender": "Suez",
        "receiver": "Hurghada",
        "fromAddress": "Port Tunnel, Zone 5",
        "toAddress": "Mamsha St., Resort View",
        "isSelected": false,
        "callNumber": "+206666666666",
        "whatsappNumber": "+206666666666"
    },
    {
        "id": "awb_007",
        "awbNumber": "32109876547",
        "status": "On Hold",
        "sender": "Luxor",
        "receiver": "Qena",
        "fromAddress": "Temple Rd, 77 Historic St",
        "toAddress": "City Center, 10 Nile Plaza",
        "isSelected": false,
        "callNumber": "+207777777777",
        "whatsappNumber": "+207777777777"
    }
]

interface Auth {
    userData: User | null;
    error: string | null;
    filteredShipments: Shipment[];
    fetchShipments: (token?: string) => void;
    shipments: Shipment[];
    setUserData: (data: User) => void;
    isLoading: boolean;
    toggleSelectShipment: (index: number) => void;
    markAll: () => void;
    markedAllSelected: boolean;
    applyFilter: (filters: string[]) => void;
    onSearch: (searchText: string) => void;
    filters: string[];
}

export interface User {
    email: string,
    password: string,
    token: string,
    url: string,
    name: string
};

export const useAuthStore = create<Auth>(persist((set, get) => ({
    userData: null,
    userEmail: null,
    shipments: [],
    isLoading: false,
    error: null,
    markedAllSelected: false,
    filteredShipments: [],
    filters: [],
    fetchShipments: (token?: string) => {
        set({ isLoading: true })
        if (token) {
            set({ shipments })
        } else {
            set({ error: 'No Token Found!' })
        }
        set({ isLoading: false })
    },
    setUserData: (data: User) => {
        set({ userData: data })
    },
    toggleSelectShipment: (index: number) => {
        const updateShipments = [...shipments];
        updateShipments[index].isSelected = !updateShipments[index].isSelected;
        set({ shipments: updateShipments });
    },
    markAll: () => {
        const isSelected = get().markedAllSelected;
        const shipmentsData = get().shipments;
        if (isSelected) {
            const updatedShipments = shipmentsData.map((item) => { return { ...item, isSelected: false } });
            set({ shipments: updatedShipments, markedAllSelected: false });
        } else {
            const updatedShipments = shipmentsData.map((item) => { return { ...item, isSelected: true } });
            set({ shipments: updatedShipments, markedAllSelected: true });
        }
    },
    applyFilter: (filters: string[]) => {
        set({ isLoading: true });
        const shipmentsData = get().shipments;
        const updatedShipments = shipmentsData.filter(item => filters.includes(item.status));
        set({ filteredShipments: updatedShipments, isLoading: false, filters });
    },
    onSearch: (searchText: string) => {
        const shipmentsData = get().shipments;
        set({ isLoading: true })
        if (!searchText) {
            set({ filteredShipments: [] });
        } else {
            const updatedShipments = shipmentsData.filter(item => item.awbNumber === searchText);
            set({ filteredShipments: updatedShipments });
        }
        set({ isLoading: false });
    }
}),
    {
        name: "user-auth",
        storage: createJSONStorage(() => AsyncStorage),
    })
);
