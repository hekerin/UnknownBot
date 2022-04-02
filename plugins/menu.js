let fs = require('fs')
let path = require('path')
let levelling = require('../lib/levelling')
let tags = {
  'main': 'Utama',
  'xp': 'Exp & Limit',
  'sticker': 'Sticker',
  'admin': 'Admin',
  'group': 'Group',
  'internet': 'Internet',
  'downloader': 'Downloader',
  'tools': 'Tools',
  'info': 'Info',
  '': 'Tanpa Kategori',
}
const defaultMenu = {
  before: `
╭─「 %me 」
│ Hai, %name!
│ Uptime: *%uptime*
│ Database: %rtotalreg
╰────
%readmore`.trimStart(),
  header: '┌─〔 %category 〕',
  body: '├◉ %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
  `,
}
let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let img = await(await fetch('https://telegra.ph/file/03e200201e73f93f93bd9.jpg')).buffer()
    let caption = `
    ┌「 Menu 」\n${arrayMenuFilter.map(v => '├ ' + _p + command + ' ' + v).join`\n`}
    └────
    `.trim()
    if(teks === '404') {
        return await conn.send2Template2UrlButtonLoc(m.chat, img, caption, watermark, 'UnknownBot', 'https://wa.me/6281393227036', 'Menu', '.menu', 'Owner', '.owner', m)
    }
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2Template2UrlButtonLoc(m.chat, img, text.trim(), watermark, 'UnknownBot', 'https://wa.me/6281393227036', 'Menu', '.menu', 'Owner', '.owner', m)
  } catch (e) {
    throw `Maaf menu sedang error\n\n${e}`
}
handler.command = /^(menu|help|\?)$/i
handler.tags = ['main']
handler.help = ['menu']
handler.exp = 10
module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)
