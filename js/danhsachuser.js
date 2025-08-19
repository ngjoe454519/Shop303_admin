var capNhatUser = true;
const Xuat_Danh_sach_User = (ds) => {
    let html = ``;
    ds.sort((a, b) => a.Ho_ten.localeCompare(b.Ho_ten))
    ds.forEach((item, index) => {
        html += `
        <tr>
            <td scope="row" class="text-center">${item.Ma_so}</td>
            <td class="text-center">
                <img src='${Dia_chi_Img}/${item.Ma_so}.png' class="" />
            </td>
            <td>${item.Ho_ten}</td>
            <td>${item.Ten_Dang_nhap}</td>
            <td>${item.Nhom_Nguoi_dung.Ten}</td>
            <td>
                <a href="javaScript:void(0)" data-toggle="modal" data-target="#modelId" title='Sửa User' onclick="updateUser('${item.Ma_so}')">
                    <i class="fa fa-pencil-square-o text-danger" aria-hidden="true"></i>
                </a>
            </td>
            <td>
                <a href="javaScript:void(0)" onclick="deleteUser('${item.Ma_so}')" title='Xóa User'>
                    <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
        `
    })
    document.querySelector("#Th_Danhsach").innerHTML = html;
}

const KeyCodeUser = (event) => {
    if (event.keyCode == 13) {
        let gtTim = event.target.value.trim()
        let ds = dsUser.filter(x => x.Ho_ten.toLowerCase().includes(gtTim.toLowerCase()))
        Xuat_Danh_sach_User(ds)
    }
}
// Add User
const insertUser = () => {
    capNhatUser = true;
    showModalUser();
}
// Update User
const updateUser = (key) => {
    capNhatUser = false;
    let item = dsUser.find(x => x.Ma_so == key);
    showModalUser(item);
}
// Delete User
const deleteUser = (key) => {
    if(confirm('Hệ thống sẽ Xóa Dữ liệu...?')){
        let condition={
            "Ma_so":key
        }
        apiUserDelete(condition).then(result=>{
            alert('Xóa thành công');
            window.location.reload();
        })
    }
}
// Show Modal
const showModalUser = (item = null) => {
    let urlImg = null;
    let Nhom = "";
    document.querySelector("#ModalTitle").innerHTML = `Thêm User`;
    if (item) {
        document.querySelector("#ModalTitle").innerHTML = `Sửa User`;
        urlImg = `${Dia_chi_Img}/user/${item.Ma_so}.png`;
        Nhom = item.Nhom_Nguoi_dung.Ma_so;
    }
    let html = ``
    html += `
    <div class="form-group">
        <input type="text" class="form-control" id="Th_Ma_so" style="visibility: hidden;"
            value="${item ? item.Ma_so : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Ho_ten">Họ tên</label>
        <input type="text" class="form-control" id="Th_Ho_ten" 
            placeholder="Họ tên" value="${item ? item.Ho_ten : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Ten_Dang_nhap">Tên đăng nhập</label>
        <input type="text" class="form-control" id="Th_Ten_Dang_nhap" 
            placeholder="Tên đăng nhập" value="${item ? item.Ten_Dang_nhap : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Mat_khau">Mật khẩu</label>
        <input type="password" class="form-control" id="Th_Mat_khau" 
            placeholder="Mật khẩu" value="${item ? item.Mat_khau : ''}">
    </div>
    <div class="form-group">
        <label for="Th_Nhom_Nguoi_dung">Nhóm người dùng</label>
        <select id="Th_Nhom_Nguoi_dung">
            <option value="ADMIN" ${Nhom == 'ADMIN' ? 'selected' : ''} >ADMIN</option>
            <option value="NHANVIEN" ${Nhom == 'NHANVIEN' ? 'selected' : ''}>NHÂN VIÊN</option>
        </select>
    </div>
    <div class="form-group">
        <label for="Th_File">Chọn hình</label>
        <input type="file" class="form-control-file" id="Th_File" onchange="previewImgUser()">`
    if (!item) {
        html += `<img id="Th_PreImg" style="width:10rem"  />`
    } else {
        html += `<img id="Th_PreImg" style="width:10rem" src="${urlImg}"  />`
    }
    html += `</div>`
    document.querySelector("#ModalBody").innerHTML = html
}
// Preview Image
const previewImgUser = () => {
    var reader = new FileReader();
    reader.onload = function (e) {
        Th_PreImg.src = e.target.result;
    }
    reader.readAsDataURL(document.querySelector("#Th_File").files[0]);
}
// Save 
const saveUser = () => {
    let Ma_so = (document.querySelector("#Th_Ma_so").value != "") ? document.querySelector("#Th_Ma_so").value : autoKeyUser();
    let Ho_ten = document.querySelector("#Th_Ho_ten").value.trim();
    let Ten_Dang_nhap = document.querySelector("#Th_Ten_Dang_nhap").value.trim();
    let Mat_khau = document.querySelector("#Th_Mat_khau").value.trim();
    let Nhom_Nguoi_dung = document.querySelector("#Th_Nhom_Nguoi_dung").value;
    if (capNhatUser) {
        // Insert
        let userNew = {
            "Ho_ten": Ho_ten,
            "Ma_so": Ma_so,
            "Ten_Dang_nhap": Ten_Dang_nhap,
            "Mat_khau": Mat_khau,
            "Nhom_Nguoi_dung": {
                "Ten": Nhom_Nguoi_dung == 'ADMIN' ? 'ADMIN' : 'NHÂN VIÊN',
                "Ma_so": Nhom_Nguoi_dung
            }
        }
        apiUserInsert(userNew).then(result=>{
            saveImgUser(Ma_so);
            apiUser().then(result => {
                dsUser = result;
                Xuat_Danh_sach_User(dsUser);
                document.querySelector("#ModalCancel").click();
            })
        })
    } else {
        // Update
        let userUpdate = {
            condition: {
                "Ma_so": Ma_so
            },
            update: {
                $set: {
                    "Ho_ten": Ho_ten,
                    "Ten_Dang_nhap": Ten_Dang_nhap,
                    "Mat_khau": Mat_khau,
                    "Nhom_Nguoi_dung": {
                        "Ten": Nhom_Nguoi_dung == 'ADMIN' ? 'ADMIN' : 'NHÂN VIÊN',
                        "Ma_so": Nhom_Nguoi_dung
                    }
                }
            }
        }
        apiUserUpdate(userUpdate).then(result=>{
            saveImgUser(Ma_so);
            apiUser().then(result => {
                dsUser = result;
                Xuat_Danh_sach_User(dsUser);
                document.querySelector("#ModalCancel").click();
            })
        }) 
    }
}
const saveImgUser=(Ma_so)=>{
    let imgName = document.querySelector("#Th_File").value
    // Người dùng có chọn hình
    if (imgName) {
        let reader = new FileReader()
        let Chuoi_nhi_phan = ""
        //let Ten_Hinh = `${Ma_so}.png` // upload vào thư mục images trong dịch vụ nodejs
        let Ten_Hinh = `${Ma_so}` // upload lên trên host cloudinary
        reader.onload = function (e) {
            Chuoi_nhi_phan = e.target.result;
            let img = { "name": Ten_Hinh, "src": Chuoi_nhi_phan }
            //console.log(img)
            apiImageUser(img).then(result=>{
                console.log(result)
                //reader.clear()    
            })
            
        }
        reader.readAsDataURL(document.querySelector("#Th_File").files[0])
    }
}


const autoKeyUser = () => {
    let arr = dsUser;
    arr.sort((a, b) => { return Number(a.Ma_so.trim().split("_")[1]) - Number(b.Ma_so.trim().split("_")[1]) })
    let keyEnd = arr[arr.length - 1];
    let num = Number(keyEnd.Ma_so.split("_")[1]) + 1;
    return `USER_${num}`;
}
