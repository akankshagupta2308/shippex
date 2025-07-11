// fakeApi.js

const USER = {
    email: 'ali@brandimic.com',
    password: 'password123',
    token: 'mock-token-abc123',
    url: 'https://www.brandimic.com',
    name: 'Ali Shaker',
};

type LoginProps = {
    email: string,
    password: string,
    url: string;
}

export const Api = {
    login: ({ email, password, url }: LoginProps) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === USER.email && password === USER.password && url === USER.url) {
                    resolve({ success: true, data: USER });
                } else {
                    reject({ success: false, message: 'Invalid email or password' });
                }
            }, 1000);
        });
    },
};
