const axios = require('axios');

const verifyRecaptcha = async (token) => {
    if (!token) {
        return { success: false, message: 'No recaptcha token provided' };
    }

    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
        );

        const { success, score } = response.data;

        if (!success) {
            return { success: false, message: 'Recaptcha verification failed' };
        }

        if (score < 0.5) {
            return { success: false, message: 'Recaptcha score too low' };
        }

        return { success: true };
    } catch (error) {
        console.error('Recaptcha verification error:', error);
        return { success: false, message: 'Server error during verification' };
    }
};

module.exports = verifyRecaptcha;
