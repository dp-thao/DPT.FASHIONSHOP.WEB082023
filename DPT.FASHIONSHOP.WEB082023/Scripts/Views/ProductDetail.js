
$(document).ready(function () {

})

//Biến chứa danh sách các thẻ tag màu sắc
var colorTagList = [];
// Chuỗi màu sắc khi thêm mới hàng hóa
var productAddColor = "";
//Biến chứa danh sách các thẻ tag size
var sizeTagList = [];

class ProductDetail {
    constructor() {
        this.initEvents();
    }

    // ======================== Xử lý sự kiện ========================
    initEvents() {
        // Sự kiện nhất nút Hủy bỏ
        $('#btnProductTopCancel').on('click', function () {
            // Ẩn
            $('.content-product').css('display', 'block');
            $('.content-product-detail').css('display', 'none');
            $('.panel-title-text-task').css('display', 'none');
            $('.panel-title-text-task').html('');
            $('.content-status-option').css('display', 'none');
            // Hiện
            $('.panel-title-text-catalog').css('color', '#000');
            $('.panel-back').css('display', 'flex');
        });
        $('#btnProductBottomCancel').on('click', function () {
            // Ẩn
            $('.content-product').css('display', 'block');
            $('.content-product-detail').css('display', 'none');
            $('.panel-title-text-task').css('display', 'none');
            $('.panel-title-text-task').html('');
            $('.content-status-option').css('display', 'none');
            // Hiện
            $('.panel-title-text-catalog').css('color', '#000');
            $('.panel-back').css('display', 'flex');
        });

        // Sự kiện nhấn Nhóm hàng hóa
        $('#cbocategoryoption').on('click', function () {
            $('#divcategoryoption').toggle();
            productDetail.getGroupProduct();
        });
        // click ra ngoài Nhóm hàng hóa thì ẩn danh sách nhóm hàng hóa
        $(document).on('click', function (e) {
            // nếu sự kiện gần nhất có id là cbocategoryoption thì display - none
            if (!e.target.closest('#cbocategoryoption') && !e.target.closest('#cbocounteroption')) {
                $('.input-list-option').css('display', 'none');
            }
        });

        // Sự kiện hiển thị Đơn vị tính
        $('#cbocounteroption').on('click', function () {
            $('#divcounteroption').toggle();
            productDetail.getCalculationUnit();
        });

        // Sự kiện chọn Nhóm hàng hóa
        $('.input-category-option-block').on('click', 'li', function () {  
            var productGroupId = $(this).attr('unitvalue');
            var productGroupName = $(this).text();
            $('#txtproductcategory').val(productGroupName);
        });

        // Sự kiện chọn Đơn vị tính
        $('.input-counter-option-block').on('click', 'li', function () {
            var calculationUnitID = $(this).attr('unitvalue');
            var calculationUnitName = $(this).text();
            $('#txtcounterproduct').val(calculationUnitName);
        });

        // Thêm thẻ tag Color sau khi nhấn enter
        $('#txtColorInput').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                productDetail.createNoteColor();
            }
        });

        // Thêm thẻ tag Size sau khi nhấn enter
        $('#txtSizeInput').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                productDetail.createNoteSize();
            }
        });
    }
    // ================================================
    // Hàm tạo note Color
    createNoteColor() {
        //Tạo mảng chứa các giá trị đã có
        var colorValue = $('#txtColorInput').val().replace(/\s+/g, ''); // .replace(): remove all the spaces in entire string use replace
        if (colorTagList.includes(colorValue) === false) {
            // Đẩy giá trị vào mảng
            colorTagList.push(colorValue);
            // Set danh sách ColorTag khi thêm mới
            productAddColor = "";
            $.each(colorTagList, function (index, item) {
                productAddColor += (item.concat(','));
            });
            // Tạo thẻ tag
            var colorNode =
            `<li class="input-property-tag-item" colortagtext=${colorValue} onclick=productDetail.removeColorTag(this,'${colorValue}')>
                <div class="input-property-tag-item-content">
                    <span>${colorValue}</span>
                    <span class="input-property-tag-item-dispose"></span>
                </div>
            </li>`;
            $('#inputcolorlist').append(colorNode);
            $('#txtColorInput').val('');
        }
    }

    // Hàm xóa note Color
    removeColorTag(element, colorValue) {
        // Xóa màu trong danh sách
        var colorIndex = colorTagList.indexOf(colorValue);
        if (colorIndex > -1) { // only splice array when item is found
            colorTagList.splice(colorIndex, 1); // 2nd parameter means remove one item only
        }
        // render lại note
        $('#inputcolorlist').empty();
        $.each(colorTagList, function (index, item) {
            var colorNode =
                `<li class="input-property-tag-item" colortagtext=${item} onclick=productDetail.removeColorTag(this,'${item}')>
                    <div class="input-property-tag-item-content">
                        <span>${item}</span>
                        <span class="input-property-tag-item-dispose"></span>
                    </div>
                </li>`;
            $('#inputcolorlist').append(colorNode);
            $('#txtColorInput').val('');
        });
    }

    // Hàm tạo note Size
    createNoteSize() {
        //Tạo mảng chứa các giá trị đã có
        var sizeValue = $('#txtSizeInput').val().replace(/\\/g, '');
        if (sizeTagList.includes(sizeValue) == false) {
            // Thêm giá trị size vào mảng
            sizeTagList.push(sizeValue);
            // Tạo thẻ tag size
            var sizeNote = 
                `<li class="input-property-tag-item" onclick=productDetail.removeSizeTag(this,'${sizeValue}')>
                    <div class="input-property-tag-item-content">
                        <span>${sizeValue}</span>
                        <span class="input-property-tag-item-dispose"></span>
                    </div>
                </li>`;

            $('#inputsizelist').append(sizeNote);
            $('#txtSizeInput').val('');
        }
    }

    // Hàm xóa note Size
    removeSizeTag(element, sizeValue) {
        // Xóa size trong mảng
        var sizeIndex = sizeTagList.indexOf(sizeValue);
        if (sizeIndex > -1) {
            sizeTagList.splice(sizeIndex, 1);
        }
        // render lại size
        $('#inputsizelist').empty();
        $.each(sizeTagList, function (index, item) {
            var sizeNote =
                `<li class="input-property-tag-item" onclick=productDetail.removeSizeTag(this,'${item}')>
                    <div class="input-property-tag-item-content">
                        <span>${item}</span>
                        <span class="input-property-tag-item-dispose"></span>
                    </div>
                </li>`;
            $('#inputsizelist').append(sizeNote);
            $('#txtSizeInput').val('');
        });
    }

    // ======================== Thao tác với dữ liệu ========================
    // Hàm lấy danh sách nhóm hàng hóa
    // date: 06/08/2023
    getGroupProduct() {
        $('.input-category-option-block').empty();
        $.ajax({
            url: '/ProductGroup/Get',
            method: 'GET',
            success: function (response) {
                if (response.Data.length > 0) {
                    var data = response.Data;
                    $.each(data, function (index, item) {
                        //$('.input-category-option-block').append('<li>' + item["ProductGroupName"] + '</li>');
                        $('.input-category-option-block').append(`<li unitvalue="${item["ProductGroupID"]}">${item["ProductGroupName"]}</li>`);
                    });
                }
            },
            false: function (response) {
                alert(response.Messenger);
            },
            error: function (response) {
                alert(response.Messenger);
            }
        });
    }

    // Hàm lấy danh sách đơn vị tính
    // date: 06/08/2023
    getCalculationUnit() {
        $('.input-counter-option-block').empty();
        $.ajax({
            url: '/CalculationUnit/Get',
            method: 'GET',
            success: function (response) {
                if (response.Data.length > 0) {
                    $.each(response.Data, function (index, item) {
                        $('.input-counter-option-block').append('<li>' + item["CalculationUnitName"] + '</li>');
                    });
                }
            },
            false: function (response) {
                alert(response.Messenger);
            },
            error: function (response) {
                alert(response.Messenger);
            }
        });
    }

}

var productDetail = new ProductDetail();

// ======================== Hàm bổ trợ ========================
