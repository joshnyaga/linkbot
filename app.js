const qrcode = require("qrcode-terminal");
const express = require("express"); 
const { Client, LocalAuth } = require("whatsapp-web.js");
const mainroute = require("./router/main")
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
app.get('/', function (req, res) {
    res.send('Hello World');
 })
client.on("message", async(message) => {
  if(message.body.includes("chat.whatsapp")){
	console.log("Link Detected")
    let position = message.body.search("chat.whatsapp.com/");

let codestart = position+18;
    let code = message.body.slice(codestart,codestart+29);
if(code.includes("invite")){
	console.log("contains invite")
	code = code.slice(7,36);
}
    let link = message.body.slice(0,33);
    console.log(code)
   try {
        console.log("link is == "+message.body)
        await client.acceptInvite(code);
	console.log("group joined")
      } catch (e) {
	console.log("an error occurred when joining group");
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
//       };ds
    
//   }
});
app.listen(8000, () => {
    console.log("Connected to server on port 8800");
  });
