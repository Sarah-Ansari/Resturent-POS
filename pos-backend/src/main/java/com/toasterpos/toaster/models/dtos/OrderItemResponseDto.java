package com.toasterpos.toaster.models.dtos;

import com.toasterpos.toaster.models.Item;
import com.toasterpos.toaster.models.Order;
import lombok.Data;

@Data
public class OrderItemResponseDto {
    private Long orderItemId;
    private Double soldPrice;
    private Integer quantity;
    private String itemName;
}
