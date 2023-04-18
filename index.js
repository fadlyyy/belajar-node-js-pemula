const http = require('http')
const rupiah = require('rupiah-format')
const fs = require('fs')
const os = require('os')

const port = 3000
const host = '127.0.0.1'

const server = http.createServer(function (request, response) {
    const nama = 'fadli'
    let uang = 5000
    let jajan = 1500
    let sisa = uang - jajan

    uang = rupiah.convert(uang)
    jajan = rupiah.convert(jajan)
    sisa = rupiah.convert(sisa)

    /**
     * spec hadrware
     */
    const totalRam = os.totalmem / 1000000
    const sisaRam = os.freemem / 1000000

    const hasil = `
    <h3>
    halo nama saya ${nama}, saya jajan sebanyak ${jajan}, uang saya tadinya ${uang}, sekarang menjadi ${sisa}
    </h3>
    <h3>
    Total Ram = ${totalRam} MB
    </h3>
    <h3>
    Sisa Ram = ${sisaRam} MB
    </h3>
    `

    fs.appendFile('sisa-uang.txt', hasil, function () {
        console.log('file berhasil disimpan')
    })

    response.statusCode = 200
    response.end(hasil)
})

server.listen(port, host, '', function () {
    console.log(`Server Menyala http://${host}:${port}`)
})