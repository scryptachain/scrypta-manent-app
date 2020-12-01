import ScryptaCore from "@scrypta/core"
const scrypta = new ScryptaCore(true)
import { ScryptaDB } from "./db"
const db = new ScryptaDB

export class User {    
    async auth(id: any = '') {
        let wallet = await scrypta.returnDefaultxSid()
        let defaultid = await localStorage.getItem('default')
        if (id !== undefined && id !== null && id.length > 0) {
            defaultid = id
        }
        if (defaultid === null) {
            if (wallet !== false && wallet !== '') {
                try {
                    const SIDS = wallet.split(":")
                    const xpub = SIDS[0];
                    wallet = await db.get('xsid', 'xpub', xpub)
                    const master = await scrypta.deriveKeyfromXPub(xpub, 'm/0')
                    return {
                        xsid: wallet.wallet,
                        xpub: xpub,
                        label: wallet.label,
                        master: master.pub
                    }
                } catch (e) {
                    return false
                }
            } else {
                await scrypta.importBrowserSID()
                const defaultid = await scrypta.returnDefaultIdentity()
                if (defaultid !== false && defaultid !== '') {
                    try {
                        const SIDS = defaultid.split(":")
                        const address = SIDS[0];
                        wallet = await scrypta.returnIdentity(address)
                        return {
                            sid: wallet.wallet,
                            address: address,
                            label: wallet.label,
                            master: address
                        }
                    } catch (e) {
                        return false
                    }
                } else {
                    const sid = await db.get('wallet')
                    const xsid = await db.get('xsid')
                    if (xsid.length > 0) {
                        const SIDS = xsid[0].wallet.split(":")
                        const xpub = SIDS[0];
                        const master = await scrypta.deriveKeyfromXPub(xpub, 'm/0')
                        return {
                            xsid: xsid[0].wallet,
                            xpub: xpub,
                            label: xsid[0].label,
                            master: master.pub
                        }
                    } else if (sid.length > 0) {
                        const SIDS = sid[0].wallet.split(":")
                        const address = SIDS[0];
                        return {
                            sid: sid[0].wallet,
                            address: address,
                            label: sid[0].label,
                            master: address
                        }
                    } else {
                        return false
                    }
                }
            }
        } else {
            if (defaultid.indexOf('xpub') !== -1) {
                const SIDS = defaultid.split(':')
                const wallet = await db.get('xsid', 'xpub', SIDS[0])
                const master = await scrypta.deriveKeyfromXPub(wallet.xpub, 'm/0')
                return {
                    xsid: wallet.wallet,
                    xpub: wallet.xpub,
                    label: wallet.label,
                    master: master.pub
                }
            } else {
                const SIDS = defaultid.split(':')
                const wallet = await db.get('wallet', 'address', SIDS[0])
                return {
                    sid: wallet.wallet,
                    address: wallet.address,
                    label: wallet.label,
                    master: wallet.address
                }
            }
        }
    }

    configs(): {} {
        return new Promise(async response => {
            let language = await db.get('settings', 'set', 'language')
            if (language === undefined || language.value === undefined) {
                language = 'en'
                await db.put('settings', { set: 'language', value: 'en' })
            } else {
                language = language.value
            }

            let chain = await db.get('settings', 'set', 'chain')
            if (chain === undefined || chain.value === undefined) {
                chain = 'LYRA'
                await db.put('settings', { set: 'chain', value: 'LYRA' })
            } else {
                chain = chain.value
            }

            response({
                chain: chain,
                language: language
            })
        })

    }
}