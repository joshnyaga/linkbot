const qrcode = require("qrcode-terminal");
const express = require("express"); 
const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});
const app = express();
client.initialize();
const context = [];
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});
client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async(message) => {
    if (message.body) {
        console.log(message.body);
    }
    const code = message.body.slice(33,56);
    const link = message.body.slice(0,33);
    console.log(code)
    if(link === "https://chat.whatsapp.com/invite/"){
    try {
        console.log("link is == "+message.body)
        await client.acceptInvite(code);
        message.reply("Joined the group!");
      } catch (e) {
        message.reply("That invite code seems to be invalid.");
        console.log(e)
     
    }
    }
//   if (message.body) {
//     console.log(message.body);
    
//       async () => {
//         const inviteCodeg = args.join(" ");
//         try {
//           await client.acceptInvite(message.body);
//           msg.reply("Joined the group!");
//         } catch (e) {
//           msg.reply("That invite code seems to be invalid.");
//         }
//       };
    
//   }
});
app.listen(8000, () => {
    console.log("Connected to server on port 8800");
  });