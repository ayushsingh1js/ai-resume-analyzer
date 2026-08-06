import mysql from 'mysql2'
import 'dotenv/config'

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"project",
password:process.env.MYSQL_PASSWORD,

})
db.connect((err)=>{
    if (err) {
        console.error(" DB Connection Failed:", err.message)
        process.exit()
    }
    console.log("DB Connected Successfully")}
)
export default db