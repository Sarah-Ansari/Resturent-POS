package com.toasterpos.toaster.controllers;

import com.toasterpos.toaster.models.Employee;
import com.toasterpos.toaster.models.Order;
import com.toasterpos.toaster.models.OrderItem;
import com.toasterpos.toaster.models.dtos.OrderDto;
import com.toasterpos.toaster.models.dtos.OrderItemDto;
import com.toasterpos.toaster.models.dtos.OrderResponseDto;
import com.toasterpos.toaster.respositories.OrderRepository;
import com.toasterpos.toaster.services.OrderService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public @ResponseBody OrderResponseDto createOrder(@RequestBody OrderDto order){
        return orderService.createOrder(order);
    }

    @GetMapping("/list")
    public @ResponseBody List<OrderResponseDto> getAllOrders(){
        return orderService.getAllOrders();
    }

    @GetMapping("/get")
    public @ResponseBody Order getOrder(@RequestParam Long orderId){
        log.info("Received /order/get with orderId " + orderId);
        Optional<Order> optional = orderService.getOrderById(orderId);
        return optional.orElse(null);
    }

    @GetMapping("/waiting")
    public @ResponseBody List<OrderResponseDto> getWaitingOrders(){
        return orderService.getWaitingOrders();
    }

    @GetMapping("/completed")
    public @ResponseBody List<OrderResponseDto> getCompletedOrders(){
        return orderService.getCompletedOrders();
    }

    @GetMapping("/mark_complete")
    public @ResponseBody OrderResponseDto markOrderComplete(@RequestParam Long orderId){
        return orderService.markOrderComplete(orderId);
    }

    @PostMapping("/create_order_item")
    public @ResponseBody OrderItem createOrderItem(@RequestBody OrderItemDto orderItem){
        return orderService.createOrderItem(orderItem);
    }

    @DeleteMapping("/delete")
    public @ResponseBody String deleteOrder(@RequestParam @NonNull Long orderId){
        log.info("Received request /order/delete with order_id " + orderId);
        try{
            orderService.deleteOrderById(orderId);
            return "Successfully deleted";
        }catch (Exception e){
            log.error("ERROR in /order/delete ",e);
            return null;
        }
    }
}
