import {SESClient, SendEmailCommand} from "@aws-sdk/client-ses";

const ses = new SESClient({});

const createSendEmailCommand = (toAddress: string, fromAddress: string, message:string) => {
    return new SendEmailCommand({
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
    })
}

export async function sendEmailToken(email: string, token:string){
    const message = `Your one time password: ${token}`;
    const command = createSendEmailCommand(email, "buenasconsultants@gmail.com", message);
    // send the message
    try {
        return await ses.send(command);
    } catch (error) {
        console.log("Error sending Email", error)
        return error;
    }
}


sendEmailToken("georgekibew@gmail.com", "456472")