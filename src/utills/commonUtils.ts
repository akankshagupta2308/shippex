export const getStatusColor = (status: string) => {
    switch (status) {
        case 'Received':
            return { bgColor: '#D9E6FD', textColor: '#2F50C1' };
        case 'Delivered':
            return { bgColor: '#E3FAD6', textColor: '#208d28' };
        case 'Canceled':
            return { bgColor: '#F4F2F8', textColor: '#58536E' };
        case 'On Hold':
            return { bgColor: '#FFF3D5', textColor: '#db7e21' };
        default:
            return { bgColor: '#FEE3D4', textColor: '#d12030' };
    }
};

export const validateURL = (value: string) => {
    if (!value) {
        return false;
    }
    const pattern = /^(http[s]?:\/\/)?(www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
};

export const validateEmail = (value: string) => {
    if (!value) {
        return false;
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
};
