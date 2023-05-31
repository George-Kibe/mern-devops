"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToken = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
require("dotenv").config();
const ses = new client_ses_1.SESClient({});
// console.log(process.env.AWS_SECRET_ACCESS_KEY)
const createSendEmailCommand = (toAddress, fromAddress, message) => {
    return new client_ses_1.SendEmailCommand({
        Destination: {
            ToAddresses: [toAddress],
            // CcAddresses: []
        },
        Source: fromAddress,
        Message: {
            Subject: {
                Charset: 'UTF-8',
                Data: "Your One Time Password"
            },
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: message
                }
            }
        }
    });
};
function sendEmailToken(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const message = `Your one time password: ${token}`;
        const command = createSendEmailCommand(email, "buenasconsultants@gmail.com", message);
        // send the message
        try {
            return yield ses.send(command);
        }
        catch (error) {
            console.log("Error sending Email", error);
            return error;
        }
    });
}
exports.sendEmailToken = sendEmailToken;
// Testing sending emails
// sendEmailToken("georgekibew@gmail.com", "456472")
