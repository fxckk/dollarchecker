const { get, post } = require('axios')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const moment = require('moment')
var AsciiTable = require('ascii-table')
const cheerio = require('cheerio')
client.on("ready", () => { 
console.log(`slm ${client.user.id}`) /* burayi kafana gore degis */
})
var v1 = 0; /* bu 0ları ellemeyin yoksa bozarsiniz kardesim */
var v2 = 0;
var v3 = 0;
var v4 = 0;
setInterval(()=>{
    get("https://www.google.com/search?q=1+dollar+to+try")
.then((onedollar)=>{
  get("https://www.google.com/search?q=10+dollar+to+try")
.then((tendollar)=>{
var table = new AsciiTable('Kur Tablosu')
/**/
var onedollardata = onedollar.data.replace('<div class="BNeawe iBp4i AP7Wnd">', '<div id="31baligi">') /* buralari hic elleme. */
var tendollardata = tendollar.data.replace('<div class="BNeawe iBp4i AP7Wnd">', '<div id="31baligi">')
const onedollar$ = cheerio.load(onedollardata)
moment.locale("tr")
const tendollar$ = cheerio.load(tendollardata)
var td = tendollar$('#31baligi')[0].children[0].children[0].children[0].data.replace(" T�rk Lirası", "₺"); /* Burada responsede Türk lirası olarak döndüğü için oraya Türk lirası yazdım ama siz vds kullanıyosanız ingilizce olarak Turkish Lira yazar orayı Turkish Lira olarak düzeltin. */
var od = onedollar$('#31baligi')[0].children[0].children[0].children[0].data.replace(" T�rk Lirası", "₺");
v1 = td.replace("₺", "");
v2 = od.replace("₺", ""); /* buralari ellemeyin */
table
  .setHeading('1$', od)
  .addRow("10$", td)
 console.log("\n"+moment().format("--- DD.MM.YYYY - HH:mm:ss ---")+"\n")
console.log(table.toString())
if(v1!==v3 || v2!==v4){
client.channels.cache.get("921071729420431400").send("Yeni bir güncelleme geldi, kur bilgisi derleniyor...") /* channels.get olanların hepsi mesajalrın gideceği kanalın idsi */
setTimeout(()=>client.channels.cache.get("921071729420431400").send("`"+table.toString()+"`"), 1000)
var role = client.guilds.resolve("921007301064794132").roles.cache.get("921073604932808714") /* roles.cache.get olan bildirim rolünün idsi guilds.resolve olan mesajın atılcağı sunucunun idsi */
setTimeout(()=>client.channels.cache.get("921071729420431400").send(`${role}`))
setTimeout(()=>client.channels.cache.get("921071729420431400").send("Yeni güncelleme gelene kadar kur bilgisi kanala gönderilmeyecektir."), 2000)
}
v3 = v1; /* ellemeyin. */
v4 = v2;

})
}) 
}, 5000)

client.login("TOKEN")