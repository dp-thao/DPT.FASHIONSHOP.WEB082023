
$(document).ready(function () {
    //Load dữ liệu vào gridview
    productJS.loadData();
    productJS.recordNumber(1, 10);
})

const VND = new Intl.NumberFormat('vi', {
    style: 'currency',
    currency: 'VND',
});

// Tổng số product
var sumProduct = 0;
// Các biến dùng cho phân trang
var rowBegin = 1; // dòng bắt đầu
var rowEnd = 2; // dòng kết thúc
var sumPage = 0; // Biến nhận biết tổng số trang

// Biến nhận biết ID của dòng đang được chọn (phục vụ fill data vào dialog sửa)
var currentID = '';
// Biến nhận biết hàng hóa người dùng đang chọn tên là gì
var currentProductName = '';
var currentSKU = ''; // Biến nhận biết mã SKU người dùng đang chọn
var statusSave = null; // Biến nhận biết trạng thái tương tác Thêm, Sửa, Xóa, Nhân bản
var arrProductIsChoose = []; // Mảng chứa product muốn xóa
var arrProductInfoDelete = []; // Mảng chứa thông tin product được chọn

class ProductJS {
    constructor() {
        this.initEvents();
    }

    // ======================== Xử lý sự kiện ========================
    initEvents() {
        // Sự kiện click combobox shop
        $('.panel-shop').on('click', function () {
            var conditionOffset = $(this).offset();
            $('.combobox-shop-option').toggle();
            $('.combobox-shop-option').offset({ top: conditionOffset.top + 33, left: conditionOffset.left });
        });

        // Sự kiện click account
        $('.panel-account').on('click', function () {
            var conditionOffset = $(this).offset();
            $('.combobox-account-option').toggle();
            $('.combobox-account-option').offset({ top: conditionOffset.top + 33, left: conditionOffset.left - 23 });
        });

        // Sự kiện hover content product sẽ ẩn shop và account
        $('.content-product').hover(function () {
            $('.combobox-shop-option').css('display', 'none');
            $('.combobox-account-option').css('display', 'none');
        });

        // Sự kiện nhấn nút check tất cả
        $('.grid-header-checkcolumn-icon').on('click', function () {
            if ($('.grid-header-checkcolumn-icon').hasClass('grid-body-row-checkbox-icon-checked')) {
                $('.grid-header-checkcolumn-icon').removeClass('grid-body-row-checkbox-icon-checked');
                $('.grid-body-checkbox-icon').removeClass('grid-body-row-checkbox-icon-checked');
                $('#btnDuplicateProduct').removeClass('toolbar-button-disable-event');
                $('#btnEditProduct').removeClass('toolbar-button-disable-event');
            } else {
                $('.grid-header-checkcolumn-icon').addClass('grid-body-row-checkbox-icon-checked');
                $('.grid-body-checkbox-icon').addClass('grid-body-row-checkbox-icon-checked');
                $('#btnDuplicateProduct').addClass('toolbar-button-disable-event');
                $('#btnEditProduct').addClass('toolbar-button-disable-event');
            }
        });

        // Sự kiện nhấn từng nút check
        //$('.grid-body-checkbox-icon').click(function () {
        //    if ($(this).hasClass('grid-body-row-checkbox-icon-checked')) {
        //        $(this).removeClass('grid-body-row-checkbox-icon-checked');
        //    } else {
        //        $(this).addClass('grid-body-row-checkbox-icon-checked');
        //    }
        //});
        $(".grid-body-checkbox-icon").on("dblclick", function () {
            alert("Handler for `dblclick` called.");
        });
        //$('.grid-body-checkbox-icon').on('dblclick', function () {
        //    alert(123);
        //});

        // Ẩn - hiện các điều kiện lọc thường
        $('.nomal-condition-search').on('click', function () {
            // ẩn các điều kiện lọc khác
            $('.filter-price-option').css('display', 'none'); // ẩn điều kiện lọc giá
            $('.filter-displayonscreen-option').css('display', 'none'); // ẩn hiển thị trên màn hình bán
            $('.filter-category-option').css('display', 'none'); // ẩn loại hàng hóa
            $('.filter-status-option').css('display', 'none'); // ẩn hiện trạng thái
            // hiển thị điều kiện lọc thường
            var conditionOffset = $(this).offset(); // lấy vị trí
            $('.filter-nomal-option').toggle();
            $('.filter-nomal-option').offset({ top: conditionOffset.top + 32, left: conditionOffset.left });
        });

        // Ẩn - hiện điều kiện lọc cho giá
        $('.price-condition-search').on('click', function () {
            // ẩn các điều kiện lọc khác
            $('.filter-nomal-option').css('display', 'none'); // ẩn điều kiện lọc thường
            $('.filter-displayonscreen-option').css('display', 'none'); // ẩn hiển thị trên màn hình bán
            $('.filter-category-option').css('display', 'none'); // ẩn loại hàng hóa
            $('.filter-status-option').css('display', 'none'); // ẩn hiện trạng thái
            // hiển thị điều kiện lọc giá
            var conditionOffset = $(this).offset(); // lấy vị trí
            $('.filter-price-option').toggle();
            $('.filter-price-option').offset({ top: conditionOffset.top + 32, left: conditionOffset.left });
        });

        // Ẩn - hiện hiển thị trên màn hình bán
        $('.displayoscreen-condition-search').on('click', function () {
            // ẩn các điều kiện lọc khác
            $('.filter-nomal-option').css('display', 'none'); // ẩn điều kiện lọc thường
            $('.filter-price-option').css('display', 'none'); // ẩn điều kiện lọc giá
            $('.filter-category-option').css('display', 'none'); // ẩn loại hàng hóa
            $('.filter-status-option').css('display', 'none'); // ẩn hiện trạng thái
            // hiển thị "hiển thị trên màn hình bán"
            var conditionOffset = $(this).offset();
            $('.filter-displayonscreen-option').toggle();
            $('.filter-displayonscreen-option').offset({ top: conditionOffset.top + 32, left: conditionOffset.left - 155 });
        });

        // Ẩn - hiện loại hàng hóa
        $('.category-condition-search').on('click', function () {
            // ẩn các điều kiện lọc khác
            $('.filter-nomal-option').css('display', 'none'); // ẩn điều kiện lọc thường
            $('.filter-price-option').css('display', 'none'); // ẩn điều kiện lọc giá
            $('.filter-displayonscreen-option').css('display', 'none'); // ẩn hiển thị trên màn hình bán
            $('.filter-status-option').css('display', 'none'); // ẩn hiện trạng thái
            // hiển thị loại hàng hóa
            var conditionOffset = $(this).offset();
            $('.filter-category-option').toggle();
            $('.filter-category-option').offset({ top: conditionOffset.top + 32, left: conditionOffset.left - 96 });
        });

        // Ẩn - hiện trạng thái
        $('.status-condition-search').on('click', function () {
            // ẩn các điều kiện lọc khác
            $('.filter-nomal-option').css('display', 'none'); // ẩn điều kiện lọc thường
            $('.filter-price-option').css('display', 'none'); // ẩn điều kiện lọc giá
            $('.filter-displayonscreen-option').css('display', 'none'); // ẩn hiển thị trên màn hình bán
            $('.filter-category-option').css('display', 'none'); // ẩn loại hàng hóa
            // hiển thị trạng thái
            var conditionOffset = $(this).offset();
            $('.filter-status-option').toggle();
            $('.filter-status-option').offset({ top: conditionOffset.top + 32, left: conditionOffset.left - 120 });
        });

        // Sự kiện hover vào grid-body sẽ ẩn các điều kiện lọc
        $('.grid-body').hover(function () {
            $('.filter-nomal-option').css('display', 'none'); // ẩn điều kiện lọc thường
            $('.filter-price-option').css('display', 'none'); // ẩn điều kiện lọc giá
            $('.filter-displayonscreen-option').css('display', 'none'); // ẩn hiển thị trên màn hình bán
            $('.filter-category-option').css('display', 'none'); // ẩn loại hàng hóa
            $('.filter-status-option').css('display', 'none'); // ẩn hiện trạng thái
        });

        // Sự kiện nhất nút Thêm mới
        $('#btnAddProduct').on('click', function () {
            statusSave = 'add';
            // Ẩn
            $('.content-product').css('display', 'none');
            $('.panel-back').css('display', 'none');
            // Hiện
            $('.panel-title-text-task').css('display', 'flex');
            $('.content-product-detail').css('display', 'block');
            $('.panel-title-text-catalog').css('color', 'rgb(84, 144, 174)');
            $('.panel-title-text-task').html('/&ensp;Thêm mới');
        });

        // Sự kiện nhất nút Nhân bản
        $('#btnDuplicateProduct').on('click', function () {
            statusSave = 'duplicate';
            // Ẩn
            $('.content-product').css('display', 'none');
            $('.panel-back').css('display', 'none');
            // Hiện
            $('.panel-title-text-task').css('display', 'flex');
            $('.content-product-detail').css('display', 'block');
            $('.panel-title-text-catalog').css('color', 'rgb(84, 144, 174)');
            $('.panel-title-text-task').html('/&ensp;Nhân bản');
        });

        // Sự kiện nhất nút Sửa
        $('#btnEditProduct').on('click', function () {
            statusSave = 'edit';
            // Ẩn
            $('.content-product').css('display', 'none');
            $('.panel-back').css('display', 'none');
            // Hiện
            $('.panel-title-text-task').css('display', 'flex');
            $('.content-product-detail').css('display', 'block');
            $('.panel-title-text-catalog').css('color', 'rgb(84, 144, 174)');
            $('.panel-title-text-task').html('/&ensp;Sửa');
            $('.content-status-option').css('display', 'flex');
        });
        // Sự kiện nhất nút Xóa
        $('#btnDeleteProduct').on('click', function () {
            if (arrProductIsChoose.length == 0) {
                alert('Không có thông tin sản phẩm cần xóa!');
            } else {
                statusSave = 'delete';
                // Ẩn
                // Hiện
                $('.ui-form-delete').css('display', 'block');
                $('.ui-widget-overlay').css('display', 'block');
                // Thay đổi thông tin tên và mã SKU trong form xác nhận xóa
                if (arrProductIsChoose.length == 1) {
                    var arrRows = $('.grid-body-row');
                    $.each(arrRows, function (index, item) {
                        if ($(item).find('.grid-body-checkbox-icon').hasClass('grid-body-row-checkbox-icon-checked') == true) {
                            currentProductName = $(item).find('.grid-body-colum-productname a').text();
                            currentSKU = $(item).find('.grid-body-colum-sku').text();
                            // Lấy tên product khi click checkbox
                            $('#dialog-delete-productname').text(currentProductName);
                            $('#dialog-delete-sku').text(currentSKU);
                        }
                    });
                    // Hiện thông báo
                    $('.dialog-message-text-delete').css('display', 'block');
                    $('.dialog-message-text-deletemany').css('display', 'none');
                } else {
                    $('.dialog-message-text-delete').css('display', 'none');
                    $('.dialog-message-text-deletemany').css('display', 'block');
                }
            }
        });
        // Sự kiện đóng form xóa
        $('#btncanceldelete').on('click', function () {
            statusSave = '';
            $('.ui-form-delete').css('display', 'none');
            $('.ui-widget-overlay').css('display', 'none');
        });
        // Sự kiện đóng form xóa
        $('.ui-dialog-titlebar-close').on('click', function () {
            statusSave = '';
            $('.ui-form-delete').css('display', 'none');
            $('.ui-widget-overlay').css('display', 'none');
        });
        // Sự kiện xác nhận xóa product
        $('#btnconfirmdelete').on('click', function () {
            if (arrProductIsChoose.length > 0) {
                productDetail.deleteProduct();
            }
        });

        // Sự kiện nhấn kích thước trang
        $('.paging-record-select').on('change', function () {
            var pageSize = this.value; // kích thước trang
            $('#pagingnumberinput').val('1');
            productJS.productListPaging(1, pageSize);
            productJS.recordNumber(1, pageSize);
            // Bỏ lựa chọn ô check box
            if ($('.grid-header-checkcolumn-icon').hasClass('grid-body-row-checkbox-icon-checked')) {
                $('.grid-header-checkcolumn-icon').removeClass('grid-body-row-checkbox-icon-checked');
                $('#btnDuplicateProduct').removeClass('toolbar-button-disable-event');
                $('#btnEditProduct').removeClass('toolbar-button-disable-event');
            }
        });

        // Sự kiện trang tiếp theo
        $('#btnnextpage').on('click', function () {
            var currentPage = $('#pagingnumberinput').val();
            var pageSize = $('.paging-record-select').val();
            if (currentPage < sumPage) {
                currentPage++;
                productJS.productListPaging(currentPage, pageSize);
            } else {
                productJS.productListPaging(currentPage, pageSize);
            }
            // Bỏ lựa chọn ô check box
            if ($('.grid-header-checkcolumn-icon').hasClass('grid-body-row-checkbox-icon-checked')) {
                $('.grid-header-checkcolumn-icon').removeClass('grid-body-row-checkbox-icon-checked');
                $('#btnDuplicateProduct').removeClass('toolbar-button-disable-event');
                $('#btnEditProduct').removeClass('toolbar-button-disable-event');
            }
        });

        // Sự kiện trang trước
        $('#btnpreviouspage').on('click', function () {
            var currentPage = $('#pagingnumberinput').val();
            var pageSize = $('.paging-record-select').val();
            if (currentPage > 1) {
                currentPage--;
                productJS.productListPaging(currentPage, pageSize);
            } else {
                productJS.productListPaging(currentPage, pageSize);
            }
            // Bỏ lựa chọn ô check box
            if ($('.grid-header-checkcolumn-icon').hasClass('grid-body-row-checkbox-icon-checked')) {
                $('.grid-header-checkcolumn-icon').removeClass('grid-body-row-checkbox-icon-checked');
                $('#btnDuplicateProduct').removeClass('toolbar-button-disable-event');
                $('#btnEditProduct').removeClass('toolbar-button-disable-event');
            }
        });

        // Sự kiện nhấn trang đầu tiên
        $('.btn-paging-firstpage').on('click', function () {
            var pageSize = $('.paging-record-select').val();
            productJS.productListPaging(1, pageSize);
        });

        // Sự kiện nhấn trang cuối cùng
        $('.btn-paging-lastpage').on('click', function () {
            var pageSize = $('.paging-record-select').val();
            //productJS.productListPaging(sumProduct, pageSize);
        });

    }

    // ======================== Hàm xử lý nghiệp vụ ========================
    // Hàm xử lý click checkbox
    chooseRowCheckbox(element, productIDName) {
        if ($(element).children().hasClass('grid-body-row-checkbox-icon-checked')) {
            $(element).children().removeClass('grid-body-row-checkbox-icon-checked');
            // kiểm tra product đã có trong danh sách xóa chưa, nếu có thì xóa product đó đi
            if (arrProductIsChoose.includes(productIDName) === true) {
                var indexProduct = arrProductIsChoose.indexOf(productIDName);
                arrProductIsChoose.splice(indexProduct, 1);
            }
        } else {
            $(element).children().addClass('grid-body-row-checkbox-icon-checked');
            // kiểm tra product đã có trong danh sách xóa chưa, nếu chưa có thì thêm vào danh sách xóa
            if (arrProductIsChoose.includes(productIDName) === false) {
                arrProductIsChoose.push(productIDName);
            }
        }

        // Kiểm tra các ô check box đã click hết chưa, nếu đã click hết thì click checkbox tất cả, nếu chưa thì không click checkbox all
        var dem = 0;
        var classList = $('.grid-body-checkbox-icon'); // danh sách các ô checkbox
        $.each(classList, function (index, item) { // lặp kiểm tra từng ô checkbox xem đã click chưa
            // nếu chưa click thì biến đếm giữ nguyên, nếu click thì biến đếm tăng 1
            if ($(item).hasClass('grid-body-row-checkbox-icon-checked') == true) {
                dem++;
            }
        });
        // nếu tất cả các checkbox đều click thì click checkbox tất cả
        if (dem == classList.length) {
            $('.grid-header-checkcolumn-icon').addClass('grid-body-row-checkbox-icon-checked');
        } else {
            $('.grid-header-checkcolumn-icon').removeClass('grid-body-row-checkbox-icon-checked');
        }
        // nếu có nhiều hơn 2 ô checkbox được click thì ẩn Nhân bản và Sửa
        if (dem >= 2) {
            $('#btnDuplicateProduct').addClass('toolbar-button-disable-event');
            $('#btnEditProduct').addClass('toolbar-button-disable-event');
        } else {
            $('#btnDuplicateProduct').removeClass('toolbar-button-disable-event');
            $('#btnEditProduct').removeClass('toolbar-button-disable-event');
        }
    }

    // Hàm xử lý sự kiện click dòng product
    setCurrentID(element, productID) {
        //Đổi màu dòng khi click
        $('.grid-body-row-odd').css('background', '#fff');
        $('.grid-body-row-even').css('background', 'rgb(246, 246, 246)');
        $(element).css('background', '#c3ecff');       
    }

    // Hàm xử lý double click dòng product
    dbclickToEdit(element, productID) {
        // Ẩn
        $('.content-product').css('display', 'none');
        $('.panel-back').css('display', 'none');
        // Hiện
        $('.panel-title-text-task').css('display', 'flex');
        $('.content-product-detail').css('display', 'block');
        $('.panel-title-text-catalog').css('color', 'rgb(84, 144, 174)');
        $('.panel-title-text-task').html('/&ensp;Sửa');
        $('.content-status-option').css('display', 'flex');
    }

    // Hàm xử lý click tất cả sản phẩm thì thêm các sản phẩm vào danh sách sản phẩm cần xóa
    allProductIsChoose() {
        var arr = $('.grid-body-checkbox-icon');
        $.each(arr, function (index, item) {
            var classEle = item.classList[0];
            if ($(item).hasClass('grid-body-row-checkbox-icon-checked')) {
                // đang làm dở
                var idProduct = $(item).parents(".row-input-div-productname")
                arrProductIsChoose.push();
            }
        });
    }
    
    // ======================== Hàm thao tác với dữ liệu ========================
    // Đổ dữ liệu lên grid view
    loadData() {
        $('.grid-body').empty();
        $.ajax({
            method: 'POST', // phương thức gửi request
            async: false,
            data: [], // dữ liệu gửi đi chứa trong body
            dataType: 'json', // kiểu dữ liệu mong muốn trả về
            contentType: 'application/json', // kiểu dữ liệu gửi đi
            url: '/Product/Get',
            // Nếu thành công thì đổ dữ liệu ra grid
            success: function (response) { // response: máy chủ trả về dữ liệu JSON, truy cập trong hàm xử lý "success" thông qua tham số response
                if (response.Data.length > 0) {
                    var data = response.Data;
                    var sumRow = data.length;
                    sumProduct = data.length;
                    /*var sumPage = 0;*/
                    // Tính tổng số trang
                    if (sumRow % 10 == 0) {
                        sumPage = sumRow / 10;
                    } else {
                        sumPage = Math.floor(sumRow / 10) + 1;
                    }
                    $('#lbl-sumPage').text(`trên ${sumPage}`);
                    var currentPage = $('#pagingnumberinput').val();
                    // Lặp từng dòng dữ liệu
                    if (currentPage <= sumPage && currentPage > 0) {
                        $('#pagingnumberinput').val(currentPage);
                        $('.paging-record-select').val('10');
                        var pageSize = $('.paging-record-select').val();

                        // lặp dòng và hiển thị số dòng theo phân trang
                        if (currentPage == 1) {
                            for (var index = 0; index < pageSize; index++) {
                                productJS.productRows(index, data);
                            }
                        } else {
                            var rowBegin = (currentPage - 1) * pageSize;
                            for (var index = rowBegin; index < (rowBegin + Number(pageSize)); index++) {
                                productJS.productRows(index, data);
                            }
                        }
                    }
                }
            },
            // Nếu không thành công thì hiện thông báo không thành công
            fail: function (response) {
                alert("Không thành công!");
            },
            // Nếu lỗi thì hiện thông báo lỗi
            error: function (response) {
                alert("Có lỗi!");
            }
        });
    }

    // Hiển thị danh sách product theo phân trang
    productListPaging(currentPage, pageSize) {
        $('.grid-body').empty();
        $.ajax({
            method: 'POST', // phương thức gửi request
            async: false,
            data: [], // dữ liệu gửi đi chứa trong body
            dataType: 'json', // kiểu dữ liệu mong muốn trả về
            contentType: 'application/json', // kiểu dữ liệu gửi đi
            url: '/Product/Get',
            // Nếu thành công thì đổ dữ liệu ra grid
            success: function (response) { // response: máy chủ trả về dữ liệu JSON, truy cập trong hàm xử lý "success" thông qua tham số response
                if (response.Data.length > 0) {
                    var data = response.Data;
                    var sumRow = data.length; // tổng số dòng (sản phẩm)                 
                    /*var sumPage = 0;*/ // Tổng số trang
                    // Tính tổng số trang
                    if (sumRow % pageSize == 0) {
                        sumPage = sumRow / pageSize;
                    } else {
                        sumPage = Math.floor(sumRow / pageSize) + 1;
                    }                    
                    $('#lbl-sumPage').text(`trên ${sumPage}`); // gán lại tổng số trang để hiển thị trên giao diện
                    // kiểm tra trang hiện tại có lớn hơn tổng số trang không, nếu nhỏ hơn hoặc bằng thì thực hiện hiển thị danh sách sản phẩm, nếu lớn hơn thì không làm gì cả
                    if (currentPage <= sumPage && currentPage > 0) {
                        $('#pagingnumberinput').val(currentPage);
                        // lặp dòng và hiển thị số dòng theo phân trang
                        if (currentPage == 1) {
                            for (var i = 0; i < pageSize; i++) {
                                productJS.productRows(i, data);
                                productJS.recordNumber(1, pageSize);
                            }
                        } else {
                            var rowBegin = (currentPage - 1) * pageSize;
                            var rowEnd = rowBegin + Number(pageSize);
                            var end = 0;
                            for (var i = rowBegin; i < rowEnd; i++) {
                                if (data[i] != null) {
                                    productJS.productRows(i, data);
                                    end = i+1;
                                } else {
                                    break;
                                }
                            }
                            productJS.recordNumber(rowBegin, end);
                        }
                    }                  
                    
                }
            },
            // Nếu không thành công thì hiện thông báo không thành công
            fail: function (response) {
                alert("Không thành công!");
            },
            // Nếu lỗi thì hiện thông báo lỗi
            error: function (response) {
                alert("Có lỗi!");
            }
        });
    }

    // Hàm hỗ trợ hiển thị dòng product theo phân trang
    productRows(index, product) {
        var divHTML = '';
        var salePrice = VND.format(product[index].SalePrice);
        if (index % 2 == 0) {
            divHTML = `<div class="row grid-body-row grid-body-row-odd" onclick="productJS.setCurrentID(this, '${product[index].ProductID}')" ondblclick="productJS.dbclickToEdit(this, '${product[index].ProductID}')" indexRow="${index}"></div>`;
        } else {
            divHTML = `<div class="row grid-body-row grid-body-row-even" onclick="productJS.setCurrentID(this)" ondblclick="productJS.dbclickToEdit(this, '${product[index].ProductID}')" indexRow="${index}"></div>`;
        }
        divHTML = $(divHTML).append(`
            <div class="col-lg-1 grid-body-colum-checkbox" onclick="productJS.chooseRowCheckbox(this, '${product[index].ProductID}')">
                <span class="grid-body-checkbox-icon"></span>
            </div>
            <div class="col-lg-1 grid-body-colum grid-body-colum-sku">${product[index].SKUCode}</div>
            <div class="col-lg-4 grid-body-colum grid-body-colum-productname">
                <a href="#">${product[index].ProductName}</a>
            </div>
            <div class="col-lg-1 grid-body-colum grid-body-colum-groupproduct">${product[index].ProductGroupName}</div>
            <div class="col-lg-1 grid-body-colum grid-body-colum-counter">${product[index].CalculationUnitName}</div>
            <div class="col-lg-1 grid-body-colum grid-body-colum-price">${salePrice}</div>
            <div class="col-lg-1 grid-body-colum grid-body-colum-displayscreen">Có</div>
            <div class="col-lg-1 grid-body-colum grid-body-colum-category">Hàng hóa</div>
            <div class="col-lg-1 grid-body-colum grid-body-colum-status">Đang kinh doanh</div>
                                `);
        $('.grid-body').append(divHTML);
    }

    // Hàm hiển thị thông báo số sản phẩm
    recordNumber(start, end) {
        //Hiển thị 1 - 50 trên 345 kết quả
        $('.lbl-record-number').text(`Hiển thị ${start} - ${end} trên ${sumProduct} kết quả`);
    }
}

var productJS = new ProductJS();