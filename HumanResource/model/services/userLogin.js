const httpStatusCode = require("../../../utils/http-status-code");
const validateEmail = require("../../utils/validateEmail");
const validatePhone = require("../../utils/validateMobile");


const userLogin = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Validate input data
        if (!identifier || !password) {
            return res.status(httpStatusCode.BadRequest).send({
                message: message.lblMissingEmailOrPassword
            });
        }

        // Determine if identifier is an email or phone
        const isEmail = validateEmail(identifier);

        // Check if the identifier is a valid 10-digit phone number
        const isPhone = validatePhone(identifier);

        // Debugging logs
        console.log("isEmail:", isEmail);
        console.log("isPhone:", isPhone);

        // If neither a valid email nor a 10-digit phone number, return error
        if (!isEmail && !isPhone) {return res.status(statusCode.BadRequest).send({ message: message.lblInvalidEmailOrPhone });
        }

        // Construct the query based on whether it's email or phone
        const query = isEmail ? { email: identifier } : { phone: identifier };

        // Check if user exists
        const user = await User.findOne(query).populate('role');
        if (!user) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblNotFoundUser
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(statusCode.Unauthorized).send({
                message: message.lblAccountDeactivate
            });
        }

        // Check if user is verified
        if (!user.isUserVerified) {
            return res.status(statusCode.Unauthorized).send({
                message: message.lblUnVerified
            });
        }

        // Check role authorization
        if (user.roleId > 2) {
            return res.status(statusCode.Unauthorized).send({
                message: message.lblUnauthorize
            });
        }

        // Validate password
        const isPasswordValid = await user.isPasswordCorrect(password); 
        if (!isPasswordValid) {
            return res.status(statusCode.BadRequest).send({
                message: message.lblIncorrectPassword
            });
        }
        else if (isPasswordValid) {
            console.log(user)
        }

        // Generate OTP and update user document
        const otp = generateOtp();
        const otpUpdate = await User.updateOne(
            { _id: user._id },
            { verificationOtp: otp, otpGeneratedAt: new Date() }
        );

        if (!otpUpdate.acknowledged) {
            throw new Error('Failed to update OTP');
        }

        // Send OTP email or SMS based on login type
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Email Verification for DYNO",
            template: "loginOtp",
            context: {
                otp,
                name: user.firstName,
                emailSignature: process.env.EMAIL_SIGNATURE,
                appName: process.env.APP_NAME
            },
        };

        await mailSender(mailOptions);

        return res.status(statusCode.OK).send({
            message: message.lblSigninVerificationOtpSent
        });

    } catch (error) {
        console.error("SignIn Error:", error);
        return res.status(statusCode.InternalServerError).send({
            message: message.lblInternalServerError
        });
    }
};


module.exports = userLogin