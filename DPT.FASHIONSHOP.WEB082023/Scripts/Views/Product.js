
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
                        divHTML = '<div class="row grid-body-row grid-body-row-odd", ' + index + '></div>';
                        divHTML = $(divHTML).append(
                            '<div class="col-lg-1 grid-body-colum-checkbox">' +
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