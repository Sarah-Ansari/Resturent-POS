package com.toasterpos.toaster.models.dtos;

import lombok.Data;

@Data
public class OrderItemDto {
    private Integer quantity;
    private Long orderId;
    private Long itemId;
}
