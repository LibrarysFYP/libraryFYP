const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

client.lookups.v1
    .phoneNumbers("3204047304")
    .fetch({ countryCode: "PK" })
    .then((phone_number) => console.log(phone_number))
    .catch(() => {
        console.log("error");
    });