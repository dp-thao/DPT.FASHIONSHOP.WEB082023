
$(document).ready(function () {

})

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
                        $('.input-category-option-block').append('<li>' + item["ProductGroupName"] + '</li>');
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