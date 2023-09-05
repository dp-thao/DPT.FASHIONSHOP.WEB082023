
$(document).ready(function () {
    //Load dữ liệu vào gridview
    productJS.loadData();
})

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

    }

    //$('.grid-header-checkcolumn-icon').on('click', function() {
    //    if ($('.grid-header-checkcolumn-icon').hasClass('grid-body-row-checkbox-icon-checked')) {
    //        $('.grid-header-checkcolumn-icon').removeClass('grid-body-row-checkbox-icon-checked');
    //        $('.grid-body-checkbox-icon').removeClass('grid-body-row-checkbox-icon-checked');
    //    } else {
    //        $('.grid-header-checkcolumn-icon').addClass('grid-body-row-checkbox-icon-checked');
    //        $('.grid-body-checkbox-icon').addClass('grid-body-row-checkbox-icon-checked');
    //    }
    //});

    // ======================== Hàm xử lý nghiệp vụ ========================
    // Hàm xử lý click checkbox
    chooseRowCheckbox(element) {
        if ($(element).children().hasClass('grid-body-row-checkbox-icon-checked')) {
            $(element).children().removeClass('grid-body-row-checkbox-icon-checked');
        } else { 
            $(element).children().addClass('grid-body-row-checkbox-icon-checked');
        }

        // Kiểm tra các ô check box đã click hết chưa, nếu đã click hết thì click checkbox tất cả, nếu chưa thì không click checkbox all
        var dem = 0;
        var classList = $('.grid-body-checkbox-icon'); // danh sách các ô checkbox
        $.each(classList, function (index, item) { // lăp kiểm tra từng ô checkbox xem đã click chưa
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
    setCurrentID(element) {
        $(element).css('background', '#c3ecff');
    }

    // Hàm xử lý double click dòng product
    dbclickToEdit() {
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

    // ======================== Thao tác với dữ liệu ========================

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
                    var divHTML = '';
                    var data = response.Data;
                    // Lặp từng dòng dữ liệu
                    $.each(data, function (index, item) { // data: một mảng các đối tượng - item: từng tối tượng
                        if (index % 2 == 0) {
                            divHTML = '<div class="row grid-body-row grid-body-row-odd" onclick="productJS.setCurrentID(this)" ondblclick="productJS.dbclickToEdit()",' + index + '></div>';
                        } else {
                            divHTML = '<div class="row grid-body-row grid-body-row-even" onclick="productJS.setCurrentID(this)" ondblclick="productJS.dbclickToEdit()",' + index + '></div>';
                        }
                        divHTML = $(divHTML).append(
                            '<div class="col-lg-1 grid-body-colum-checkbox" onclick=productJS.chooseRowCheckbox(this,"' + item["ProductID"]+'")>' +
                            '<span class="grid-body-checkbox-icon"></span>' +
                            '</div>' +
                            '<div class="col-lg-1 grid-body-colum grid-body-colum-sku">' + item["SKUCode"] + '</div>' +
                            '<div class="col-lg-4 grid-body-colum grid-body-colum-productname">' +
                            '<a href="#">' + item["ProductName"] + '</a>' +
                            '</div>' +
                            '<div class="col-lg-1 grid-body-colum grid-body-colum-groupproduct">' + item["ProductGroupName"] + '</div>' +
                            '<div class="col-lg-1 grid-body-colum grid-body-colum-counter">' + item["CalculationUnitName"] + '</div>' +
                            '<div class="col-lg-1 grid-body-colum grid-body-colum-price">' + item["SalePrice"] + '</div>' +
                            '<div class="col-lg-1 grid-body-colum grid-body-colum-displayscreen">Có</div>' +
                            '<div class="col-lg-1 grid-body-colum grid-body-colum-category">Hàng hóa</div>' +
                            '<div class="col-lg-1 grid-body-colum grid-body-colum-status">Đang kinh doanh</div>'
                        );
                        $('.grid-body').append(divHTML);
                    });
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

    
}

var productJS = new ProductJS();