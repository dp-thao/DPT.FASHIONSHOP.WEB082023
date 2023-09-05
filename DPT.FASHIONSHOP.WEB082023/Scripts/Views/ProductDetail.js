
$(document).ready(function () {
    $('#txtproductname').focus();
})

// Chỉ số phía sau của mã hàng hóa tự sinh
var suffixNumberCode = 1;
//Biến chứa danh sách các thẻ tag màu sắc
var colorTagList = [];
// Chuỗi màu sắc khi thêm mới hàng hóa
var productAddColor = "";
//Biến chứa danh sách các thẻ tag size
var sizeTagList = [];
// Biến chứa danh sách các thẻ color và size
var colorSizeProduct = [];
// Biến nhận biết đơn vị tính nào đang được lựa chọn
var selectedCalculationUnit = null;
// Biến nhận biết nhóm hàng hóa nào đang được lựa chọn
var selectedGroupProduct = null;
// Biến nhận biết chỉ số dòng của thông tin chi tiết thuộc tính
var indexRow = 0;

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
        // click ra ngoài Nhóm hàng hóa và Đơn vị tính thì ẩn danh sách nhóm hàng hóa và đơn vị tính
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
            selectedGroupProduct = $(this).attr('unitvalue'); // Biến nhận biết nhóm hàng hóa đang được chọn
            var productGroupName = $(this).text();
            $('#txtproductcategory').val(productGroupName);
            //alert(selectedGroupProduct);
        });

        // Sự kiện chọn Đơn vị tính
        $('.input-counter-option-block').on('click', 'li', function () {
            selectedCalculationUnit = $(this).attr('unitvalue'); // Mã đơn vị tính đang được chọn
            var calculationUnitName = $(this).text();
            $('#txtcounterproduct').val(calculationUnitName);
            //alert(selectedCalculationUnit);
        });

        // Thêm thẻ tag Color sau khi nhấn enter
        $('#txtColorInput').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                productDetail.createNoteColor();
                $('#tblproductdetail').css('display', 'flex');
            }
        });

        // Thêm thẻ tag Size sau khi nhấn enter
        $('#txtSizeInput').keypress(function (event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                productDetail.createNoteSize();
                $('#tblproductdetail').css('display', 'flex');
            }
        });

        // Sau khi nhập Tên hàng hóa và sự kiện focusout
        $('#txtproductname').on('focusout', function () {
            productDetail.autoCreateProductCode();
        });

        // Sự kiện nhấn vào input Giá mua, Giá bán, Tồn kho ban đầu, Định mức tồn kho tối thiểu, Định mức tồn kho tối đa sẽ select text trong input
        $('.row-detail-input-number').on('click', function () {
            $(this).select();
        });

        // Sự kiện nhấn vào input Giá bán,  Giá bán, Tồn kho ban đầu, Định mức tồn kho tối thiểu, Định mức tồn kho tối đa sẽ
        $('#txtproductimportprice').on('keypress', onlyNumberInput);
        $('#txtproductsellprice').on('keypress', onlyNumberInput);
        $('#txtfirstquantity').on('keypress', onlyNumberInput);
        $('#txtminquantity').on('keypress', onlyNumberInput);
        $('#txtmaxquantity').on('keypress', onlyNumberInput);

        // Sự kiện nhập vào là tiền
        $('#txtproductimportprice').on('keyup', function () {

        });

        //$('.row-detail-input-number').on('keyup', function () {
        //    //var moneyVal = $(this).val();
        //    var p = /^[0-9\.]*$/g;
        //    //kiểm tra nhập vào là số và có dấu chấm
        //    if (p.test($(this).val())) {
        //        var value = Number($(this).val().split('.').join('')).formatMoney();
        //        if (value == 0 || value == '0') {
        //            $(this).val('');
        //        } else {
        //            $(this).val(value);
        //        }
        //    } else {
        //        $(this).val('');
        //    }
        //});


        // Sự kiện lưu khi thêm hàng hóa
        $('#btnProductTopSave').on('click', function () {
            productDetail.addNewProduct();
        });

        // Sự kiện hiển thị file Ảnh hàng hóa
        $('#btnInputImage').on('click', function () {
            $('#fileLoader').click();
        });

        // Sự kiện xóa hình ảnh vừa tải lên
        $('#btndisposeimage').on('click', function () {
            $('#imgproduct').attr('src', '');
            $('#imgproduct').css('display', 'none');
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

            // Giá mua
            var purchasePrice = $('#txtproductimportprice').val();
            // Giá bán
            var salePrice = $('#txtproductsellprice').val();

            // Tạo dòng thông tin chi tiết thuộc tính
            var table = $('.detail-product-table-body');
            var row = '';

            // Nếu chưa có size thì thêm dòng chỉ có màu
            if (sizeTagList.length == 0) {
                // Tên hàng hóa
                if ($('#txtproductname').val() != '') {
                    var nameProduct = `${$('#txtproductname').val()}(${colorValue})`;
                } else {
                    var nameProduct = colorValue;
                }
                // Mã sku
                var colorCode = colorValue.slice(0, 2).toUpperCase();
                var skuCode = $('#txtskucode').val() + '-' + changeStringToSlug(colorCode);
                
                row = `<div class="detail-product-table-row" indexRow=${indexRow} colorValue="${colorValue}" sizeValue="" >
                        <div class="pro-detail-row-column pro-detail-header-productname">
                            <input class="pro-detail-row-column-input" type="text" value="${nameProduct}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-sku">
                            <input class="pro-detail-row-column-input" type="text" value="${skuCode}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-barcode">
                            <input class="pro-detail-row-column-input" type="text" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-importprice">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${purchasePrice}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-price" title="Áp dụng chính sách giá">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${salePrice}" />
                            <span class="row-column-input-price-option"></span>
                        </div>
                        <div class="pro-detail-row-column table-detail-task-copy" title="Sao chép giá mua, giá bán và bảng giá xuống các dòng dưới"></div>
                        <div class="pro-detail-row-column table-detail-task-delete" onclick=productDetail.removeRow(this)>
                            <div class="table-detail-task-delete-icon"></div>
                        </div>
                    </div>`;
                indexRow += 1;
            }
            // Thêm màu khi đã có size
            else {
                // Xóa dòng chỉ có màu mà không có size
                productDetail.removeRowWithoutSizeOrColor();

                $.each(sizeTagList, function (indexS, itemS) {
                    $.each(colorTagList, function (indexC, itemC) {
                        var colorSize = `${itemC}-${itemS}`;
                        if (colorSizeProduct.includes(colorSize) == false) {
                            colorSizeProduct.push(colorSize);

                            // Tên hàng hóa
                            if ($('#txtproductname').val() != '') {
                                var nameProduct = `${$('#txtproductname').val()}(${itemC}/${itemS})`;
                            } else {
                                var nameProduct = `(${itemC}/${itemS})`;
                            }
                            // Mã sku
                            var colorCode = itemC.slice(0, 2).toUpperCase();
                            var skuCode = $('#txtskucode').val() + '-' + changeStringToSlug(colorCode) + '-' + itemS.toUpperCase();

                            row += `<div class="detail-product-table-row" indexRow=${indexRow} colorValue="${itemC}" sizeValue="${itemS}" >
                                        <div class="pro-detail-row-column pro-detail-header-productname">
                                            <input class="pro-detail-row-column-input" type="text" value="${nameProduct}" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-sku">
                                            <input class="pro-detail-row-column-input" type="text" value="${skuCode}" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-barcode">
                                            <input class="pro-detail-row-column-input" type="text" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-importprice">
                                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${purchasePrice}" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-price" title="Áp dụng chính sách giá">
                                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${salePrice}" />
                                            <span class="row-column-input-price-option"></span>
                                        </div>
                                        <div class="pro-detail-row-column table-detail-task-copy" title="Sao chép giá mua, giá bán và bảng giá xuống các dòng dưới"></div>
                                        <div class="pro-detail-row-column table-detail-task-delete" onclick=productDetail.removeRow(this)>
                                            <div class="table-detail-task-delete-icon"></div>
                                        </div>
                                    </div>`;
                            indexRow++;
                        }

                    });
                });
            }
            table.append(row);
        }
        else {
            $('#txtColorInput').val('');
        }
    }

    // Hàm xóa note Color
    removeColorTag(element, colorValue) {
        // Xóa màu trong danh sách (mảng)
        var colorIndex = colorTagList.indexOf(colorValue);
        if (colorIndex > -1) { // only splice array when item is found
            colorTagList.splice(colorIndex, 1); // 2nd parameter means remove one item only
        }

        // Xóa note và render lại note
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

        // Xóa các dòng có chứa note size bị xóa ở Chi tiết thuộc tính
        if (colorTagList.length == 0 && sizeTagList.length > 0) {
            // xóa đi dòng chi tiết thuộc tính có tag color vừa xóa
            $('.detail-product-table-row[colorValue="' + colorValue + '"]').remove();

            // Giá mua
            var purchasePrice = $('#txtproductimportprice').val();
            // Giá bán
            var salePrice = $('#txtproductsellprice').val();

            // Tạo dòng thông tin chi tiết thuộc tính
            var table = $('.detail-product-table-body');
            var row = '';

            // vẽ lại dòng chỉ có size sau khi tag color vừa xóa hết
            $.each(sizeTagList, function (index, item) {
                // Tên hàng hóa
                if ($('#txtproductname').val() != '') {
                    var nameProduct = `${$('#txtproductname').val()}(${item})`;
                } else {
                    var nameProduct = item;
                }
                // Mã sku
                var sizeCode = item.slice(0, 2).toUpperCase();
                var skuCode = $('#txtskucode').val() + '-' + changeStringToSlug(sizeCode);
                row = `<div class="detail-product-table-row" indexRow=${indexRow} colorValue="" sizeValue="${item}">
                        <div class="pro-detail-row-column pro-detail-header-productname">
                            <input class="pro-detail-row-column-input" type="text" value="${nameProduct}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-sku">
                            <input class="pro-detail-row-column-input" type="text" value="${skuCode}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-barcode">
                            <input class="pro-detail-row-column-input" type="text" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-importprice">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${purchasePrice}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-price" title="Áp dụng chính sách giá">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${salePrice}" />
                            <span class="row-column-input-price-option"></span>
                        </div>
                        <div class="pro-detail-row-column table-detail-task-copy" title="Sao chép giá mua, giá bán và bảng giá xuống các dòng dưới"></div>
                        <div class="pro-detail-row-column table-detail-task-delete" onclick=productDetail.removeRow(this)>
                            <div class="table-detail-task-delete-icon"></div>
                        </div>
                    </div>`;
                indexRow += 1;
                table.append(row);
            });                
                
        } else {
            $('.detail-product-table-row[colorValue="' + colorValue + '"]').remove();
        }

        // Xóa phần tử có chưa note size bị xóa ở mảng colorSizeProduct
        var itemDel = [];
        $.each(colorSizeProduct, function (index, item) {
            var text = colorValue + '-';
            if (item.includes(text) == true) {
                itemDel.push(item);
            };
        });
        $.each(itemDel, function (index, item) {
            if (colorSizeProduct.includes(item) == true) {
                colorSizeProduct.splice(colorSizeProduct.indexOf(item), 1);
            }
        });

        // Xóa bảng chi tiết hàng hóa khi không còn thuộc tính color và size
        productDetail.removeTableProductDetail();
    }

    // Hàm tạo note Size
    createNoteSize() {
        //Tạo mảng chứa các giá trị đã có
        var sizeValue = $('#txtSizeInput').val().replace(/\\/g, '');
        if (sizeTagList.includes(sizeValue) == false) {
            // Thêm giá trị size vào mảng
            sizeTagList.push(sizeValue);
            // Tạo thẻ note tag size
            var sizeNote =
                `<li class="input-property-tag-item" onclick=productDetail.removeSizeTag(this,'${sizeValue}')>
                    <div class="input-property-tag-item-content">
                        <span>${sizeValue}</span>
                        <span class="input-property-tag-item-dispose"></span>
                    </div>
                </li>`;

            $('#inputsizelist').append(sizeNote);
            $('#txtSizeInput').val('');

            // Giá mua
            var purchasePrice = $('#txtproductimportprice').val();
            // Giá bán
            var salePrice = $('#txtproductsellprice').val();

            // Tạo dòng thông tin chi tiết thuộc tính
            var table = $('.detail-product-table-body');
            var row = '';
            if (colorTagList.length == 0) {
                // Tên hàng hóa
                if ($('#txtproductname').val() != '') {
                    var nameProduct = `${$('#txtproductname').val()}(${sizeValue})`;
                } else {
                    var nameProduct = sizeValue;
                }
                // Mã sku
                var sizeCode = sizeValue.slice(0, 2).toUpperCase();
                var skuCode = $('#txtskucode').val() + '-' + changeStringToSlug(sizeCode);

                row = `<div class="detail-product-table-row" indexRow=${indexRow} colorValue="" sizeValue="${sizeValue}">
                        <div class="pro-detail-row-column pro-detail-header-productname">
                            <input class="pro-detail-row-column-input" type="text" value="${nameProduct}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-sku">
                            <input class="pro-detail-row-column-input" type="text" value="${skuCode}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-barcode">
                            <input class="pro-detail-row-column-input" type="text" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-importprice">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${purchasePrice}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-price" title="Áp dụng chính sách giá">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${salePrice}" />
                            <span class="row-column-input-price-option"></span>
                        </div>
                        <div class="pro-detail-row-column table-detail-task-copy" title="Sao chép giá mua, giá bán và bảng giá xuống các dòng dưới"></div>
                        <div class="pro-detail-row-column table-detail-task-delete" onclick=productDetail.removeRow(this)>
                            <div class="table-detail-task-delete-icon"></div>
                        </div>
                    </div>`;
                indexRow += 1;
            }
            else {
                productDetail.removeRowWithoutSizeOrColor();

                $.each(sizeTagList, function (indexS, itemS) {
                    $.each(colorTagList, function (indexC, itemC) {
                        var colorSize = `${itemC}-${itemS}`;
                        if (colorSizeProduct.includes(colorSize) == false) {
                            colorSizeProduct.push(colorSize);

                            // Tên hàng hóa
                            if ($('#txtproductname').val() != '') {
                                var nameProduct = `${$('#txtproductname').val()}(${itemC}/${itemS})`;
                            } else {
                                var nameProduct = `(${itemC}/${itemS})`;
                            }
                            // Mã sku
                            var colorCode = itemC.slice(0, 2).toUpperCase();
                            var skuCode = $('#txtskucode').val() + '-' + changeStringToSlug(colorCode) + '-' + itemS.toUpperCase();

                            row += `<div class="detail-product-table-row" indexRow=${indexRow} colorValue="${itemC}" sizeValue="${itemS}">
                                        <div class="pro-detail-row-column pro-detail-header-productname">
                                            <input class="pro-detail-row-column-input" type="text" value="${nameProduct}" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-sku">
                                            <input class="pro-detail-row-column-input" type="text" value="${skuCode}" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-barcode">
                                            <input class="pro-detail-row-column-input" type="text" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-importprice">
                                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${purchasePrice}" />
                                        </div>
                                        <div class="pro-detail-row-column pro-detail-header-price" title="Áp dụng chính sách giá">
                                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${salePrice}" />
                                            <span class="row-column-input-price-option"></span>
                                        </div>
                                        <div class="pro-detail-row-column table-detail-task-copy" title="Sao chép giá mua, giá bán và bảng giá xuống các dòng dưới"></div>
                                        <div class="pro-detail-row-column table-detail-task-delete" onclick=productDetail.removeRow(this)>
                                            <div class="table-detail-task-delete-icon"></div>
                                        </div>
                                    </div>`;
                            indexRow += 1;
                        }

                    });

                });

            }
            table.append(row);
        }
        else {
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
        if (sizeTagList.length > 0) {
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

        // Xóa các dòng có chứa note size bị xóa ở Chi tiết thuộc tính
        if (colorTagList.length > 0 && sizeTagList.length == 0) {
            $('.detail-product-table-row[sizeValue="' + sizeValue + '"]').remove();
            
            // Giá mua
            var purchasePrice = $('#txtproductimportprice').val();
            // Giá bán
            var salePrice = $('#txtproductsellprice').val();

            // Tạo dòng thông tin chi tiết thuộc tính
            var table = $('.detail-product-table-body');
            var row = '';

            // Vẽ lại dòng chỉ có color sau khi size vừa xóa hết
            $.each(colorTagList, function (index, item) {
                // Tên hàng hóa
                if ($('#txtproductname').val() != '') {
                    var nameProduct = `${$('#txtproductname').val()}(${item})`;
                } else {
                    var nameProduct = item;
                }
                // Mã sku
                var colorCode = item.slice(0, 2).toUpperCase();
                var skuCode = $('#txtskucode').val() + '-' + changeStringToSlug(colorCode);
                row = `<div class="detail-product-table-row" indexRow=${indexRow} colorValue="${item}" sizeValue="" >
                        <div class="pro-detail-row-column pro-detail-header-productname">
                            <input class="pro-detail-row-column-input" type="text" value="${nameProduct}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-sku">
                            <input class="pro-detail-row-column-input" type="text" value="${skuCode}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-barcode">
                            <input class="pro-detail-row-column-input" type="text" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-importprice">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${purchasePrice}" />
                        </div>
                        <div class="pro-detail-row-column pro-detail-header-price" title="Áp dụng chính sách giá">
                            <input class="pro-detail-row-column-input pro-detail-input-number" type="text" value="${salePrice}" />
                            <span class="row-column-input-price-option"></span>
                        </div>
                        <div class="pro-detail-row-column table-detail-task-copy" title="Sao chép giá mua, giá bán và bảng giá xuống các dòng dưới"></div>
                        <div class="pro-detail-row-column table-detail-task-delete" onclick=productDetail.removeRow(this)>
                            <div class="table-detail-task-delete-icon"></div>
                        </div>
                    </div>`;
                indexRow += 1;
                table.append(row);
            });
        } else {
            $('.detail-product-table-row[sizeValue="' + sizeValue + '"]').remove();
        }

        // Xóa phần tử có chưa note size bị xóa ở mảng colorSizeProduct
        var itemDel = [];
        $.each(colorSizeProduct, function (index, item) {
            var text = '-' + sizeValue;
            if (item.includes(text) == true) {
                itemDel.push(item);
            };
        });
        $.each(itemDel, function (index, item) {
            if (colorSizeProduct.includes(item) == true) {
                colorSizeProduct.splice(colorSizeProduct.indexOf(item), 1);
            }
        });

        // Xóa bảng chi tiết hàng hóa khi không còn thuộc tính color và size
        productDetail.removeTableProductDetail();

    }

    // Hàm xóa row chỉ có màu hoặc chỉ có size
    removeRowWithoutSizeOrColor() {
        $('.detail-product-table-row[colorValue=""]').remove();
        $('.detail-product-table-row[sizeValue=""]').remove();
    }

    // Hàm remove row thông tin thuộc tính chi tiết
    removeRow(element) {
        var color = element.parentNode.getAttribute('colorvalue');
        var size = element.parentNode.getAttribute('sizevalue');
        element.parentNode.remove();
        var colorSize = color + '-' + size;
        // Xóa phần tử trong mảng colorSizeProduct
        if (colorSizeProduct.includes(colorSize) == true) {
            var index = colorSizeProduct.indexOf(colorSize);
            colorSizeProduct.splice(index, 1);
        }

        // Kiểm tra và xóa color hoặc size khi xóa giá trị mảng colorSizeProduct
        var demC = 0, demS = 0;
        $.each(colorSizeProduct, function (index, item) {
            var txtColor = `${color}-`;
            var txtZize = `-${size}`;
            if (item.includes(txtColor) == true) {
                demC++;
            }
            if (item.includes(txtZize) == true) {
                demS++;
            }
        });
        if (demC == 0) {
            productDetail.removeColorTag('', color);
        }
        if (demS == 0) {
            productDetail.removeSizeTag('', size);
        }
    }

    // Hàm xóa bảng Chi tiết thuộc tính
    removeTableProductDetail() {
        if (colorTagList.length == 0 && sizeTagList.length == 0) {
            $('#tblproductdetail').css('display', 'none');
        }
        indexRow = 0;
    }

    // Hàm sinh mã SKU tự động sau khi thêm Tên hàng hóa
    autoCreateProductCode() {
        // Lấy thông tin giá trị nhập vào
        var productNameValue = $('#txtproductname').val().trim();
        if (productNameValue != '') {
            var skuCodeArray = ""; // mã sku
            // Lấy chữ cái đầu và viết hoa tất cả, mặc định thêm 01 ở cuối
            // ví dụ: tên hàng hóa: Áo polo -> AP01
            var listCharacter = productNameValue.split(' '); // Mảng chuỗi tên hàng hóa
            $.each(listCharacter, function (index, item) {
                var firstCharacter = item.slice(0, 1).toUpperCase();
                skuCodeArray += firstCharacter;
            });
            // Kiểm tra xem mã đã tồn tại chưa
            var nameCode = changeStringToSlug(skuCodeArray); // Chuyển ký tự có dấu thành không dấu
            $('#txtskucode').val(nameCode.concat('0', suffixNumberCode));
            // Kiểm tra trùng mã. Nếu trùng thì tăng chữ số lên 1
            productDetail.isExistProductCode();
        }
        else {
            $('#txtskucode').val('');
        }
        // Thêm dữ liệu vào input Mã SKU
    }

    // Hàm kiểm tra mã SKU của hàng hóa đã tồn tại hay chưa
    //date: 10/08/2023
    isExistProductCode() {
        var skuCode = $('#txtskucode').val().trim();
        $.ajax({
            type: 'POST',
            url: '/Product/CheckSkucode',
            dataType: 'json',
            success: function () {

            },
            false: function () {
                alert('Kiểm tra mã tồn tại SKU false');
            },
            error: function () {
                alert('Lỗi kiểm tra mã tồn tại SKU');
            }
        });
    }


    // File ảnh
    fileSelect(event) {
        $('#imgproduct').css("display", "block");
        //var reader = new FileReader();
        //reader.onload = function () {
        //    var imgProduct = document.getElementById('imgproduct');
        //    imgProduct.src = reader.result;
        //}
        //reader.readAsDataURL(event.target.files[0]);

        var imgProduct = document.getElementById('imgproduct');
        imgProduct.src = URL.createObjectURL(event.target.files[0]);
        imgProduct.onload = function () {
            URL.revokeObjectURL(imgProduct.src) // free memory
        }
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
                        $('.input-counter-option-block').append(`<li unitvalue="${item["CalculationUnitID"]}">${item["CalculationUnitName"]}</li>`);
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
    // date: 11/08/2023
    addNewProduct() {
        var productObj = {};
        productObj['ProductName'] = $('#txtproductname').val();
        productObj['SKUCode'] = $('#txtskucode').val();
        productObj['BarCode'] = '1234567';//$('#txtproductbarcode').val();
        productObj['PurchasePrice'] = $('#txtproductimportprice').val();
        productObj['SalePrice'] = $('#txtproductsellprice').val();
        productObj['CalculationUnitID'] = selectedCalculationUnit;
        productObj['InitialInventoryQuantity'] = $('#txtfirstquantity').val();
        productObj['MinQuantity'] = $('#txtminquantity').val();
        productObj['MaxQuantity'] = $('#txtmaxquantity').val();
        productObj['StockLocation'] = 'Kho S';
        productObj['DisplayLocation'] = 'Kệ S';
        productObj['Status'] = 1;
        productObj['InActive'] = 0;
        productObj['Description'] = 'Mô tả';
        productObj['ProductGroupID'] = selectedGroupProduct;
        productObj['ColorTag'] = colorTagList[colorTagList.length - 1];
        productObj['SizeTag'] = sizeTagList[sizeTagList.length - 1];
        productObj['Image'] = 'Img';
        productObj['ProductTypeID'] = '15027954-ccc2-4c76-9128-b656ae00f755';
        productObj['CreatedDate'] = Date.now();
        productObj['CreatedBy'] = '00000000-0000-0000-0000-000000000000';
        if (productObj.ProductName != "" ||
            productObj.SKUCode != "") {
            // Gọi API 
            $.ajax({
                method: 'POST',
                url: '/Product/AddNewProduct',
                //dataType: 'json',
                data: productObj,
                success: function (response) {
                    alert('thành công');
                    $('.content-product').css('display', 'block');
                    $('.content-product-detail').css('display', 'none');
                    productJS.loadData();
                },
                false: function () {
                    alert('Thất bại');
                    console.log("Add new product: Thất bại");
                },
                error: function (response) {
                    alert('Lỗi');
                    console.log("Add new product: Lỗi");
                }
            });
        } else {
            alert('Nhập đầy đủ thông tin sản phẩm!');
        }

    }
}

var productDetail = new ProductDetail();

// ======================== Hàm bổ trợ ========================
// Hàm chuyển ký tự có dấu thành không giấu
// date: 10/08/2023
function changeStringToSlug(inputString) {
    var slug = inputString;
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'A');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'E');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'I');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'O');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'U');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'Y');
    slug = slug.replace(/đ/gi, 'D');
    return slug;
}

// Hàm chỉ cho phép nhập số
function onlyNumberInput(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

// Hàm tự động chuyển giá trị ô nhập về định dạng tiền tệ
// date: 10/08/2023
function autoCurrencyInput(money) {

}