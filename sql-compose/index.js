const fs = require('fs')
const path = require('path')

let content = fs.readFileSync(path.resolve(__dirname, './data.txt'), { encoding: 'utf-8' }).split('\r\n')
content = [...new Set(content)]

console.log(Math.max(...content.map(v => v.length)))

// const sql = content.reduce((pre, cur) => pre + `values ('${cur}'),
// `, 'insert into nxpt.wqy_region(code) ')

// console.log(sql)

// fs.writeFileSync(path.resolve(__dirname, './sql.sql'), sql, { encoding: 'utf-8' })
