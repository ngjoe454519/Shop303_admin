//const Dia_chi_Dich_vu='http://localhost:8088';
//const Dia_chi_Img='http://localhost:8088';
 const Dia_chi_Dich_vu='https://hephucvu-1k69.onrender.com';
 const Dia_chi_Img='https://hephucvu-1k69.onrender.com';
const apiTivi=()=>{
    return new Promise((Ket_qua, Loi) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            try {
                Du_lieu = JSON.parse(Chuoi_JSON)
                Ket_qua(Du_lieu)
            } catch (e) {
                Loi({ error: 'Invalid JSON', response: Chuoi_JSON })
            }
        }
        let Tham_so = `LIST_TIVI`
        let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`
        Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly)
        Xu_ly_HTTP.send()
    })
}
const apiTiviInsert=(item)=>{
    return new Promise((Ket_qua, Loi) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            try {
                Du_lieu = JSON.parse(Chuoi_JSON)
                Ket_qua(Du_lieu)
            } catch (e) {
                Loi({ error: 'Invalid JSON', response: Chuoi_JSON })
            }
        }
        let Tham_so = `INSERT_TIVI`
        let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly)
        Xu_ly_HTTP.send(JSON.stringify(item))
    })
}
const apiTiviUpdate=(item)=>{
    return new Promise((Ket_qua, Loi) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            Ket_qua(Du_lieu)
        }
        let Tham_so = `UPDATE_TIVI`
        let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`
        Xu_ly_HTTP.open("PUT", Dia_chi_Xu_ly)
        Xu_ly_HTTP.send(JSON.stringify(item))
    })
}
const apiTiviDelete=(item)=>{
    return new Promise((Ket_qua, Loi) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            Du_lieu = JSON.parse(Chuoi_JSON)
            Ket_qua(Du_lieu)
        }
        let Tham_so = `DELETE_TIVI`
        let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`
        Xu_ly_HTTP.open("DELETE", Dia_chi_Xu_ly)
        Xu_ly_HTTP.send(JSON.stringify(item))
    })
}
const apiImageTivi=(item)=>{
    return new Promise((Ket_qua, Loi) => {
        let Du_lieu = {}
        let Xu_ly_HTTP = new XMLHttpRequest()
        Xu_ly_HTTP.onload = () => {
            var Chuoi_JSON = Xu_ly_HTTP.responseText
            try {
                Du_lieu = JSON.parse(Chuoi_JSON)
                Ket_qua(Du_lieu)
            } catch (e) {
                Loi({ error: 'Invalid JSON', response: Chuoi_JSON })
            }
        }
        let Tham_so = `UPLOAD_IMG_TIVI`
        let Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}/${Tham_so}`
        Xu_ly_HTTP.open("POST", Dia_chi_Xu_ly)
        Xu_ly_HTTP.send(JSON.stringify(item))
    })
}
